import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import {
  TeamOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  CheckCircleOutlined,
  FormOutlined,
  ExclamationCircleOutlined,
  IssuesCloseOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

class Sidebar extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        className="mailSider"
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        width="250px"
      >
        <div style={{ height: "60px" }} className="logo">
          <img src={logo} alt="Smiley face" />
        </div>

        <Menu
          style={{ textAlign: "left" }}
          theme="dark"
          defaultSelectedKeys={[""]}
          mode="inline"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Strona główna</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusCircleOutlined />}>
            <Link to="/create-order">Złóż zamówienie</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FormOutlined />}>
            <Link to="/orders-in-progress">Zamówienia realizowane</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<CheckCircleOutlined />}>
            <Link to="/orders-completed">Zamówienie zakończone</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<ExclamationCircleOutlined />}>
            <Link to="/orders-for-acceptance">Zamówienia do akceptacji</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<TeamOutlined />}>
            <Link to="/">Lista Copywriterów</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<TeamOutlined />}>
            <Link to="/">Użytkownicy</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<IssuesCloseOutlined />}>
            <Link to="/">Zamówienie do zlecenia</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<CheckCircleOutlined />}>
            <Link to="/">Nowe zamówienia</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<DollarCircleOutlined />}>
            <Link to="/">Finanse</Link>
          </Menu.Item>

          {/* 
          <SubMenu key="sub1" icon={<CopyOutlined />} title="Zamówienia">
            <Menu.Item key="3">Złóż zamówienie</Menu.Item>
            <Menu.Item key="4">Aktualnie realizowane</Menu.Item>
            <Menu.Item key="5">Zakończone</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
