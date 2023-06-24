import React from 'react';
import './DeleteButton.css';

function DeleteButton({deleteText, handleDeleteUsers}) {
  return (
    <div className="btn" onClick={handleDeleteUsers}>
    {deleteText}
    </div>
  )
}

export default DeleteButton;