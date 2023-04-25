import React from "react";
import { connect } from 'react-redux';
import { RootState } from '@/store/reducers';
import { TagViewType } from '@/libs/tag-view'
import { Space, Tag } from 'antd';
import { TagViewAction } from '@/store/actions/tagView';
import { deleteTag } from '@/store/actions/tagView';

interface TagViewProps {
  tagList:TagViewType[]
  deleteTag: (data: TagViewType)=> TagViewAction
}

const TagView:React.FC<TagViewProps> =  (props) => {

  const { tagList, deleteTag } = props
  
  const handleCloseTag = (e:React.MouseEvent<HTMLElement, MouseEvent>, tag:TagViewType)=> {
    e.preventDefault()
    deleteTag(tag)
  }

  return(
   <div className="bg-white h-9 flex items-center px-6">
     <Space size={[0, 8]} wrap>
      { tagList.map((v)=> 
      <Tag closable key={v.key} onClose={(e)=> handleCloseTag(e ,v)}>
        {v.title}
      </Tag>)
      }
    </Space>
   </div>
  )
}
export default connect(
  (state:RootState)=> ({
    tagList: state.TagViewType
  }),
  { deleteTag }
)(TagView)