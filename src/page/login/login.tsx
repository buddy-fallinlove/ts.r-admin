import React, { FC } from 'react'
import { Form, Input, Button, message } from 'antd';
import {useHistory} from 'react-router-dom'
import './index.scss'
import api from '../../http/api'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
}


const Login: FC = () => {
  let history = useHistory()
  let onFinish = (values: any) => {
    api.login({
      username: values.username,
      password: values.password
    }).then((res: any) => {
      if (res.meta.status === 200) {
        message.success('登录成功')
        localStorage.setItem('adminUser', JSON.stringify(res.data))
        localStorage.setItem('adminToken', res.data.token)
        history.push('/')
      }
    })
  }
  return (
    <div className='login-container'>
      <div className='login-title'>
        欢迎来到小爱后台管理系统
      </div>
      <Form
        initialValues={
          {
            username: 'admin',
            password: '123456',
          }
        }
        {...layout}
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
