import api from '../../http/api'
import {Dispatch} from 'redux'
import { authRoutes } from './../../router/index';
import { RouterItem, MenuItem } from './../../types/index';

export function getMenus() {
  return async (dispatch: Dispatch) => {
    let res: any = await api.getMenus()
    res.data.unshift({
      id: 0,
      authName: '首页',
      path: '/',
      children: []
    })
    authRoutes.map((item: RouterItem) => {
      if (item.path !== '/') item.path = item.path.slice(1)
      res.data.map((menu: MenuItem ) => {
        if (item.path === menu.path) {
          menu.icon = item.icon
        }
      })
    })
    if (res.meta.status === 200) {  
      return dispatch({
        type: 'getMenus',
        payload: res.data
      })
    }
  }
}

export function getUserList({pagenum, pagesize, query}: {pagenum: number, pagesize:number, query?: string}) {
  return async (dispatch: Dispatch) => {
    let res: any = await api.getUsers({
      pagenum,
      pagesize,
      query
    })
    if (res.meta.status === 200) {  
      let payload = {
        users: res.data.users,
        total: res.data.total,
        loading: false
      }
      return dispatch({
        type: 'getUserList',
        payload
      })
    }
  }
}