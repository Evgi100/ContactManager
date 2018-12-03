import React, { Component } from "react";
import axios from "axios";

import ContactForm from "./ContactForm";


import { Consumer } from "../context";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e, dispatch) => {
    e.preventDefault();
    //   Check for errors
    const { name, email, phone } = this.state;

    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }
    axios.post(`https://jsonplaceholder.typicode.com/users`,this.state).then(res=> dispatch({ type: "ADD_CONTACT", payload:res.data }))
    this.setState({ name: "", email: "", phone: "", errors: {} });
    this.props.history.push('/')
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { name, email, phone, errors } = this.state;
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={e => this.onSubmit(e, dispatch)}>
                  {" "}
                  <ContactForm
                    name="name"
                    value={name}
                    type="text"
                    error={errors.name}
                    onChange={this.onChange}
                  />
                  <ContactForm
                    name="email"
                    value={email}
                    type="email"
                    error={errors.email}
                    onChange={this.onChange}
                  />
                  <ContactForm
                    name="phone"
                    value={phone}
                    type="phone"
                    error={errors.phone}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
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

export default AddContact;
