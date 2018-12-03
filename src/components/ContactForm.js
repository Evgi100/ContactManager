import React from "react";

import classnames from "classnames";

const ContactForm = props => {
  const { name, value, onChange, type, error } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{name.toUpperCase()}:</label>
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={`Enter ${name}...`}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default ContactForm;
