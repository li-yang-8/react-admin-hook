import React, { ReactNode, useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom'
import { RouterConfig } from '@/libs/router'
import { ItemType, BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'

const { Header } = Layout;
import { rootRouter } from '@/router/index'

interface HeaderProps {
  setCollapsed: (coll: boolean) => void;
  collapsed: boolean;
  colorBgContainer: string
}

interface BreadcrumbType {
  key: string;
  title: string;
}

const getBreadData = (routers: RouterConfig[], pathName: string): BreadcrumbType[] => {
  const breadData: RouterConfig[] = []
  function getBreadPath(item: RouterConfig) {
    breadData.push(item)
    // 如果找到 抛出错误终止循环
    if (pathName === item.path) {
      throw new Error("GOT IT!");
    }

    if (item.children?.length) {
      for (let i = 0; i < item.children?.length; i++) {
        getBreadPath(item.children[i])
      }
      // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
      breadData.pop()
    } else {
      // 没找到叶子节点时，删除路径当中的该叶子节点
      breadData.pop()
    }
  }
  try {
    for (let i = 0; i < routers.length; i++) {
      getBreadPath(routers[i])
    }
  } catch (error) {
    return breadData.map(v => ({ key: (v.path || ''), title: (v.meta?.title || '') }))
  }
  return breadData.map(v => ({ key: (v.path || ''), title: (v.meta?.title || '') }))
}


const LayoutHeader: React.FC<HeaderProps> = (props) => {
  const { collapsed, setCollapsed, colorBgContainer } = props;
  const { pathname } = useLocation();
  const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbType[]>([]);

  useEffect(() => {
    const list = getBreadData(rootRouter, pathname);
    setBreadcrumbList(list);
  }, [pathname])

  const itemRender = (item: ItemType, params: any, items: ItemType[]): ReactNode => {
    const last = items.indexOf(item) === items.length - 1;
    return last
      ?
      <Link to={(items[items.length - 1] as BreadcrumbItemType).key as string}>
        {(item as BreadcrumbItemType).title}
      </Link>
      : <span>{(item as BreadcrumbItemType).title}</span>
   
    
  };

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <div className='flex items-center h-full'>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
        <Breadcrumb
          itemRender={itemRender}
          items={breadcrumbList} />
      </div>
    </Header>
  )
}
export default LayoutHeader
