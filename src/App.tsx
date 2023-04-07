import React from 'react';
import type { FC } from 'react';
import { HashRouter } from "react-router-dom";
// import { Button } from 'antd';
import 'antd/dist/reset.css';
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
// import { Provider } from "react-redux";
// import store from "./store";
import Router from "./router";

const App: FC = () => (
  <HashRouter>
    <ConfigProvider locale={zhCN}>
    {/* <Provider store={store}> */}
      <Router />
    {/* </Provider> */}
  </ConfigProvider>
  </HashRouter>
);

export default App;