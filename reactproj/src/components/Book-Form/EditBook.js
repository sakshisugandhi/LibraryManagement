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
import ViewAdmin from "../view/ViewAdmin";


function EditBook (props) {
  const [data, setdata] = useState({
    title: "",
    description: "",
    category: "",
    ISBN: "",
    image: "",
  });
  const [title,setTitle] = useState()
  const[description,SetDescription]=useState()
  const navigate = useNavigate();
  const [image, setimage] = useState();
  const[pic,setPic] = useState()
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [Message, setMessage] = useState("");
  const[book,setBook]= useState("")
  const params = useParams()
  const[category,setCategory] = useState("")

  const token = localStorage.getItem("token");
  const apiURL = "http://localhost:8000/books";

  const authAxios = axios.create({
    baseURL: apiURL,
    headers: {
     Authorization: token,
    },
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.warn(params , "params")
        const {data} = await authAxios.get(`/get/${id}`);

        setBook(data?.data);
        console.log(data.data);                                     
        console.log(data?.data,"book")    
        setTitle(data?.data?.title)
        SetDescription(data?.data?.description)
        setPic(data?.data?.image)
        setCategory(data?.data?.category)
        
      } catch (error) {
        setError(error.message);
        // setLoading(false);      
      }
    };         
    fetchBook();
  }, [id]);

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

    // const { title, description, category, ISBN } = data;
    console.log(image, "iimage");
    // console.log(data.image , "data.imageeeeeeeeeeeeeeee")
    // console.log(data.title , "data.titleee")
    try {
      authAxios.put(`/update/${id}`, {
        title: title,
        description: description,
        category: category,
        // image: image,
      });
      setMessage("Book has been Updated");
      setTimeout(() => {
        setMessage(" ");
      }, 5000);
    } catch (err) {
      setError(err.response);
    }
  };


  const onChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
    console.log(setdata, "settdata");
  };

  return (
    <>
      <Container component={Paper} className={classes.wrapper}  style={{height:"100%"}} >
        <Typography className={classes.pageHeader} variant="h5">
          Edit Book
        </Typography>
        <br />
        <form noValidate autoComplete="on">
          <FormGroup>
            <FormControl className={classes.mb2}>
              
              <TextField
                // label="Title"
                placeholder="Title"
                name="title"
                // value={data && data.title}
                // onChange={onChange}
                value={title}
                // autoComplete="{title}"
                onChange={(e)=>{setTitle(e.target.value)}}
      
              />
            </FormControl>
            <FormControl className={classes.mb2}>
              <TextField
                // label="Description"
                placeholder="Description"                            
                name="description"
                // value={data && data.description}
                // onChange={onChange}
                value={description}
                onChange={(e)=>{SetDescription(e.target.value)}}
              />
            </FormControl>

            <FormControl className={classes.mb2}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                vrequired
                // value={data && data.category}
                // onChange={onChange}
                value={category}
                onChange={(e)=>{setCategory(e.target.value)}}
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
              {/* <input
                type="file"
                name="file"
                onChange={handleImage}
                // value={data && data.setimage}
                
                style={{ display: "block", margin: "10px auto" }}
                
              /> */}
               <img src={pic} width="180px"/> 
              {/* <img src={image} width="180px" /> */}
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
              Edit Book
            </Button>
            {Message && (
              <Typography variant="body1" color="blue">
                {" "}
                {Message}
              </Typography>
            )}
          </div>
        </form>
      </Container>
    </>
  );
};

export default EditBook
