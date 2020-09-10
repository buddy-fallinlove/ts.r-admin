import React, { useState, useEffect } from 'react'
import { Switch, Table, Button, Input, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getUserList } from './../../store/actions/user'
import { Column, User } from '../../types'
import api from '../../http/api'
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons'

const { Search } = Input
const Users = () => {
  let user = useSelector((state: any) => state.user)
  let dispatch = useDispatch()
  let [pagenum, setPagenum] = useState<number>(1)
  let [pagesize, setPagesize] = useState<number>(10)
  let [query, setQuery] = useState<string>('')

  // 表格参数
  const columns: Column[] = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text: any, record: User, index: number) => {
        return (
          <>
            {index + 1}
          </>
        )
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      align: 'center'
    },
    {
      title: '角色',
      dataIndex: 'role_name',
      key: 'role_name',
      align: 'center'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align: 'center'
    },
    {
      title: '电话',
      dataIndex: 'mobile',
      key: 'mobile',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: ((text: boolean, record: User) => {
        return (
          <Switch
            checkedChildren="可用"
            unCheckedChildren="禁用"
            checked={record.mg_state}
            onChange={(e) => changeSwitch(e, record)} />
        )
      })
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      render: (text: any, record: User) => {
        return (
          <div className='flex a-center j-center'>
            <Button type='primary' icon={<EditOutlined />}></Button>
            <Button type='primary' className='ml-1 mr-1' danger icon={< DeleteOutlined />}></Button>
            <Button type='primary' icon={<SettingOutlined />}></Button>
          </div>
        )
      }
    }
  ]

  // 分页参数
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: false,
    showTotal: () => `共${user.total}条`,
    pageSize: pagesize,
    current: pagenum,
    total: user.total,
    onShowSizeChange: (current: number, pageSize: number) => changePageSize(pageSize, current),
    onChange: (current: number) => changePage(current),
  }

  useEffect(() => {
    dispatch(getUserList({
      pagenum,
      pagesize
    }))
  }, [pagenum, pagesize])

  // 分页
  let changePageSize = (pageSize: number, current: number) => {
    setPagesize(pageSize)
    setPagenum(current)
    dispatch(getUserList({
      pagenum: current,
      pagesize: pageSize,
      query 
    }))
  }

  // 分页
  let changePage = (current: number) => {
    setPagenum(current)
    dispatch(getUserList({
      pagenum: current,
      pagesize,
      query 
    }))
  }

  // 切换状态
  let changeSwitch = (e: any, record: User) => {
    api.updateUserState({
      uId: record.id,
      type: e
    }).then((res: any) => {
      if (res.meta.status === 200) {
        message.success('更新状态成功')
        dispatch(getUserList({
          pagenum,
          pagesize,
          query
        }))
      }
    })
  }

  let search = (value: string) => {
    setQuery(value)
    dispatch(getUserList({
      pagenum,
      pagesize,
      query: value
    }))
  }

  return (
    <div>
      <div className='flex a-center mb-3'>
        <Search style={{ width: 400 }} placeholder="请输入关键字" onSearch={(value: string) => search(value)} />
        <Button type='primary' className='ml-2'>添加用户</Button>
      </div>
      <Table
        loading={user.loading}
        bordered rowKey='id'
        columns={columns}
        dataSource={user.users}
        pagination={paginationProps} />
    </div>
  )
}

export default Users
