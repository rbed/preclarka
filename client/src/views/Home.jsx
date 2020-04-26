import React, { Component } from "react";
import UserCard from "../components/UsersCard/UsersCard";

class Home extends Component {
  render() {
    return (
      <>
        <div>Welcome home</div>
        <UserCard height={240}></UserCard>
      </>
    );
  }
}

export default Home;
