import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LoadingPage from './LoadingPage';
import Table from './Table';
import UsersNotFound from './UsersNotFound';
import SearchBar from './SearchBar';
import DeleteButton from './DeleteButton';
import Pagination from './Pagination';

import './HomePage.css';

const API_URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const HomePage = () =>  {
  
const [users, setUsers] = useState([]);
const [allUsers, setAllUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [currentUsers, setCurrentUsers] = useState([]);
const [usersToBeDeleted, setUserToBeDeleted] = useState([]);
const [query, setQuery] = useState("");
const usersPerPage = 10;

useEffect(() => {
    const fetchUsers = async () => {
     setLoading(true);
     const response = await axios.get(API_URL);
     setUsers(response.data);
     setAllUsers(response.data);
     setLoading(false);
    };

    fetchUsers();
}, []);

// pagination
useEffect(() => {
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const userSlice = users.slice(indexOfFirstUser,indexOfLastUser);
  if (userSlice.length === 0 ) {
    setCurrentPage(1);
  }

  setCurrentUsers(userSlice);

},[users, currentPage]);


// search for users
useEffect(() => {
const searchedUsers = allUsers.filter((user) => {
if (user.name.toLowerCase().includes(query.toLowerCase())) {
  return user;
} else if (user.email.toLowerCase().includes(query.toLowerCase())){
  return user;
} else if (user.role.toLowerCase().includes(query.toLowerCase())){
  return user;
} else {
  return "";
};

});
setUsers(searchedUsers)

}, [query, allUsers]);


// change page
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
}

// prev page
const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  } 
};

// next page
const nextPage = (maxPageLength) => {
  if (currentPage < maxPageLength) {
    setCurrentPage(currentPage + 1);
  }
}

// delete user
let deleteUser = (userId) => {
let usersLeft = [...users];
usersLeft = usersLeft.filter((user) => user.id !== userId);
setUsers(usersLeft);
setAllUsers(usersLeft);
}

// search users
const handleSearchUser = (event) => {

  event.preventDefault();

  setQuery(event.target.value);
};


// delete selected users
const handleDeleteUsers = (event) => {
  event.preventDefault();

  let usersLeft = [...users];
  let deletingUsers = [...usersToBeDeleted];

  usersLeft = usersLeft.filter((user) => !deletingUsers.includes(user.id));

  setUsers([...usersLeft]);
  setAllUsers([...usersLeft]);

}

    
  return (
    <div>
      {loading ? (
        <LoadingPage message={"Loading Users..."}/>
      ) : (
    <div className="homePage">
      <SearchBar
      query={query}
      handleSearchUser={handleSearchUser}
      placeholderText={"Search by name, email or role"} 
      />
        {users.length !== 0 ? (
    <div className="container">
        <Table
        totalUsers={users}
        users={currentUsers}
        setUsers={setUsers}
        deleteUser={deleteUser}
        setUserToBeDeleted={setUserToBeDeleted}
         />

    <div className="footer">
  <DeleteButton
  handleDeleteUsers={handleDeleteUsers}
  deleteText = "Delete Selected"
   />

   <Pagination
   usersPerPage={usersPerPage}
   totalUsers={users.length}
   paginate={paginate}
   prevPage={prevPage}
   nextPage={nextPage}
   selectedPage={currentPage}
    />

    </div>
    </div>
        ) : (
       <UsersNotFound />
        )}
    </div>
      )}
    </div>
  )
}

export default HomePage;