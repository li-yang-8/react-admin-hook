import React, { useState  } from 'react';
import './index.less'
import { Layout, theme } from 'antd';
import LayoutSider from './Sider';
import LayoutHeader from './Header';
import { Outlet } from 'react-router-dom';
import TagView from '@/layout/TagView';

const { Content } = Layout;


const Layouts: React.FC= () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight:'100vh'
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
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts