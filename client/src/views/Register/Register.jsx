import React from "react";
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
    type: "contract",
  };

  setType = (e) => {
    // console.log(this.state.type);
    const state = this.state;
    console.log(this.state.type);
    if (state.type === "contract") {
      this.setState({ type: "invoice" });
    } else if (state.type === "invoice") {
      this.setState({ type: "contract" });
    }
  };

  render() {
    return (
      <div className="registerWrapper" style={registerWrapperCss}>
        <Tabs defaultActiveKey="1" onChange={this.setType}>
          <TabPane
            tab={
              <span>
                <UserOutlined />
                Osoba Fizyczna
              </span>
            }
            key="1"
          >
            <RegisterContract
              getType={this.state.type}
              // contractorTye={this.state.contractorType}
              // getUserForm={this.setUserForm}
              // getStep={this.updateCurrentStep}
            />
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
            <RegisterInvoice getType={this.state.type} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Register;
