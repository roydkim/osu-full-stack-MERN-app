import exercises from './exercise_model.js';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed'});
        });
});

app.get('/exercises/:_id',  (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if(exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found '});
            }
        })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });
});

app.get('/exercises', (req, res) => {
    let filter = {};
    if(req.query._id !== undefined){
        filter.push({_id: req.query._id})
    }
    if(req.query.name !== undefined){
        filter.push({name: req.query.name})
    }
    if(req.query.reps !== undefined){
        filter.push({reps: req.query.reps})
    }
    if(req.query.weight !== undefined){
        filter.push({weight: req.query.weight})
    }
    if(req.query.unit !== undefined){
        filter.push({unit: req.query.unit})
    }
    if(req.query.date !== undefined){
        filter.push({date: req.query.date})
    }
    exercises.findExercise(filter, '', 0)
        .then(exercises => {
            res.json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.params.name, req.params.reps, req.params.weight, req.params.unit, req.params.date)
        .then(numUpdated => {
            if(numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.params.name, reps: req.params.reps, weight: req.params.weight, unit: req.params.unit, date: req.params.date});
                res.status(200);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExercise(req.params._id)
        .then(deletedCount => {
            if(deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});