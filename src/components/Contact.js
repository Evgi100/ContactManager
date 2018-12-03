import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import axios from "axios";
import { Consumer } from "../context";

class Contact extends Component {
  state = {
    showInfo: false
  };

  toggleInfo = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };

  deleteContact = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          const { id, name, email, phone } = this.props.details;
          const { showInfo } = this.state;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  onClick={this.toggleInfo}
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={() => this.deleteContact(id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      marginRight: "1rem",
                      color: "black"
                    }}
                  />
                </Link>
              </h4>
              {showInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email:{email}</li>
                  <li className="list-group-item">Phone:{phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  details: PropTypes.object.isRequired
};

export default Contact;
