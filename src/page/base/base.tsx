import React, {FC, useState} from "react"
import { Layout } from 'antd'
import NavLeft from "../../components/navLeft/navLeft";
import NavHeader from "../../components/navHeader/navHeader";

const { Sider, Content } = Layout

const Base: FC = ({children}) => {
  let [collapsed, setCollapsed] = useState<boolean>(false)
  let toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <NavLeft></NavLeft>
        </Sider>
        <Layout className="site-layout">
          <NavHeader toggle={toggle}></NavHeader>
          <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
  )
}

export default Base

