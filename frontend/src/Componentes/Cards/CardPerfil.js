import React from "react";

export const CardPerfil = () => {
  return (
    <>
      <form className="row g-3">
        <div className="col-auto">
          <label for="staticEmail2" className="visually-hidden">
            Email
          </label>
          <input
            type="text"
            readonly
            className="form-control-plaintext"
            id="staticEmail2"
            value="email@example.com"
          />
        </div>
        <div className="col-auto">
          <label for="inputPassword2" className="visually-hidden">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword2"
            placeholder="Password"
          />
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-outline-dark">
            siesta
          </button>
          <button type="submit" className="btn btn-primary mb-3">
            Confirm identity
          </button>
        </div>
      </form>
    </>
  );
};
