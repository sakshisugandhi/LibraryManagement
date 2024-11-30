import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import axios from 'axios';


export default function Users() {
    const[book,setBooks]=useState();

    const apiURL = "http://localhost:8000/library";
    const authAxios = axios.create({
      baseURL: apiURL,
    });

    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const response = await authAxios.get(`/alluser`);
            setBooks(response?.data?.users);
            console.log(response.data.users, "responseeee");
            // console.log(movies , "moviesss")
            // console.log(movies.data, "data")
            // setLoading(false);
          } catch (error) {
            // setError(error.message);
            // setLoading(false);
          }
        };
        fetchBooks();
    }, []);

    const tableRows = book?.map(
        (element) => {
            return (
             
                <tr >
                    <td>{element.fullName}</td>
                    <td>{element.email}</td>
                </tr>
                
 
            )
        }
    )
  
  return (
    <MDBTable striped >
      <MDBTableHead>
        <tr>
          <th scope='col'>Full Name</th>
          <th scope='col'>Email</th>
          {/* <th scope='col'>Last</th>
          <th scope='col'>Handle</th> */}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {/* <tr>
          <th scope='row'>1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope='row'>2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope='row'>3</th>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
        {tableRows}
      </MDBTableBody>
    </MDBTable>
  );
}