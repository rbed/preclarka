import React, { Component } from "react";
import { Pane, Button, Table, TextInput } from "evergreen-ui";
import Client from "../../modules/Client/Client";

class UsersCard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createAddress = this.createAddress.bind(this);
  }

  state = {
    data: [],
    address: {
      street: "",
      houseNumb: "",
      apartNumb: "",
      city: "",
      postcode: "",
      country: "Polska",
    },
  };

  async getData() {
    try {
      const doc = await Client.Services.AddressesService.get();
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
        <Table.TextHeaderCell>nr Domu</Table.TextHeaderCell>
        <Table.TextHeaderCell>nr Lokalu</Table.TextHeaderCell>
        <Table.TextHeaderCell>Kod Pocztowy</Table.TextHeaderCell>
        <Table.TextHeaderCell>Kraj</Table.TextHeaderCell>
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
        <Table.TextCell>{address.nrDomu}</Table.TextCell>
        <Table.TextCell>{address.nrLokalu}</Table.TextCell>
        <Table.TextCell>{address.kodPocz}</Table.TextCell>
        <Table.TextCell>{address.kraj}</Table.TextCell>
      </Table.Row>
    ));
  }

  handleChange(e) {
    const name = e.target.name;
    console.log(e.target.name);
    this.setState({
      address: { ...this.state.address, [name]: e.target.value },
    });
  }

  async createAddress(e) {
    e.preventDefault();
    try {
      const doc = await Client.Services.AddressesService.create(
        this.state.address
      );
      this.setState({
        address: {
          street: "",
          houseNumb: "",
          apartNumb: "",
          city: "",
          postcode: "",
          country: "Polska",
        },
      });
    } catch {
      console.log("error");
    }
  }

  render() {
    return (
      <>
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

        <form>
          <TextInput
            name="street"
            placeholder="ulica..."
            value={this.state.address.street}
            onChange={this.handleChange.bind()}
          />
          <TextInput
            name="houseNumb"
            placeholder="numer domu..."
            value={this.state.address.houseNumb}
            onChange={this.handleChange}
          />
          <TextInput
            name="apartNumb"
            placeholder="numer lokalu..."
            value={this.state.address.apartNumb}
            onChange={this.handleChange}
          />
          <TextInput
            name="postcode"
            placeholder="kod pocztowy..."
            value={this.state.address.postcode}
            onChange={this.handleChange}
          />
          <TextInput
            name="city"
            placeholder="miasto..."
            value={this.state.address.city}
            onChange={this.handleChange}
          />
          <TextInput
            name="country"
            placeholder="kraj..."
            value={this.state.address.country}
            onChange={this.handleChange}
          />
          <Button onClick={this.createAddress}>Wyslij dane</Button>
        </form>
      </>
    );
  }
}

export default UsersCard;
