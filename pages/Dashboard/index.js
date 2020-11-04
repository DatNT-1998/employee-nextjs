import styles from '../../styles/Home.module.css';
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css'
import { useRouter } from 'next/router';

import Link from 'next/link';

const { Header, Content, Sider } = Layout;

function Dashboard({ children }) {

  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();


  const toggle = () => (
    setCollapsed(!collapsed)
  );

  function handleOnClick() {
    router.push("/employee")
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} >
          <div className={styles.logo} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link href="/employee"><a>Employee</a></Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<PieChartOutlined />}>

            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: toggle,
            })}
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div className="" style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default Dashboard;