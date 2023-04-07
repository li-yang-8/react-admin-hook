import { useRoutes } from "react-router-dom";
import React from 'react';
import { RouterConfig } from '@/libs/router'
// import Home from "../views/home/index";
import Home from "@/views/home";

export const rootRouter: RouterConfig[] = [
  {
    path: '/',
    element: <Home />,
  }
]

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;