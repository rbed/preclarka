import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import RegisterContract from "./components/RegisterContract";
import RegisterInvoice from "./components/RegisterInvoice";

const { TabPane } = Tabs;

const registerWrapperCss = {
  width: "50%",
  position: "absolute",
  top: "0",
  left: "50%",
  transform: "translate(-50%, 2%)",
  border: "1px solid rgb(214, 212, 212)",
  padding: "25px 100px",
  marginBottom: "20px",
};

class Register extends React.Component {
  state = {
    current: "mail",
    contractorType: "",
  };

  render() {
    return (
      <div className="registerWrapper" style={registerWrapperCss}>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <UserOutlined />
                Osoba Fizyczna
              </span>
            }
            key="1"
          >
            <RegisterContract contractorTye={this.state.contractorType} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <TeamOutlined />
                Firma
              </span>
            }
            key="2"
          >
            <RegisterInvoice contractorTye={this.state.contractorType} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Register;
