import React from 'react';

import './EditableRow.css';
import { FaWindowClose } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

const EditableRow = ({
  user, 
  editUserData, 
  handleEditUserChange, 
  handleEditFormSubmit, 
  closeEditUser, 
  selectedRowIds, 
  selectUser
}) =>  {

  const index = selectedRowIds.findIndex((id) => id === user.id);
  const Checked = index === -1 ? false : true;

  return (
    <>
    <td>
      <input 
      type="checkbox"
      onChange={() => selectUser(user)}
      checked={Checked}
      />
    </td>

    <td>
      <input
      type="text"
      required="required"
      placeholder="Edit Name"
      name="name"
      value={editUserData.name}
      onChange={handleEditUserChange}
      >
      </input>
    </td>

    <td>
    <input
      type="email"
      required="required"
      placeholder="Edit Email"
      name="email"
      value={editUserData.email}
      onChange={handleEditUserChange}
      >
      </input>
    </td>

    <td>
    <input
      type="text"
      required="required"
      placeholder="Edit Role"
      name="role"
      value={editUserData.role}
      onChange={handleEditUserChange}
      >
      </input>
    </td>

    <td>
      <FaCheck className="submitButton" onClick={handleEditFormSubmit}/>
      <FaWindowClose className="cancelButton" onClick={closeEditUser}/>
    </td>
    </>
  )
}

export default EditableRow