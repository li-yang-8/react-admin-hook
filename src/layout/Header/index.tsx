import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
const { Header } = Layout;


interface HeaderProps {
  setCollapsed: (coll: boolean) => void;
  collapsed: boolean;
  colorBgContainer:string
}

const LayoutHeader: React.FC<HeaderProps> = (props) => {
  const { collapsed,setCollapsed ,colorBgContainer} = props
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: () => setCollapsed(!collapsed),
    })}
  </Header>
  )
}
export default LayoutHeader
