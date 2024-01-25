import React, { ReactNode, useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom'
import { RouterConfig } from '@/libs/router'
import { ItemType, BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'
import {connect} from 'react-redux'
import { addTag } from '@/store/actions/tagView';
import { RootState } from '@/store/reducers';
import { TagViewAction } from '@/store/actions/tagView'
import { TagViewType } from '@/libs/tag-view'

const { Header } = Layout;
import { rootRouter } from '@/router/index'

interface HeaderProps {
  setCollapsed: (coll: boolean) => void;
  collapsed: boolean;
  colorBgContainer: string
  addTag:(data:TagViewType) => TagViewAction
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
      throw new Error('GOT IT!');
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
  const { collapsed, setCollapsed, colorBgContainer, addTag } = props;
  const { pathname } = useLocation();
  const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbType[]>([]);

  useEffect(() => {
    let list = getBreadData(rootRouter, pathname);
    const result:boolean = list.some((v)=> v.key === '/land-page')
    if(!result) {
      list = [{key: '/land-page', title: '首页'}, ...list]
    }
    addTag(list[list.length-1])
    setBreadcrumbList(list);
  }, [pathname,addTag ])

  const itemRender = (item: ItemType, params: any, items: ItemType[]): ReactNode => {
    if((item as BreadcrumbItemType).key === '/land-page') {
      return <Link to={(item as BreadcrumbItemType).key as string}>
        {(item as BreadcrumbItemType).title}
      </Link>
    }
    const last = items.indexOf(item) === items.length - 1;
    return last
      ?
      <Link to={(items[items.length - 1] as BreadcrumbItemType).key as string}>
        {(item as BreadcrumbItemType).title}
      </Link>
      : <span>{(item as BreadcrumbItemType).title}</span>
  };

  return (
    <Header className='shadow relative' style={{ padding: 0, background: colorBgContainer }}>
      <div className='flex items-center h-full px-6'>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
        <Breadcrumb
          className='ml-2'
          itemRender={itemRender}
          items={breadcrumbList} />
      </div>
    </Header>
  )
}
export default connect(
  (state:RootState)=> ({
    tagList: state.TagViewType
  }),
  { addTag }
)(LayoutHeader)
