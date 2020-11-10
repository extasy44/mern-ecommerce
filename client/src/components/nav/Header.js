import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="login" icon={<UserAddOutlined />}>
        Login
      </Menu.Item>
      <Menu.Item key="register" icon={<UserSwitchOutlined />}>
        Register
      </Menu.Item>
      <SubMenu
        key="SubMenu"
        icon={<UserSwitchOutlined />}
        title="Login/Register"
      >
        <Menu.Item key="setting:1">Login</Menu.Item>
        <Menu.Item key="setting:2">Register</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
