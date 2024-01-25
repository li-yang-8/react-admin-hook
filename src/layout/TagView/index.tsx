import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '@/store/reducers';
import { TagViewType } from '@/libs/tag-view'
import { Space, Tag } from 'antd';
import { TagViewAction } from '@/store/actions/tagView';
import {
  deleteTag,
  deleteAllTag,
  deleteOtherTag,
} from '@/store/actions/tagView';
import { useNavigate, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

enum RightClickType {
  All = 'all',
  Other = 'other'
}

const items: MenuProps['items'] = [
  {
    label: '关闭其他',
    key: RightClickType.Other,
  },
  {
    label: '关闭所有',
    key: RightClickType.All,
  },
];

interface TagViewProps {
  tagList: TagViewType[]
  deleteTag: (data: TagViewType) => TagViewAction
  deleteAllTag: (data: TagViewType) => TagViewAction
  deleteOtherTag: (data: TagViewType) => TagViewAction
}

const TagView: React.FC<TagViewProps> = (props) => {

  const { tagList, deleteTag, deleteAllTag, deleteOtherTag } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation()

  const handleCloseTag = (e: React.MouseEvent<HTMLElement, MouseEvent>, tag: TagViewType) => {
    e.preventDefault()
    // 关闭当前标签 自动跳到前一个标签
    if (tag.key === pathname) {
      const before = tagList.findIndex((v) => v.key === pathname) - 1
      const { key } = tagList[before]
      navigate(key)
    }
    deleteTag(tag)
  }

  const handleClickTag = (e: React.MouseEvent<HTMLElement, MouseEvent>, tag: TagViewType) => {
    navigate(tag.key)
  }

  const handleRightClickOperate = (type:string, tag: TagViewType) => {
    if(type === RightClickType.All) {
      const { key } = tagList[0]
      navigate(key)
      deleteAllTag(tag)
      return
    }
    if(tag.key !== pathname) {
      navigate(tag.key)
    }
    deleteOtherTag(tag)
  }


  return (
    <div className="bg-white h-9 flex items-center px-6">
      <Space size={[0, 8]} wrap>
        {tagList.map((v) =>
          <Dropdown
            key={v.key}
            menu={{ items, onClick:({key})=>handleRightClickOperate(key, v) }}
            trigger={['contextMenu']}>
            <div
              style={{
                height: 200,
                textAlign: 'center',
                lineHeight: '200px',
              }}
            >
              <Tag
                className="cursor-pointer"
                closable={Boolean(v.key !== '/land-page')}

                color={pathname === v.key ? 'blue' : ''}
                onClose={(e) => handleCloseTag(e, v)}
                onClick={(e) => handleClickTag(e, v)}
              >
                {v.title}
              </Tag>
            </div>
          </Dropdown>
        )
        }
      </Space>
    </div>
  )
}
export default connect(
  (state: RootState) => ({
    tagList: state.TagViewType
  }),
  {
    deleteTag,
    deleteAllTag,
    deleteOtherTag,
  }
)(TagView)