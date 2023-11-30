// import express from 'express';
// import { supabase } from '../services/supabase';

// const app = express();
// const PORT = 3000;

// // function pairParticipants(users) {
// //     if (users.length % 2 !== 0) {
// //         console.log('Cannot pair');
// //         return;
// //     }
    
// //     const pairs = [];
// //     const temp = [...users];

// //     while (temp.length > 0) {
// //         const randomIndex = Math.floor(Math.random() * temp.length);
// //         const user1 = temp.splice(randomIndex, 1)[0];

// //         const user2Index = Math.floor(Math.random() * temp.length);
// //         const user2 = temp.splice(user2Index, 1)[0];

// //         pairs.push([user1, user2]);
// //     }
// //     return pairs;
// // }

// const getUsers = async () => { 
//     // implement logic to fetch users from database
//     const { data, error } = await supabase
//         .from('event_participants')
//         .select('user_id');

//     if (error) {
//         console.log(error);
//         return;
//     } else {
//         console.log('this is the data', data);
//     }
// };

// // const pairedUsers = pairParticipants(getUsers());

// // app.get('/startEvent/:eventId', async (req, res) => {

// // });

// // app.get('/redirect/:userId', async (req, res) => {

// // });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
//   console.log(getUsers());
// });

import express from 'express';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://kuqqhdcrdwwemxnzxwow.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1cXFoZGNyZHd3ZW14bnp4d293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1NTk2NzksImV4cCI6MjAxNDEzNTY3OX0.1Fk9hPkWzRlDay0YY9bVSHtqK04VOrxVNk89NpuHjXU');

const app = express();
const PORT = 3000;

const getUsers = async (event_id) => { 
    const { data, error } = await supabase
        .from('event_participants')
        .select('user_id')
        .eq('event_id', event_id);
    if (error) {
        console.error('Error fetching users:', error.message);
        return error.message;
    } else {
        const users = data.map((obj) => obj.user_id);
        console.log('these are the users', users);
        return users;
    }
};

app.get('/startEvent/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    const data = await getUsers(eventId);
    res.send(`here are the users, ${data}`);
});

app.get('/', async (req, res) => {
    res.send('Hello World!');
    console.log('someone hit the server');
});

// app.get('/redirect/:userId', async (req, res) => {
//     const userId = req.params.userId;

//     // implement logic to redirect based on userId

//     res.send(`Redirecting to user with ID ${userId}`);
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

