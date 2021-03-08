import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col} from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import UserProfile from "../components/UserProfile";
import LoginForm from '../components/LoginForm';

import styles from '../styles/AppLayout.module.scss'

const AppLayout = ({children}) => {
  const [current,setCurrent] = useState('main')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  function handleClick (e) {
    console.log('click ', e.key);
    setCurrent(e.key);
  }

  return (
    <div>
      <Menu mode="horizontal" onClick={handleClick} selectedKeys={current}>
        <Menu.Item key="main" icon={<MailOutlined />}>
          <Link href="/"><a>Main</a></Link>
        </Menu.Item>
        <Menu.Item key="profile" icon={<AppstoreOutlined />}>
           <Link href="/profile"><a>Profile</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search enterButton className={styles.vm}/>
        </Menu.Item>
	
        <Menu.Item key="signup" icon={<SettingOutlined />} >
           <Link href="/signup"><a>Signup</a></Link>        
        </Menu.Item>        
      </Menu>
      <Row gutter={16}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile/> : <LoginForm/> }
        </Col>
        <Col xs={24} md={12}>{children}sign up page</Col>
        <Col xs={24} md={6}><a href="" rel="noreferrer noopener">april</a> </Col>
      </Row>
                      
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;