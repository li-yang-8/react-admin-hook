import React, { useState } from 'react';
import './index.less'
import { Layout, theme } from 'antd';
import LayoutSider from './Sider';
import LayoutHeader from './Header';

const { Content } = Layout;

const Layouts: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        height: '100vh'
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
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts