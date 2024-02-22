import React, { useState, Suspense } from 'react';
import './index.less'
import { Layout, theme } from 'antd';
import LayoutSider from './Sider';
import LayoutHeader from './Header';
import { Outlet } from 'react-router-dom';
import TagView from '@/layout/TagView';
import LoadingView from '@/components/Common/LoadingView'

const { Content } = Layout;


const Layouts: React.FC= () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight:'50vh'
      }}
    >
      {/* 侧边导航栏 */}
      <LayoutSider collapsed={ collapsed }></LayoutSider>
      <Layout className="site-layout">
        {/* 头部 */}
        <LayoutHeader
          collapsed={ collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={ colorBgContainer}
        ></LayoutHeader>
        <TagView></TagView>
        <Suspense fallback={
          <LoadingView/>
        }>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              //  content 背景颜色先用灰色
              // background: colorBgContainer,
            }}
          >
            <Outlet/>
          </Content>
        </Suspense>
      </Layout>
    </Layout>
  );
};

export default Layouts