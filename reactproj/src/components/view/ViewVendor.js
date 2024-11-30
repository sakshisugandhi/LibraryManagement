import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, CircularProgress, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ConfirmDialog from "../confirmation";
import { Link } from "react-router-dom";
import classes from '../Book-Form/style.module.css'
import { useNavigate } from "react-router-dom";

function ViewVendor() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [requestError, setRequestError] = useState(null);
  const [message, setmessage] = useState(null);

  const token = localStorage.getItem("token");
  const apiURL = "http://localhost:8000/books";

  const authAxios = axios.create({
    baseURL: apiURL,
    headers: {
      Authorization: token,
    },
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#333",
      },
      secondary: {
        main: "#555",
      },
    },
    typography: {
      fontWeightBold: 600,
    },
  });

    const fetchBook = async () => {
      try {
        const response = await authAxios.get(`/get/${id}`);
        setBook(response?.data?.data);
        console.log(response?.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchBook();
      }, []);


  if (loading) {
    return (
      <Container maxWidth="md">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Typography variant="body1" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container maxWidth="md">
        <Typography variant="body1">Book not found</Typography>
      </Container>
    );
  }
  console.log(book);

  const handleIssuedBook = async (bookId) => {
    try {
      await authAxios.put(`/put/${bookId}`, { availability: "ISSUED" });
        fetchBook();
        navigate('/vendor')
    } catch (error) {
      setRequestError(error.message);
      setTimeout(() => {
        setRequestError(null);
      }, 4000);
    }
  };

  
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <br />
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            Book Details
          </Typography>
          {/* <hr /> */}
          <Typography variant="h6" color="primary" gutterBottom>
            Title: {book?.title}
          </Typography>
          <hr />
          <img
            src={book.image}
            alt="Image loading"
            width="280px"
            height="350"
            paddingTop="56.25%"
          />
          <br />
          <br />
          <Typography variant="body1" color="secondary" gutterBottom>
            Description: {book?.description}
          </Typography>
          <Typography variant="body2" gutterBottom>
            ISBN: {book?.ISBN}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Availability: {book?.availability}
          </Typography>
          {book?.availability !== "ISSUED" && (
            <div className={classes.btnContainer}>
            <Button
              variant="contained"
              color='error'
              onClick={() => handleIssuedBook(book._id)}
            >
              Issue Book
            </Button>
            </div>
          )}
        </Container>

        {message && (
          <Typography variant="body1" color="blue">
            {" "}
            {message}
          </Typography>
        )}
      </ThemeProvider>
    </div>
  );
}

export default ViewVendor;
