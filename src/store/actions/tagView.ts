import { TAG_VIEW_ADD_TAG, TAG_VIEW_DELETE_TAG } from '@/store/action-types';
import { TagViewType } from '@/libs/tag-view'

export interface TagViewAction {
  type: string;
  data: TagViewType
}

export const addTag = (data:TagViewType):TagViewAction => ({type:TAG_VIEW_ADD_TAG, data})
export const deleteTag = (data:TagViewType):TagViewAction => ({type:TAG_VIEW_DELETE_TAG, data})