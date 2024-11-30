import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import { Typography, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import { InputBase } from "@mui/material";
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function Categories() {
  const { name } = useParams();
  const [books, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [requestError, setRequestError] = useState(null);
  // const [message, setmessage] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
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

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await authAxios.get(`/getbook/${name}`);

        setBook(response?.data?.data);
        console.log(response?.data?.data, ">>>>>>data,");
        console.log(books, "book");
        console.log(books?.length, "length");
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBook();
  }, [name]);

  if (searchInput.length > 0) {
    books?.data?.filter((country) => {
      return country.title.match(searchInput);
    });
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#2d6094" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Books List
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

        <br />
      </Box>

      <MDBRow
        className="row-cols-1 row-cols-md-4 g-4"
        style={{
          flexWrap: "wrap",
          display: "flex",
        }}
      >
        {books?.length > 0 ? (
          books
            ?.filter((book) => {
              if (query === "") {
                console.log(books, "book1");
                console.log(books?.length);
                return book;
              } else if (
                book.title?.toLowerCase().includes(query.toLowerCase())
              ) {
                console.log(book, "book2");
                console.log(books.length);

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
                      component={Link}
                      type="submit"
                      onClick={() => {
                        navigate(`/viewadmin/${book._id}`);
                      }}
                    >
                      View
                    </MDBBtn>
                    <br />
                  </MDBCard>
                </MDBCol>
                <br />
              </div>
            ))
        ) : (
          <Typography variant="body1">No data available</Typography>
        )}
      </MDBRow>
      {/* </Grid> */}
    </div>
  );
}

export default Categories;
