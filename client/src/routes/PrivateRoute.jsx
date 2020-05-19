import React from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "../components/SideBar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { Layout } from "antd";

const { Content, Footer } = Layout;

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Layout style={{ minHeight: "100vh" }}>
            <Sidebar />
            <Layout className="site-layout">
              <Navbar />
              <Content>
                <Breadcrumbs />
                <div className="site-layout-background">
                  <Component {...props} />
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Madafaka Preclarka ©2020 Created by Szatan
              </Footer>
            </Layout>
          </Layout>
        </>
      )}
    />
  );
}
