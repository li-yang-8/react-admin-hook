import { useRoutes } from "react-router-dom";
import React from 'react';
import { RouterConfig } from '@/libs/router'
// import Home from "@/views/home";
import Layouts from "@/layout";

export const rootRouter: RouterConfig[] = [
  {
    path: '/',
    element: <Layouts />,
  }
]

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;