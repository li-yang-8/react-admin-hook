import { TAG_VIEW_ADD_TAG, TAG_VIEW_DELETE_TAG } from '@/store/action-types';
import { TagViewType } from '@/libs/tag-view'
import { TagViewAction } from '@/store/actions/tagView'

const tagList:TagViewType[] = [{title:'首页', key:'/land-page'}];

export default function tagViews (preState=tagList ,action:TagViewAction) {
  const { type, data } = action;
  switch(type) {
    case TAG_VIEW_ADD_TAG:
      if ( preState.find((v)=> v.key === data.key) ) return preState;
      return [ ...preState, data  ];
    case TAG_VIEW_DELETE_TAG :
      return preState.filter((v)=> v.key !== data.key)
    default:
      return preState
  }
}