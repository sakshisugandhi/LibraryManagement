import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:8000/library/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // console.log(response)
        setLoginSuccess(response.data.success);
        console.log(response.data.success, "success");
        setLoginMessage(response.data.message);
        if (response.data.success) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          const token1 = localStorage.getItem("token");
          axios
            .get("http://localhost:8000/library/user", {
              headers: {
                Authorization: token1,
              },
            })
            .then((response) => {
              console.log(response.data);
              if (response.data.users.role_type === "VENDOR") {
                console.log(response.data.users.role_type, "dataaaaaaaaa");
                navigate("/vendor");
              } else {
                navigate("/admin");
              }
            });
        }
      })
      .catch((err) => {
        console.log(err.response);
        setLoginSuccess(false);
        setLoginMessage("An error occurred during login");
      });
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="6">
          <div className="d-flex flex-row ps-5 pt-5">
            <MDBIcon fas icon="book" style={{ color: "#709085" }} />
            <span className="h1 fw-bold mb-0">Library</span>
          </div>

          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h3
              className="fw-normal mb-3 ps-5 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Log in
            </h3>

            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              required
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              required
              name="password"
              autoFocus
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <MDBBtn
              className="mb-4 px-5 mx-5 w-100"
              color="info"
              size="lg"
              onClick={() => handleSubmit()}
            >
              Login
            </MDBBtn>
            <div>
              {loginMessage && (
                <p color={loginSuccess ? "success" : "error"}>{loginMessage}</p>
              )}
            </div>

            <p className="small mb-5 pb-lg-3 ms-5">
              <a class="text-muted" href="#!">
                Forgot password?
              </a>
            </p>
            <p className="ms-5">
              Don't have an account?{" "}
              <Link to="/" class="link-info">
                Register here
              </Link>
            </p>
          </div>
        </MDBCol>

        <MDBCol sm="6" className="d-none d-sm-block px-0">
          {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp" */}
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?w=740&t=st=1692170397~exp=1692170997~hmac=d1be09e96a69f99db7ca80f81bd2601866b80c1170ee2c87e441ec97615fd758"
            alt="Login image"
            className="w-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
