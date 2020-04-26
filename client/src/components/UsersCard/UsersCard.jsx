import React, { Component } from "react";
import { Pane, Button, Table } from "evergreen-ui";
import axios from "axios";
import AddressesService from "../../services/AddressesServices";

class UsersCard extends Component {
  state = {
    data: [],
  };

  async getData() {
    try {
      const doc = await AddressesService.get("/api/addresses");
      this.setState({ data: doc.data });
    } catch {}
  }

  renderTable() {
    return (
      <Table>
        {this.renderTableHeaders()}
        {this.renderTableBody(this.props.height)}
      </Table>
    );
  }

  renderTableHeaders() {
    return (
      <Table.Head>
        <Table.TextHeaderCell>Miasto</Table.TextHeaderCell>
        <Table.TextHeaderCell>Ulica</Table.TextHeaderCell>
      </Table.Head>
    );
  }

  renderTableBody(height) {
    return <Table.Body height={height}>{this.renderAddresses()}</Table.Body>;
  }

  renderAddresses() {
    const { data } = this.state;
    if (data.length === 0) return "";
    return data.map((address) => (
      <Table.Row
        key={address._id}
        isSelectable
        onSelect={() => alert(address.ulica)}
      >
        <Table.TextCell>{address.miasto}</Table.TextCell>
        <Table.TextCell>{address.ulica}</Table.TextCell>
      </Table.Row>
    ));
  }

  render() {
    return (
      <Pane border="default">
        <Button
          onClick={() => {
            this.getData();
          }}
        >
          Pobierz dane
        </Button>
        {this.renderTable()}
      </Pane>
    );
  }
}

export default UsersCard;
