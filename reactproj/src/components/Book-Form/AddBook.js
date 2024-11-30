import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Container,
  Button,
  TextField,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import classes from "./style.module.css";
import axios from "axios";

export const AddBook = () => {
  const [data, setdata] = useState({
    title: "",
    description: "",
    category: "",
    ISBN: "",
    image: "",
  });

  const { bookIsbn } = useParams();
  const navigate = useNavigate();
  const [image, setimage] = useState();

  const handleImage = (e) => {
    console.log(e.target.files);
    const data = new FileReader();
    console.log(data);
    data.addEventListener("load", () => {
      setimage(data.result);
      console.log(setimage, "settttttttimageeee");
    });
    data.readAsDataURL(e.target.files[0]);
    console.log(image, "imageee");
  };

  const handleSubmit = () => {
    // event.preventDefault();

    const { title, description, category, ISBN } = data;
    console.log(image, "iimage");
    // console.log(data.image , "data.imageeeeeeeeeeeeeeee")
    // console.log(data.title , "data.titleee")

    axios
      .post("http://localhost:8000/books/post", {
        title: title,
        description: description,
        category: category,
        ISBN: ISBN,
        image: image,
      })
      .then((response) => {
        console.log(response.data);
        // setdata(response.data)
        
        // setdata({
        //   title: "",
        //   description: "",
        //   category: "",
        //   ISBN: "",
        //   image: "",
        // });
 
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    // console.log(value , "valueeeeeeee")
    // console.log(name  , "nameeeee")
    setdata({ ...data, [name]: value });
    console.log(setdata, "settdata");
  };

  return (
    <>
    <div>
      <Container component={Paper} className={classes.wrapper} style={{height:"100%"}}  >
        <Typography className={classes.pageHeader} variant="h5">
          Add Book
        </Typography>
        <form noValidate autoComplete="off">
          <FormGroup>
            <FormControl className={classes.mb2}>
              <TextField
                label="Title"
                name="title"
                value={data && data.title}
                onChange={onChange}
                required
              />
            </FormControl>
            <FormControl className={classes.mb2}>
              <TextField
                label="Description"
                name="description"
                value={data && data.description}
                onChange={onChange}
              />
            </FormControl>

            <FormControl className={classes.mb2}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                vrequired
                value={data && data.category}
                onChange={onChange}
              >
                <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
                <MenuItem value="Action">Action</MenuItem>
                <MenuItem value="Adventure">Adventure</MenuItem>
                <MenuItem value="Horror">Horror</MenuItem>
                <MenuItem value="Romance">Romance</MenuItem>
                <MenuItem value="Mystery">Mystery</MenuItem>
                <MenuItem value="Thriller">Thriller</MenuItem>
                <MenuItem value="Drama">Drama</MenuItem>
                <MenuItem value="Fantasy">Fantasy</MenuItem>
                <MenuItem value="Comedy">Comedy</MenuItem>
                <MenuItem value="Biography">Biography</MenuItem>
                <MenuItem value="History">History</MenuItem>
                <MenuItem value="Coding">Coding</MenuItem>
                <MenuItem value="Western">Western</MenuItem>
                <MenuItem value="Literature">Literature</MenuItem>
                <MenuItem value="Poetry">Poetry</MenuItem>
                <MenuItem value="Philosophy">Philosophy</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.mb2}>
              <TextField
                label="ISBN"
                name="ISBN"
                value={data && data.ISBN}
                onChange={onChange}
                required
              />
            </FormControl>

            <FormControl className={classes.mb2}>
              <input
                type="file"
                name="file"
                onChange={handleImage}
                value={data && data.setimage}
                style={{ display: "block", margin: "10px auto" }}
              />
              <img src={image} width="180px" />
            </FormControl>
          </FormGroup>
          <div className={classes.btnContainer}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Add Book
            </Button>
          </div>
        </form>
      </Container>
      </div>
    </>
  );
};
