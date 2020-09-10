import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { getMenus } from './../../store/actions/user'
import * as Icon from '@ant-design/icons'
const { SubMenu } = Menu


const NavLeft = () => {
  let state = useSelector((state: any) => state.user)
  let dispatch = useDispatch()
  let location = useLocation()
  let history = useHistory()

  let path = location.pathname.slice(1)
  if (path === '') path = '/'
  let [pathname, setPathname] = useState<string>(path)
  let Icons: any = Icon

  let renderMenu = (data: any) => {
    return data.map((item: any) => {
      let icons: any = Icons[item.icon]
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu title={item.authName} key={item.path}>
              {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item  title={item.authName} key={item.path}>
        {item.authName}
      </Menu.Item>
    })
  }

  let clickItem = ({ item, key }: any) => {
    if (key === '/') key = ''
    setPathname(key)
    history.push(`/${key}`)
  }

  useEffect(() => {
    dispatch(getMenus())
  }, [dispatch])
  return (
    <Menu
      theme='dark'
      mode="inline"
      defaultOpenKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
      onClick={clickItem}>
      {renderMenu(state.menus)}
    </Menu>
  )
}

export default NavLeft
