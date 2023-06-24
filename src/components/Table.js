import React, {useState, useEffect} from 'react';
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';

import './Table.css';

const Table = ({
  totalUsers, 
  setUsers, 
  users, 
  deleteUser, 
  setUserToBeDeleted
 }) => {

    const [editRowId, setEditRowId] = useState(null);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [editUserData, setEditUserData] = useState({
      name : "",
      email : "",
      role : ""
    });

    // select users to be deleted
    useEffect(() => {
      setUserToBeDeleted([...selectedRowIds])
    }, [selectedRowIds, setUserToBeDeleted]);


    //to reset states when page changes
    useEffect(() => {
      setSelectedRowIds([]);
      setSelectAll(false);
    }, [users]);

    //set all users of the current page
    useEffect (() => {
      const userIDs = users.map((user) => user.id);
      if(selectAll) {
        setSelectedRowIds(userIDs)
      } else {
        setSelectedRowIds([]);
      }
    }, [selectAll, users])


    // when edit button is clicked
    const clickEditUser = (user) => {
    setEditRowId(user.id);
    setEditUserData({name: user.name, email: user.email, role: user.role});
    };

    // when cancel edit button is clicked
    const closeEditUser = () => {
      setEditRowId(null);
    }

    // when user checkbox is selected
    const selectUser = (user) => {
      let selectedIndices = [...selectedRowIds];
      const index = selectedIndices.findIndex((id) => id === user.id);

      if (index === -1) {
        setSelectedRowIds([...selectedIndices, user.id]);
      } else {
      selectedIndices.splice(index, 1);
      setSelectedRowIds(selectedIndices);
      }
    };

    // when all users are selected
    const handleSelectAll = () => {
      setSelectAll((selectAll) => !selectAll);
    };

    // when user fields are getting edited
    const handleEditUserChange = (event) => {
    event.preventDefault();

    setEditUserData({
      ...editUserData,
      [event.target.name]: event.target.value,
    });
    };

    //when user submits edited fields
    const handleEditFormSubmit = (event) => {
      event.preventDefault();

      const editUser = {
        id: editRowId,
        name: editUserData.name,
        email: editUserData.email,
        role: editUserData.role
      };

      const newUsers = totalUsers.map((user) => {
        if(user.id === editRowId){
          return { ...user, ...editUser };
        }
        return user;
      });
      setUsers(newUsers);
      setEditRowId(null);
    }

    
  return (
<table className="tableStyle">
<thead>
    <tr>
        <th className="checkbox-column">
            <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
             />
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
    </tr>
</thead>
<tbody>
  {users.map((user) => (
    <tr
    key={user.id}
    className={
      selectedRowIds.includes(user.id) ? "selectedRow" : "unSelectedRow"
    }
    >
      {user.id === editRowId ? (
        <EditableRow
        key={user.id}
        user={user}
        editUserData={editUserData}
        handleEditUserChange={handleEditUserChange}
        handleEditFormSubmit={handleEditFormSubmit}
        closeEditUser={closeEditUser}
        selectedRowIds={selectedRowIds}
        selectUser={selectUser} 
        />
      ) : (
        <ReadOnlyRow
        key={user.id}
        user={user}
        deleteUser={deleteUser}
        clickEditUser={clickEditUser}
        selectUser={selectUser}
        selectedRowIds={selectedRowIds}
         />
      )}

    </tr>
  ))}
</tbody>
</table>
  );
};

export default Table