import { RouterItem } from '../types'
import Login from '../page/login/login'
import NotFound from '../page/notFound/notFound'
import Home from '../page/home/home'
import Users from '../page/user/user'
import Rights from './../page/rights/rights';
import Roles from './../page/roles/roles';

export const noAuthRoutes: RouterItem[] = [
  {
    path: '/login',
    component: Login,
    title: '登录'
  },
  {
    path: '/err',
    component: NotFound,
    title: '出错啦'
  }
]

export const authRoutes: RouterItem[] = [
  {
    path: '/',
    component: Home,
    exact: true,
    title: '首页',
    icon: 'HomeOutlined'
  },
  {
    path: '/users',
    component: Users,
    title: '用户管理',
    icon: 'UserOutlined'
  },
  {
    path: '/roles',
    component: Roles,
    title: '角色管理',
    icon: 'UserOutlined'
  },
  {
    path: '/rights',
    component: Rights,
    title: '权限管理',
    icon: 'UserOutlined'
  }
]