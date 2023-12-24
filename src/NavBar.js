import React, { useState } from "react";
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    const [inputText, setInputText] = useState('');

    // update contents of search text box
    const handleChangeInput = (event) => {
        setInputText(event.target.value);
        console.log(inputText);
    }

    // submit contents of search text box to updateSearchResults function in App.js
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(inputText);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand" href="#">Spell Book</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle Navigation" >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <span className="nav-item nav-link" href="#">
                        <Link to="/">Main</Link>
                    </span>
                    <span className="nav-item nav-link" href="#">
                        <Link to="/new">Create</Link>
                    </span>
                </div>
            </div>
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={handleChangeInput} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </nav>
    );
}

export default NavBar;
