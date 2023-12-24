import React, { useState } from "react";
import dataSource from "./dataSource";
import { useNavigate } from "react-router-dom";

const EditSpell = (props) => {
    // assume user is creating a new spell and set default values to empty
    let spell = {
        name: '',
        level: '',
        school: '',
        castTime: '',
        spellRange: '',
        duration: '',
        classes: '',
        source: '',
        image: '',
        description: '',
    };
    let createNewSpell = true;

    // check to see if a spell was provided to be edited, if so update blank spell to selected spell
    if (props.spell) {
        spell = props.spell;
        createNewSpell = false;
    }

    // set default useStates for all spell properties
    // defaults are based on the current properties of the spell (blank for new and pre-filled for edit)
    const [spellName, setSpellName] = useState(spell.name);
    const [level, setLevel] = useState(spell.level);
    const [school, setSchool] = useState(spell.school);
    const [castTime, setCastTime] = useState(spell.castTime);
    const [spellRange, setSpellRange] = useState(spell.spellRange);
    const [duration, setDuration] = useState(spell.duration);
    const [classes, setClasses] = useState(spell.classes);
    const [sourceBook, setSourceBook] = useState(spell.source);
    const [spellImage, setSpellImage] = useState(spell.image);
    const [description, setDescription] = useState(spell.description);
    const navigate = useNavigate();

    // updates for each spell property based on contents of respective text boxes
    function updateName(event) {
        setSpellName(event.target.value);
    }
    function updateLevel(event) {
        setLevel(event.target.value);
    }
    function updateSchool(event) {
        setSchool(event.target.value);
    }
    function updateCastTime(event) {
        setCastTime(event.target.value);
    }
    function updateSpellRange(event) {
        setSpellRange(event.target.value);
    }
    function updateDuration(event) {
        setDuration(event.target.value);
    }
    function updateClasses(event) {
        setClasses(event.target.value);
    }
    function updateSourceBook(event) {
        setSourceBook(event.target.value);
    }
    function updateSpellImage(event) {
        setSpellImage(event.target.value);
    }
    function updateDescription(event) {
        setDescription(event.target.value);
    }

    // on form submission submit all input values from textboxes to respective properties of the "editedSpell" then save
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('submit');
        const editedSpell = {
            spellId: spell.spellId,
            name: spellName,
            level: level,
            school: school,
            castTime: castTime,
            spellRange: spellRange,
            duration: duration,
            classes: classes,
            source: sourceBook,
            image: spellImage,
            description: description,
        };
        console.log(editedSpell);
        saveSpell(editedSpell);
    }

    // cancel form and return to homepage
    const handleCancel = () => {
        navigate('/');
    }

    // submits editedSpell object to database with post if creating a new spell or put if editing an existing spell
    const saveSpell = async (spell) => {
        let response;
        if (createNewSpell) {
            response = await dataSource.post('/spells', spell);
        } else {
            response = await dataSource.put('/spells', spell);
        }
        console.log(response);
        console.log(response.data);
        props.onEditSpell(navigate);
    }

    return (
        <div className="form-container">
            <form onSubmit={handleFormSubmit}>
                <h2>{createNewSpell ? "Create New" : "Edit"} Spell</h2>
                <div className="form-group">
                    <label htmlFor="spellName">Spell Name</label>
                    <input type="text" className="form-control" id="spellName" placeholder="Enter the spell's name" defaultValue={spell.name} onChange={updateName}/>
                    <label htmlFor="level">Level</label>
                    <input type="text" className="form-control" id="level" placeholder="Enter the spell's level" defaultValue={spell.level} onChange={updateLevel}/>
                    <label htmlFor="school">School</label>
                    <input type="text" className="form-control" id="school" placeholder="Enter the spell's school" defaultValue={spell.school} onChange={updateSchool}/>
                    <label htmlFor="castTime">Cast Time</label>
                    <input type="text" className="form-control" id="castTime" placeholder="Enter the spell's cast time" defaultValue={spell.castTime} onChange={updateCastTime}/>
                    <label htmlFor="spellRange">Range</label>
                    <input type="text" className="form-control" id="spellRange" placeholder="Enter the spell's range" defaultValue={spell.spellRange} onChange={updateSpellRange}/>
                    <label htmlFor="duration">Duration</label>
                    <input type="text" className="form-control" id="duration" placeholder="Enter the spell's duration" defaultValue={spell.duration} onChange={updateDuration}/>
                    <label htmlFor="classes">Classes</label>
                    <input type="text" className="form-control" id="classes" placeholder="Enter the classes that can learn the spell" defaultValue={spell.classes} onChange={updateClasses}/>
                    <label htmlFor="sourceBook">Source</label>
                    <input type="text" className="form-control" id="sourceBook" placeholder="Enter the spell's source book" defaultValue={spell.source} onChange={updateSourceBook}/>
                    <label htmlFor="spellImage">Image</label>
                    <input type="text" className="form-control" id="spellImage" placeholder="Enter the image URL of the spell's school" defaultValue={spell.image} onChange={updateSpellImage}/>
                    <label htmlFor="description">Description</label>
                    <textarea type="text" className="form-control" id="description" placeholder="Enter the spell's description" defaultValue={spell.description} onChange={updateDescription}/>
                </div>
                <div align="center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditSpell;
