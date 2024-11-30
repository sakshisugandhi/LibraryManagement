import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, CircularProgress, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classes from "../components/Book-Form/style.module.css";


function ReturnBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const[message, setmessage]= useState("")
  const navigate = useNavigate();

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

  const handleReturnedBook = async (bookId) => {
    try {
      await authAxios.put(`/return/${bookId}`, {
        availability: "NOT ISSUED",
        userid: " ",
      });
      fetchBook();
      navigate("/vendor");
    } catch (error) {
      setRequestError(error.message);
      setTimeout(() => {
        setRequestError(null);
      }, 4000);
    }
  };
  return (
    <div >
      <br />
      <ThemeProvider theme={theme} >
        <Container maxWidth="md" >
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            Book Details
          </Typography>
          <hr />
          <Typography variant="h6" color="primary" gutterBottom>
            Title: {book?.title}
          </Typography>
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
          {book.availability !== "NOT ISSUED" && (
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleReturnedBook(book._id)}
              >
                Return
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

export default ReturnBook;
