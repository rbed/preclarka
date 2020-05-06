import React, { Component } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Layout } from "antd";

const { Content, Footer } = Layout;

class Home extends React.Component {
  state = {};

  render() {
    return (
      <>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout className="site-layout">
            <Navbar />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumbs />
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                Bill is a cat.
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Madafaka Preclarka ©2020 Created by Szatan
            </Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default Home;
