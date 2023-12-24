import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import dataSource from './dataSource';
import './App.css';
import NavBar from './NavBar';
import OneSpell from './OneSpell';
import EditSpell from './EditSpell';
import SpellList from './SpellList';

const App = () => {
    const [spellList, setSpellList] = useState([]);
    const [selectedSpellId, setSelectedSpellId] = useState(0);
    const [searchPhrase, setSearchPhrase] = useState('');
    let refresh = false;

    // load spell list from database
    const loadSpells = async () => {
        const response = await dataSource.get('/spells');
        setSpellList(response.data);
    }

    useEffect(() => {
        loadSpells();
    }, [refresh]);

    // print loaded spell list to console
    console.log('spellList', spellList);

    // update searchPhrase with values from search bar
    const updateSearchResults = async (phrase) => {
        console.log('phrase is', phrase);
        setSearchPhrase(phrase);
    }

    // update spellList with the filtered results based on searchPhrase
    const renderedList = spellList.filter((spell) => {
        if (spell.name.toLowerCase().includes(searchPhrase.toLowerCase()) || searchPhrase === '') {
            return true;
        }
        return false;
    });

    // print filtered list to console
    console.log(renderedList);

    // update selected spell by spellId and navigate to display page with selected spell's data
    const updateSpellSelection = (id, navigate) => {
        var indexNumber = 0;
        for (var i = 0; i < spellList.length; i++) {
            if (spellList[i].spellId === id) { indexNumber = i; }
        }
        setSelectedSpellId(indexNumber);
        console.log(selectedSpellId);
        navigate('/spell/' + indexNumber);
    }

    // reloads current spellList to include new changes made through create/edit
    const onEditSpell = (navigate) => {
        loadSpells();
        alert("Spellbook has been successfully updated");
        navigate('/');
    }

    return (
        <BrowserRouter>
            <NavBar onSubmit={updateSearchResults} />
            <Routes>
                <Route exact path='/' element={
                    <SpellList spellList={renderedList} onClick={updateSpellSelection} />
                } />
                <Route exact path='/spell/:spellId' element={
                    <OneSpell spell={spellList[selectedSpellId]} onEditSpell={onEditSpell} />
                } />
                <Route exact path='/new' element={
                    <EditSpell onEditSpell={onEditSpell} />
                } />
                <Route exact path='/edit/:spellId' element={
                    <EditSpell onEditSpell={onEditSpell} spell={spellList[selectedSpellId]} />
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
