const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const exerciseController = require('./controllers/ExerciseController'); 
const userController = require('./controllers/UserController');
const bodyParser = require('body-parser');
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/api/users', async(req, res)=> {
  try {
    console.log(req.body);
    const { username } = req.body;
    const user = await userController.createUser(username);
    res.json({username:user.username, _id:user._id});
} catch (err) {
    res.status(500).json({ error: err.message });
}
})

app.post('/api/users/:_id/exercises', async(req, res)=> {
  try {
    console.log(req.body);
    const user = await userController.getUserById(req.params._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' }); 
    }
    const { description, duration, date } = req.body;
    const exercise = await exerciseController.createExercise(user.username, description, duration, date);
    res.json({
      username: user.username,
      _id: user._id,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString()
    });
} catch (err) {
    res.status(500).json({ error: err.message });
}
})

/*
app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await userController.getUserById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const exercises = await exerciseController.getExercisesByUsername(user.username);
    res.json({
      username: user.username,
      _id: user._id,
      count: exercises.length,
      log: exercises.map(ex => ({
        description: ex.description,
        duration: ex.duration,
        date: ex.date.toDateString()
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
*/

app.get('/api/users', async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    res.json(users.map(user => ({ username: user.username, _id: user._id })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    console.log("param: "+ req.params);
    console.log("query: "+ req.query);
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    const user = await userController.getUserById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let query = { username: user.username };

    if (from || to) {
      query.date = {};
      if (from) {
        query.date.$gte = new Date(from);
      }
      if (to) {
        query.date.$lte = new Date(to);
      }
    }

    let exercises = await exerciseController.getExercisesByQuery(query);

    if (limit) {
      exercises = exercises.slice(0, parseInt(limit));
    }    
    res.json({
      username: user.username,
      _id: user._id,
      count: exercises.length,
      log: exercises.map(ex => ({
        description: ex.description,
        duration: ex.duration,
        date: ex.date.toDateString()
      }))
    });
} catch (err) {
    res.status(500).json({ error: err.message });
}
})

app.get('/api/users', async(req, res)=> {
  try {
    const users = await userController.getAllUsers();
    res.json(users.map(user=>({username:user.username, _id:user._id})));
} catch (err) {
    res.status(500).json({ error: err.message });
}
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
