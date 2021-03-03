import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { userType } from '../../reducers/userType';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: userType.LOG_OUT,
      payload: null,
    });
    history.push('/login');
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      data-test="header_menu"
    >
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item
        key="register"
        icon={<UserSwitchOutlined />}
        className="float-right"
      >
        <Link to="/register">Register</Link>
      </Item>
      <Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/login">Login</Link>
      </Item>

      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined />} onClick={logout}>
          LogOut
        </Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
