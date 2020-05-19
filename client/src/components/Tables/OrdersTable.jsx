import React, { Component } from "react";
import { Table } from "antd";
import Client from "../../../src/modules/Client/Client";

const columns = [
  {
    title: "Teamt",
    dataIndex: "temat",
    key: "temat",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Ile Art",
    dataIndex: "ileArt",
    key: "ileArt",
  },
  {
    title: "Długość Art",
    dataIndex: "dlugoscArt",
    key: "dlugoscArt",
  },
  {
    title: "Wartość",
    dataIndex: "wartosc",
    key: "wartosc",
  },
  {
    title: "Utworzone",
    dataIndex: "created",
    key: "created",
  },
];

class OrdersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      orders: {
        temat: "",
        ileArt: "",
        dlugoscArt: "",
        wartosc: "",
        created: "",
      },
    };
  }

  async componentDidMount() {
    try {
      const doc = await Client.Services.OrdersService.get("/api/orders");
      this.setState({ data: doc.data });
      console.log(this.state.data);
    } catch {}
  }

  render() {
    const dataSource = [
      {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
      },
    ];

    const dupa = dataSource.map((d) => <p>{d.name}</p>);
    const chuj = this.state.data;
    const printFuck = chuj.map((d) => <p>{d.name}</p>);

    return (
      <>
        <Table columns={columns} dataSource={[...this.state.data]} />
        <p>{dupa}</p>
        <p>{printFuck}</p>
      </>
    );
  }
}

export default OrdersTable;
