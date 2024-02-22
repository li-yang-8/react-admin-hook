import { useRoutes } from 'react-router-dom';
import React, { lazy } from 'react';
import { RouterConfig } from '@/libs/router';

// views
const Home = lazy(() => import('@/views/home'));
// const Layouts = lazy(()=> import('@/layout'))
const Login = lazy(() => import('@/views/login'));
const NotFound = lazy(() => import('@/views/not-found'));
const LangPage = lazy(() => import('@/views/land-page'));
const Three = lazy(() => import('@/views/three'));
const DbTable = lazy(() => import('@/views/indexed-db-table'));

// import Home from "@/views/home";
import Layouts from '@/layout';

import LoadingView from '@/components/Common/LoadingView'
// import Login from "@/views/login";
// import NotFound from "@/views/not-found";
// import LangPage from "@/views/land-page";
// import Three from "@/views/three";
// import DbTable from "@/views/indexed-db-table";

// 所有页面路由
export const rootRouter: RouterConfig[] = [
  {
    path: '/land-page',
    element: <LangPage />,
    meta: {
      title: '首页',
    },
    children: [

    ]
  },
  {
    path: '/component',
    meta: {
      title: '组件',
    },
    children: [
      {
        path: '/component/card',
        element: <Home />,
        meta: {
          title: 'Card',
        },
      }
    ]
  },
  {
    path: '/router',
    meta: {
      title: '路由嵌套',
    },
    children: [
      {
        path: '/router/menu-1',
        element: <Home />,
        meta: {
          title: '菜单1',
        },
      },
      {
        path: '/router/menu-2',
        element: <Home />,
        meta: {
          title: '菜单2',
        },
      },
    ]
  },
  {
    path: '/three',
    meta: {
      title: 'three'
    },
    children: [
      {
        path: '/three/start',
        element: <Three />,
        meta: {
          title: 'three 练习',
        }
      }
    ]
  },
  {
    path: '/db-table',
    meta: {
      title: 'db-table'
    },
    children: [
      {
        path: '/db-table/user',
        element: <DbTable />,
        meta: {
          title: 'User',
        }
      }
    ]
  }
]

const Router = () => {
  return useRoutes([
    {
      // 所有页面路由
      element: <Layouts />,
      children: [...rootRouter],
    },
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);
};

export default Router;