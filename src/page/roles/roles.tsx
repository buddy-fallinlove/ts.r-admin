import React, { useState, useEffect } from 'react'
import api from '../../http/api'
import { Role, RoleItem, Column } from './../../types/index'
import { Table, Button, Modal, Tree } from 'antd'

export interface TreeItem {
  key: number,
  title: string,
  children?: TreeItem[]
}



const Roles = () => {
  let [roleList, setRoleList] = useState<Role[]>([
    {
      id: 0,
      children: [],
      roleDesc: '',
      roleName: ''
    }
  ])
  let [settingVisible, setSettingVisible] = useState<boolean>(false)
  let [treeList, setTreeList] = useState<TreeItem[]>([
    {
      key: 0,
      title: ''
    }
  ])
  let [checks, setChecks] = useState<string[]>([])
  let [settingUser, setSettingUser] = useState<RoleItem>({
    id: 0,
    authName: '',
    path: '',
    children: [],
    child: []
  })

  let columns: Column[] = [
    {
      title: '#',
      key: 'index',
      dataIndex: 'index',
      align: 'center',
      render: (text: any, record: RoleItem, index: number) => {
        return (
          <span>{index + 1}</span>
        )
      }
    },
    {
      title: '角色名称',
      key: 'roleName',
      dataIndex: 'roleName',
      align: 'center'
    },
    {
      title: '角色描述',
      key: 'roleDesc',
      dataIndex: 'roleDesc',
      align: 'center'
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      render: (text: any, record: RoleItem) => {
        return (
          <Button type='primary' onClick={() => showSetting(record)}>分配权限</Button>
        )
      }
    }
  ]

  let getTreeList = () => {
    let arr: any = []
    api.allRights('tree').then((res: any) => {
      if (res.meta.status === 200) {
        res.data.map((item: any) => {
          let obj: { title: string, key: number, children: any[] } = {
            title: '',
            key: 0,
            children: []
          }
          obj.title = item.authName
          obj.key = item.id.toString()
          if (item.children && item.children.length) {
            item.children.forEach((item1: any) => {
              let obj1: { title: string, key: number, children: any[] } = {
                title: '',
                key: 0,
                children: []
              }
              obj1.title = item1.authName
              obj1.key = item1.id.toString()
              obj.children.push(obj1)
              if (item1.children && item1.children.length) {
                item1.children.forEach((item2: any) => {
                  let objItem: any = {}
                  objItem.title = item2.authName
                  objItem.key = item2.id.toString()
                  obj1.children.push(objItem)
                })
              }
            })
          }
          arr.push(obj)
        })
        setTreeList(arr)
        let checks: string[] = []
        settingUser.child?.forEach((item: RoleItem) => {
          checks.push(item.id.toString())
          if (item.child && item.child.length) {
            item.child.forEach((item1: RoleItem) => {
              checks.push(item1.id.toString())
              if (item1.child && item1.child.length) {
                item1.child.forEach((item2: RoleItem) => {
                  checks.push(item2.id.toString())
                })
              }
            })
          }
        })
        setChecks(checks)
      }
    })
  }

  let showSetting = (record: RoleItem) => {
    setSettingVisible(true)
    setSettingUser(record)
    getTreeList()

  }

  let settingOk = () => {

  }
  let settingCancel = () => {
    setSettingVisible(false)
  }

  useEffect(() => {
    api.getRole().then((res: any) => {
      if (res.meta.status === 200) {
        res.data.forEach((item: RoleItem) => {
          item.child = item.children
          if (item.children && item.children.length) {
            item.children.forEach((item1: RoleItem) => {
              item1.child = item1.children
              delete item1.children
              if (item1.children && item1.children.length) {
                item1.children.forEach((item2: RoleItem) => {
                  item2.child = item2.children
                  delete item2.children
                })
              }
            })
          }
          delete item.children
        })
        setRoleList(res.data)
      }
    })
  }, [])

  return (
    <>
      <Table rowKey='id' dataSource={roleList} columns={columns} />
      <Modal
        title="分配权限"
        visible={settingVisible}
        onOk={settingOk}
        onCancel={settingCancel}
      >
        <Tree
          multiple
          checkable
          defaultExpandAll={true}
          defaultCheckedKeys={checks}
          defaultSelectedKeys={checks}
          treeData={treeList} />
      </Modal>
    </>
  )
}

export default Roles
