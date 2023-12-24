import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import dataSource from "./dataSource";

const OneSpell = (props) => {
    const navigate = useNavigate();

    // prompts the user with a confirmation alert. If cancelled function closes
    // if the user accepts, a call to the datasource is made to delete the selected spell
    // the user is the given a confirmation message and returned to a reloaded spellList
    const handleSpellDelete = async (event) => {
        event.preventDefault();
        let response;
        if (window.confirm("Are you sure you want to delete this spell?")) {
            response = await dataSource.delete('/spells/' + parseInt(props.spell.spellId));
            console.log('spell deleted', props.spell.spellId);
            props.onEditSpell(navigate);
        }
    }

    return (
        <div className="container">
            <div className="card">
                <img className="card-img-top" src={props.spell.image} alt={props.spell.school} />
                <div className="card-body">
                    <h5 className="card-title">{props.spell.name}</h5>
                    <p className="card-text">{props.spell.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Level: </strong>{props.spell.level}</li>
                    <li className="list-group-item"><strong>School: </strong>{props.spell.school}</li>
                    <li className="list-group-item"><strong>Cast Time: </strong>{props.spell.castTime}</li>
                    <li className="list-group-item"><strong>Range: </strong>{props.spell.spellRange}</li>
                    <li className="list-group-item"><strong>Duration: </strong>{props.spell.duration}</li>
                    <li className="list-group-item"><strong>Classes: </strong>{props.spell.classes}</li>
                    <li className="list-group-item"><strong>Source: </strong>{props.spell.source}</li>
                </ul>
                <div className="card-body">
                    <button className="btn btn-secondary"><Link to="/">Return</Link></button>
                    <button className="btn btn-secondary"><Link to="/edit/:spellId">Edit</Link></button>
                    <button className="btn btn-outline-danger" onClick={handleSpellDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default OneSpell;
