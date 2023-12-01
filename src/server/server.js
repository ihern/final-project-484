import express from 'express';
import { createClient } from '@supabase/supabase-js';
import QRCode from 'qrcode';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient('https://kuqqhdcrdwwemxnzxwow.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1cXFoZGNyZHd3ZW14bnp4d293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1NTk2NzksImV4cCI6MjAxNDEzNTY3OX0.1Fk9hPkWzRlDay0YY9bVSHtqK04VOrxVNk89NpuHjXU');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const cache = {};   // temp storage for pairs
const eventHistory = {};    // storage for previous pairs

async function getQR(eventId, paired_sessions) {
    const qrCodes = [];

    for (const pair of paired_sessions) {
        for (const userObj of pair) {
            const { user_id, token } = userObj;
            const code = await QRCode.toDataURL(`https://four84-final-project-server.onrender.com/getPair/${eventId}/${token}`);
            qrCodes.push({user: user_id, qr_code: code});
        }
    }
    return qrCodes;
}

function pairParticipants(users, event_id) {
    if (users.length % 2 !== 0) {
        console.log('Cannot pair, uneven number of participants!');
        return;
    }
    
    const previousPairs = eventHistory[event_id] || [];

    let attempts = 0;
    let max_attempts = 100;
    const pairs = [];
    const temp = [...users];

    console.log('RESET');

    do {
        
        while (temp.length > 0) {
            const randomIndex = Math.floor(Math.random() * temp.length);
            const user1 = temp.splice(randomIndex, 1)[0];
    
            const user2Index = Math.floor(Math.random() * temp.length);
            const user2 = temp.splice(user2Index, 1)[0];
    
            const token1 = uuidv4();
            const token2 = uuidv4();

            pairs.push([{ user: user1, token: token1 }, { user: user2, token: token2 }]);
            console.log('a pair here', pairs)

        }
        attempts++;
    } while (!areDiff(pairs, previousPairs) && attempts < max_attempts);

    console.log('amount of attempts', attempts);

    if(attempts === max_attempts) {
        console.log('Cannot pair, too many attempts!');
        return;
    }

    if(!eventHistory[event_id]) {
        eventHistory[event_id] = [];
    }

    eventHistory[event_id].push(pairs);
    cache[event_id] = pairs;

    return pairs;
}

const getUsers = async (event_id) => { 
    const { data, error } = await supabase
        .from('event_participants')
        .select('user_id, user_sex')
        .eq('event_id', event_id);
    if (error) {
        console.error('Error fetching users:', error.message);
        return error.message;
    } else {
        return data;
    }
};


app.get('/getPair/:eventId/:token', async (req, res) => {
    const eventId = req.params.eventId;
    const token = req.params.token;

    // check if token is valid
    if (!cache[eventId]) {
        res.status(400).send('Invalid session');
    } else {
        const pairs = cache[eventId];
        const findToken = pairs.find(pair => pair.some(userObj => userObj.token === token));
        if (!findToken) {
            res.status(400).send('Invalid token');
        } else {
            const user = findToken.find(userObj => userObj.token === token);
            res.redirect(`https://super-flan-07f2d0.netlify.app/client/profile/${user.user}`);
        }
    }
});

app.get('/startingEvent/:eventId', async (req, res) => {
    // obtain event id from request
    const eventId = req.params.eventId;

    //begin pairing process
    const data = await getUsers(eventId);
    console.log('this is the data', data)
    const males = [];
    const females = [];
    for (const user of data) {
        const { user_id, user_sex } = user;
        if(user_sex === 'male') {
            males.push(user_id);
        } else {
            females.push(user_id);
        }
    }

    if(males.length !== females.length) {
        res.status(400).send({ message: 'Cannot pair, uneven number of participants!' });
    }

    const pairs = [];
    for(const x of males) {
        for(const y of females) {
            if(x !== y) {
                pairs.push([x, y]);
            }
        }
    }

    const paired_sessions = pairs.map(innerArray =>
        innerArray.map(value => { 
            const user_id = value;
            const token = uuidv4();
            return { user_id, token };
        })
    );


    console.log('arrays w genders:', males, females);
    console.log('pairs:', pairs);
    console.log('user_token:', paired_sessions);

    const qrCodes = await getQR(eventId, paired_sessions);
    
    return res.status(200).send(qrCodes);
    // const pairs = pairParticipants(data, eventId);
    // if(!pairs) {
    //     console.log('something happened here');
    //     res.status(400).send({ message: 'Cannot pair, uneven number of participants!' });
    // } else {
    //     console.log('Users paired successfully!', pairs);
    //     try {
    //         // generate qr codes
    //         const qrCodes = await getQR(eventId);
    //         console.log('QR codes created successfully!');
    
    //         // send qr code to frontend
    //         res.status(200).send(qrCodes);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send({ message: 'Error generating QR codes for users, please try again' });
    //     }
    // }    
});

app.get('/', async (req, res) => {
    res.send('Hello World!');
    console.log('someone hit the server');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
