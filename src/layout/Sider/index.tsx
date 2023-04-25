import React, { useState, useEffect } from "react";
import {
  // UploadOutlined,
  // UserOutlined,
  // VideoCameraOutlined,
} from '@ant-design/icons';
import './index.less'
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { RouterConfig } from '@/libs/router'
import { rootRouter } from '@/router/index'
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
interface SiderProps {
  collapsed: boolean
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


const LayoutSider: React.FC<SiderProps> = (props) => {
  const { collapsed } = props
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [selectKeys, setSelectKeys] = useState<string[]>([pathname])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  //刷新导航栏高亮 
  useEffect(() => {
    setSelectKeys([pathname]);
    setOpenKeys(getOpenKeys(pathname))
  }, [pathname])

  useEffect(() => {
    const handelFormatRouterToSider = (routerList: RouterConfig[] = [], menuArr: MenuItem[] = []): MenuItem[] => {
      routerList.forEach((v) => {
        if (!v.children?.length) {
          return menuArr.push(getItem(v.meta?.title, (v?.path ?? ''), v.meta?.icon))
        } else {
          menuArr.push(getItem(v.meta?.title, (v?.path ?? ''), v.meta?.icon, handelFormatRouterToSider(v.children)))
        }
      })
      return menuArr
    }
    setMenuList(handelFormatRouterToSider(rootRouter))
  }, []);

  // 获取展开的subMenu
  const getOpenKeys = (path: string): string[] => {
    let newStr: string = '';
    let newArr: string[] = [];
    const arr: string[] = path.split('/').map((v) => '/' + v)
    for (let i = 1; i < arr.length - 1; i++) {
      newStr = newStr + arr[i];
      newArr.push(newStr)
    }
    return newArr
  }

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };



  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    // console.log('keyPath', keyPath)
    navigate(key)
  }

  return (
    <Sider
      style={{
        minHeight: '100vh'
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
      className='sider'>
      <div className="logo">
        React-admin-hook
      </div>
      <Menu
        theme="dark"
        mode="inline"
        onClick={handleMenuClick}
        items={menuList}
        selectedKeys={selectKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        triggerSubMenuAction='click'
      />
    </Sider>
  )
}

export default LayoutSider