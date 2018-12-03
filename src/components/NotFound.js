import React, { Fragment } from "react";

const NotFound = () => {

    

  return (
    <Fragment>
      <h1 className="display-4">
        {" "}
        <span className="text-danger">404</span> Not Found
      </h1>
      <p className="lead">Sorry That Page not exist</p>
    </Fragment>
  );
};

export default NotFound;
