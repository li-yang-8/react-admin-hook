import { useRoutes } from "react-router-dom";
import React from 'react';
import { RouterConfig } from '@/libs/router'

// views
import Home from "@/views/home";
import Layouts from "@/layout";
import Login from "@/views/login";
import NotFound from "@/views/not-found";
import LangPage from "@/views/land-page";


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
    path: '/home',
    element: <Home />,
    meta: {
      title: 'home',
    },
    children: [
      {
        path: '/home/news',
        element: <Home />,
        meta: {
          title: 'news',
        },
      }
    ]
  }
]

const Router = () => {
  const routes = useRoutes([
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
  return routes;
};

export default Router;