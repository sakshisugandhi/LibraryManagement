import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import Vendor from './components/Vendor';
import { AddBook } from './components/Book-Form/AddBook';
import ViewAdmin from './components/view/ViewAdmin';
import  EditBook  from './components/Book-Form/EditBook';
import ViewVendor from './components/view/ViewVendor';
import VendorBooks from './components/VendorBooks';
import Return from './components/ReturnBook';
import ReturnBook from './components/ReturnBook';
import IssuedBooks from './components/IssuedBooks';
import Users from './components/Users';
import Categories from './components/Categories';
import CategoriesVendor from './components/CategoriesVendor';




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<SignUp/>}/>
        <Route path = 'login' element = {<Login/>}/>
        <Route path = '/admin' element = {<Admin/>}/>
        <Route path = '/vendor' element = {<Vendor/>}/>
        <Route path = '/addbooks' element = {<AddBook/>}/>
        <Route path = '/viewadmin/:id' element = {<ViewAdmin/>}/>
        <Route path = '/editbook/:id' element = {<EditBook/>}/>
        <Route path = '/viewvendor/:id' element = {<ViewVendor/>}/>
        <Route path = '/mybooks' element = {<VendorBooks/>}/>
        <Route path = '/view/mybooks/:id' element = {<ReturnBook/>}/>
        <Route path = '/IssuedBooks' element = {<IssuedBooks/>}/>
        <Route path = '/users' element = {<Users/>}/>
        <Route path = '/:name' element = {<Categories/>}/>
        <Route path = '/books/:name' element = {<CategoriesVendor/>}/>


        
        
      </Routes>
      
    </div>
  );
}

export default App;
