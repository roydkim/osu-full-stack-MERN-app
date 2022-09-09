import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import AddExercisePage from './pages/AddExercisePage';
import { useState } from 'react';
import {MdAdd, MdHome} from 'react-icons/md';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <div className="navbar">
        <a href="/" className="homeButton"><MdHome /></a>
        <a href="/add-exercise" className="addButton"><MdAdd /></a>
      </div>
      <header>
        <h1>Exercise Tracker</h1>
        <p>This app keeps track of your completed exercises for your workout plan</p>
      </header>
      <main>
        <Router>
          <div className="App-header">
            <Route path="/" exact>
              <HomePage setExerciseToEdit={setExerciseToEdit} />
            </Route>
            <Route path="/edit-exercise">
              <EditExercisePage exerciseToEdit={exerciseToEdit} />
            </Route>
            <Route path="/add-exercise">
              <AddExercisePage />
            </Route>
          </div>
        </Router>
      </main>
      <footer>© 2022 Roy Kim</footer>

    </div>
  );
}

export default App;