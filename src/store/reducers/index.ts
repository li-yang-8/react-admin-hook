/* 
	该文件用于汇总所有的reducer为一个总的reducer
*/
//引入combineReducers，用于汇总多个reducer
import {combineReducers} from 'redux';
import TagViewType from './tagView';

const rootReducer = combineReducers({
  TagViewType
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>;