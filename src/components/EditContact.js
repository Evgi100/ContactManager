import React, { Component } from "react";
import axios from "axios";

import ContactForm from "./ContactForm";

import { Consumer } from "../context";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e, dispatch) => {
    const { id } = this.props.match.params;
    e.preventDefault();
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      this.state
    );
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });
    this.setState({ name: "", email: "", phone: "", errors: {} });
    this.props.history.push("/");
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { name, email, phone } = this.state;
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={e => this.onSubmit(e, dispatch)}>
                  {" "}
                  <ContactForm
                    name="name"
                    value={name}
                    type="text"
                    onChange={this.onChange}
                  />
                  <ContactForm
                    name="email"
                    value={email}
                    type="email"
                    onChange={this.onChange}
                  />
                  <ContactForm
                    name="phone"
                    value={phone}
                    type="phone"
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
