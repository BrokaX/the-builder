import React from "react";
import { Link } from 'react-router-dom';
import Images from "./Images";

export default function Builder() {
  return (
    <div>
      <div className="Left-menu">
       <Link to={'/Images'} ><i className="fas fa-image"></i></Link>
        <i className="fas fa-image"></i>
        <i className="fas fa-image"></i>
        <i className="fas fa-image"></i>
        <i className="fas fa-image"></i>
        <i className="fas fa-image"></i>
        <i className="fas fa-image"></i>
        <i className="fas fa-image"></i>
        <i className="fas fa-image"></i>
        <i className="fas fa-image"></i>
        <i className="fas fa-image"></i>
        <i className="fas fa-image"></i>
        <i className="fas fa-image"></i>
      </div>
     
    </div>
  );
}
