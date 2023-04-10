import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import './index.less'
import { Layout, Menu} from 'antd';
const { Sider } = Layout;

interface SiderProps {
  collapsed:boolean
}

const LayoutSider: React.FC<SiderProps> = (props) => {
  const  { collapsed } = props
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className='sider'>
      <div className="logo">
        我是李嘉兴
    </div>
    <Menu
      theme="dark"
      mode="inline"
      
      defaultSelectedKeys={['1']}
      items={[
        {
          key: '1',
          icon: <UserOutlined />,
          label: 'nav 1',
        },
        {
          key: '2',
          icon: <VideoCameraOutlined />,
          label: 'nav 2',
        },
        {
          key: '3',
          icon: <UploadOutlined />,
          label: 'nav 3',
        },
      ]}
    />
  </Sider>
  )
}
 
export default LayoutSider