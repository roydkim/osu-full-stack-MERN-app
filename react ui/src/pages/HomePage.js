import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit, exercise }) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    const onAdd = exercise => {
        history.push("/add-exercise");
    }

    const onDelete = async  _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete the exercise with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    };

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onAdd={onAdd} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
        </>
    );
};

export default HomePage;