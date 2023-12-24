import React from "react";

const SpellCard = (props) => {
    return (
        <button className="btn btn-outline-dark" onClick={() => props.onClick(props.spellId)}>
            <h5 className="card-title">{props.spellName}</h5>
            <h6><strong>Level: </strong>{props.level}<br /><strong>School: </strong>{props.school}</h6>
            <p className="short-desc">{props.description}</p>
        </button>
    );
}

export default SpellCard;
