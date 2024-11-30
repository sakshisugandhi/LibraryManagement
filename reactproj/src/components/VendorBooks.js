import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material";

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function VendorBooks() {
  const [error, setError] = useState(null);
  const [books, setBooks] = useState(null);
  console.log(books, "books");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const apiURL = "http://localhost:8000/books";

  const classes = {
    root: {
      margin: "20px",
    },
    card: {
      maxWidth: 400,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cartIcon: {
      position: "absolute",
      top: "10px",
      right: "10px",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    searchbox: {
      padding: "10px",
      margin: "30px",
    },
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const authAxios = axios.create({
    baseURL: apiURL,
    headers: {
      Authorization: token,
    },
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await authAxios.get(`/vendorbooks`);
        setBooks(response?.data.book);
        console.log(response.data, "responseeee");
        // setLoading(false);
      } catch (error) {
        setError(error.message);
        // setLoading(false);
      }
    };

    fetchBooks();
  }, []);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} style={{ backgroundColor: "#cbcbcb" }}>
        <AppBar position="static" style={{ backgroundColor: "#2d6094" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              My Books
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(event) => setQuery(event.target.value)}
                value={query}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      <center>
        <br />
      </center>

      <MDBRow
        className="row-cols-1 row-cols-md-4 g-4"
        style={{
          flexWrap: "wrap",
          display: "flex",
        }}
      >
        {books?.length &&
          books
            ?.filter((book) => {
              if (query === "") {
                return book;
              } else if (
                book.title?.toLowerCase().includes(query.toLowerCase())
              ) {
                return book;
              }
            })
            .map((book, id) => (
              <div>
                <MDBCol key={book._id}>
                  <MDBCard
                    className="h-100"
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      width: "17rem",
                    }}
                  >
                    <MDBCardTitle>{book?.title}</MDBCardTitle>
                    <MDBCardImage
                      src={book?.image}
                      alt="Image loading"
                      width="140px"
                      height="200px"
                      display="flex"
                      paddingTop="56.25%"
                      max-height="250px"
                    />
                    <MDBCardBody>
                      <MDBCardText>
                        {book.description.substring(0, 80)}...
                      </MDBCardText>
                      <MDBCardText>{book.category}</MDBCardText>
                    </MDBCardBody>
                    <MDBBtn
                      type="submit"
                      onClick={() => {
                        navigate(`/view/mybooks/${book._id}`);
                      }}
                    >
                      View
                    </MDBBtn>
                    <br />
                  </MDBCard>
                </MDBCol>
                <br />
              </div>
            ))}
      </MDBRow>
    </div>
  );
}

export default VendorBooks;
