import React, { Component } from "react";
import { Menu, Layout } from "antd";
import logo from "../../images/logo.png";
import { TeamOutlined, CopyOutlined, HomeOutlined } from "@ant-design/icons";
const { Sider } = Layout;
const { SubMenu } = Menu;

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
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        width="250px"
      >
        <div style={{ height: "60px" }} className="logo">
          <img src={logo} alt="Smiley face" />
        </div>

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Strona główna
          </Menu.Item>

          <SubMenu key="sub1" icon={<CopyOutlined />} title="Zamówienia">
            <Menu.Item key="3">Złóż zamówienie</Menu.Item>
            <Menu.Item key="4">Aktualnie realizowane</Menu.Item>
            <Menu.Item key="5">Zakończone</Menu.Item>
          </SubMenu>

          <Menu.Item key="2" icon={<TeamOutlined />}>
            Lista Copywriterów
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
