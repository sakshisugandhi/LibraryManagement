import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MDBInput } from "mdb-react-ui-kit";

function SignUp() {
  const [data, setdata] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    fullNameError: "",
    emailError: "",
    passwordError: "",
  });

  const handleSubmit = () => {
    const { fullName, email, password } = data;

    var fullNameRegex = /^[A-Za-z]+$/;
    var emailRegex = /\S+@\S+\.\S+/;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@]).{8,}$/;

    if (!fullNameRegex.test(data?.name)) {
      document.getElementById("nameError").textContent =
        "Please enter a valid name.";
      return false;
    }

    if (!emailRegex.test(data?.email)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
      return false;
    }
    if (!passwordRegex.test(data?.password)) {
      document.getElementById("passwordError").textContent =
        "Password should contain special characters";
      return false;
    } else {
      axios
        .post("http://localhost:8000/library", {
          fullName: fullName,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          setdata({
            fullName: "",
            email: "",
            password: "",
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
      alert(`Email : ${email}, Password : ${password}`);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
    setError({ ...error, [`${name}Error`]: "" });
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "whitesmoke" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <MDBInput
                              wrapperClass="mb-1 mx-1 w-100"
                              autoComplete="given-name"
                              name="fullName"
                              required
                              value={data && data.fullName}
                              onChange={onChange}
                              autoFocus
                              label="Full Name"
                              id="formControlLg"
                              type="text"
                              size="lg"
                            />
                            <span
                              id="fullNameError"
                              style={{ color: "red" }}
                            ></span>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <MDBInput
                              wrapperClass="mb-1 mx-1 w-100"
                              autoComplete="given-name"
                              name="email"
                              required
                              value={data && data.email}
                              onChange={onChange}
                              autoFocus
                              label="Email"
                              id="formControlLg"
                              type="email"
                              size="lg"
                            />
                            <span
                              id="emailError"
                              style={{ color: "red" }}
                            ></span>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <MDBInput
                              wrapperClass="mb-1 mx-1 w-100"
                              autoComplete="given-name"
                              name="password"
                              required
                              value={data && data.password}
                              onChange={onChange}
                              autoFocus
                              label="Password"
                              id="formControlLg"
                              type="password"
                              size="lg"
                            />
                            <span
                              id="passwordError"
                              style={{ color: "red" }}
                            ></span>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <MDBInput
                              wrapperClass="mb-1 mx-1 w-100"
                              autoComplete="given-name"
                              name="confirmPassword"
                              required
                              onChange={onChange}
                              autoFocus
                              label="Confirm Password"
                              id="formControlLg"
                              type="password"
                              size="lg"
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onSubmit={handleSubmit}
                            onClick={() => handleSubmit()}
                          >
                            Register
                          </button>
                        </div>

                        <p className="text-center text-muted mt-5 mb-0">
                          Have already an account?{" "}
                          <Link to="/Login" className="fw-bold text-body">
                            <u>Login here</u>
                          </Link>
                        </p>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?w=740&t=st=1692170397~exp=1692170997~hmac=d1be09e96a69f99db7ca80f81bd2601866b80c1170ee2c87e441ec97615fd758"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
