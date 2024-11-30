import React from "react";
import { styled } from "@mui/material";
import { Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CategoryIcon from "@mui/icons-material/Category";
import { Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { Menu } from "@mui/material";
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

const drawerWidth = 240;
const token = localStorage.getItem("token");

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: -4,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Vendor = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const apiURL = "http://localhost:8000/books";
  const authAxios = axios.create({
    baseURL: apiURL,
  });

  const classes = {
    root: {
      margin: "20px",
    },

    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
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
  const [error, setError] = useState(null);
  const [books, setBooks] = useState(null);
  console.log(books, "books");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [name, setName] = useState(" ");
  const [value, setValue] = useState("fdf");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await authAxios.get(`/allbooks`);
        setBooks(response?.data);
        console.log(response.data, "responseeee");
        // setLoading(false);
      } catch (error) {
        setError(error.message);
        // setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    localStorage.clear(token);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    books?.data?.filter((country) => {
      return country.title.match(searchInput);
    });
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl, "anchore1");
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    const value = event?.target?.getAttribute("value");
    console.log(value, "<<<target");
    // setName(event.target.getAttribute("value"))
    setValue(value);
    console.log({ value });
    navigate(`/books/${value}`);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" style={{ backgroundColor: "#2d6094" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              // sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
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

            {/* <input
 className="search-box"
  type="text"
  placeholder="Search here"
 onChange={(event) => setQuery(event.target.value)}
         value={query}/>
         <SearchIconWrapper  style={{ position: "absolute", left: "1266px", top: "3px" }}>
                <SearchIcon />
              </SearchIconWrapper>  */}
          </Toolbar>
        </AppBar>
        <hr />

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/mybooks`}>
                <LibraryBooksIcon />
                <ListItemText primary="My Books" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={handleClick}>
              <ListItemButton>
                <CategoryIcon />
                <ListItemText primary="Categories" />
              </ListItemButton>
            </ListItem>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              // onClose={handleClose}
            >
              <MenuItem value="Sci-Fi" onClick={handleClose}>
                Sci-Fi
              </MenuItem>
              <MenuItem value="Action" onClick={handleClose}>
                Action
              </MenuItem>
              <MenuItem value="Adventure" onClick={handleClose}>
                Adventure
              </MenuItem>
              <MenuItem value="Horror" onClick={handleClose}>
                Horror
              </MenuItem>
              <MenuItem value="Romance" onClick={handleClose}>
                Romance
              </MenuItem>
              <MenuItem value="Mystery" onClick={handleClose}>
                Mystery
              </MenuItem>
              <MenuItem value="Thriller" onClick={handleClose}>
                Thriller
              </MenuItem>
              <MenuItem value="Drama" onClick={handleClose}>
                Drama
              </MenuItem>
              <MenuItem value="Fantasy" onClick={handleClose}>
                Fantasy
              </MenuItem>
              <MenuItem value="Comedy" onClick={handleClose}>
                Comedy
              </MenuItem>
              <MenuItem value="Biography" onClick={handleClose}>
                Biography
              </MenuItem>
              <MenuItem value="History" onClick={handleClose}>
                History
              </MenuItem>
              <MenuItem value="Coding" onClick={handleClose}>
                Coding
              </MenuItem>
              <MenuItem value="Western" onClick={handleClose}>
                Western
              </MenuItem>
              <MenuItem value="Literature" onClick={handleClose}>
                Literature
              </MenuItem>
              <MenuItem value="Poetry" onClick={handleClose}>
                Poetry
              </MenuItem>
              <MenuItem value="Philosophy" onClick={handleClose}>
                Philosophy
              </MenuItem>
            </Menu>

            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                component={Link}
                to={`/login`}
              >
                <LogoutIcon />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
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
                      marginLeft:"30px"
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
                        navigate(`/viewvendor/${book._id}`);
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
    </>
  );
};

export default Vendor;
