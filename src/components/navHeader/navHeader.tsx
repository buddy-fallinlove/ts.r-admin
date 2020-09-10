import React, { useState, useEffect } from 'react'
import { Layout, message } from 'antd'
import {useHistory} from 'react-router-dom'
import './index.scss'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import { Admin } from '../../types'

const { Header } = Layout

interface Props {
  toggle: (val: boolean) => void
}


const NavHeader =  (props: Props) => {
  let history = useHistory()
  let [collapsed, setCallapsed] = useState<boolean>(true)
  let [user, setUser] = useState<Admin>({
    id: -1,
    email: '',
    mobile: '',
    rid: -1,
    token: '',
    username: ''
  })
  let toggle = () => {
    setCallapsed(!collapsed)
    props.toggle(collapsed)
  }
  let logout = () => {
    localStorage.removeItem('adminUser')
    localStorage.removeItem('adminToken')
    history.push('/login')
    message.success('欢迎下次光临')
  }
  useEffect(() => {
    if (localStorage.adminUser) {
      let user = JSON.parse(localStorage.adminUser)
      setUser(user)
    } else {
      history.push('/login')
    }
  }, [history])
  return (
    <Header className='header-header' style={{ padding: '0 20px' }}>
      {React.createElement(collapsed ? MenuFoldOutlined :  MenuUnfoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}
      <div className='header-content'>
        <div className='name'>亲爱的 {user.username}</div>
        <div className='out' onClick={logout}>退出</div>
      </div>
    </Header>
  )
}

export default NavHeader