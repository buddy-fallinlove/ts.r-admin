import {RouteComponentProps} from 'react-router-dom'
import {FC} from 'react'

export interface RouterItem {
  component: FC<RouteComponentProps>,
  path: string,
  title: string,
  exact?: boolean,
  icon?: string
}

export interface Admin {
  email: string
  id: number
  mobile: string
  rid: number
  token: string
  username: string
}

export interface User {
  create_time: number,
  email: string,
  id: number,
  mg_state: boolean,
  mobile: string,
  role_name: string,
  username: string
}

export interface MenuItem {
  authName: string
  children: MenuItem[]
  id: number,
  order: number
  path: string,
  icon?: string
}

export interface Column {
  title: string,
  dataIndex: string,
  key: string,
  align?: 'left' | 'right' | 'center',
  width?: string | number
  render?: (text: any, record: any, index: number) => any
}

export interface RoleItem {
  authName: string,
  children: RoleItem[] | [],
  child?: RoleItem[] | [],
  id: number ,
  path: string,
  title?: string,
  key?: number
}

export interface Role {
  children: RoleItem[] | [],
  child?: RoleItem[] | [],
  id: number,
  roleDesc: string
  roleName: string
}

