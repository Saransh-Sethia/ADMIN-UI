import React from 'react';
import './LoadingPage.css';

function LoadingPage(props) {
    const { message } = props;
  return (
    <div className="loader">{message}</div>
  )
}

export default LoadingPage;