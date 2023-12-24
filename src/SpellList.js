import React from "react";
import SpellCard from "./SpellCard";
import { useNavigate } from "react-router-dom";

const SpellList = (props) => {   
    const navigator = useNavigate();

    // handles action of clicking on a specific spell by returning spellId to navigation function in App.js
    const handleSpellSelection = (spellId) => {
        console.log('Selected spell id: ', spellId)
        props.onClick(spellId, navigator);
    }

    const spells = props.spellList.map((spell) => {
        return (
            <SpellCard
                key={spell.spellId}
                spellId={spell.spellId}
                spellName={spell.name}
                school={spell.school}
                level={spell.level}
                description={spell.description}
                imageURL={spell.image}
                onClick={handleSpellSelection}
            />
        );
    });
    return <div className="container">{spells}</div>
}

export default SpellList;
