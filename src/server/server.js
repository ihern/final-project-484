import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import QRCode from 'qrcode';
import cors from 'cors';

// database configuration
const supabase = createClient('https://kuqqhdcrdwwemxnzxwow.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1cXFoZGNyZHd3ZW14bnp4d293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1NTk2NzksImV4cCI6MjAxNDEzNTY3OX0.1Fk9hPkWzRlDay0YY9bVSHtqK04VOrxVNk89NpuHjXU');

// create express app
const app = express();

// allow cors
app.use(cors());

// port for server
const PORT = process.env.PORT || 3000;

// clear cache after certain time (4 hours)
const clearCacheInterval = 4 * 60 * 60 * 1000;
setInterval(clearCache, clearCacheInterval);

// temp storage for event history
let cache = {};  

function clearCache() {
    console.log('Clearing cache...');
    cache = {};
}

async function getQR(eventId, paired_sessions) {
    // create qr codes for each user to scan to meet their match
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

const getUsers = async (event_id) => { 
    // gets users from database (user_id, sex)
    try {
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
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
};

function matchUserGender(data) {
    // match user to corresponding gender
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
        return [[],[]];
    }

    return [males, females];
}

function createPairs(males, females) {
    // match every gender to another, ensuring to meet once only
    const pairs = [];
    for(const x of males) {
        for(const y of females) {
            if(x !== y) {
                pairs.push([x, y]);
            }
        }
    }
    // each pair will have a unique session token
    const paired_sessions = pairs.map(innerArray =>
        innerArray.map(value => { 
            const user_id = value;
            const token = uuidv4();
            return { user_id, token };
        })
    );
    return paired_sessions;
}

app.get('/getPair/:eventId/:token', async (req, res) => {
    const eventId = req.params.eventId;
    const session_token = req.params.token;
    let found = false;

    // check if token is valid
    if (!cache[eventId]) {
        res.status(400).send('Invalid event id provided');
    } else {    
        // begin search for token in cache
        const pairs = cache[eventId];
        // search for pair containing token
        for (const pair of pairs) {
            for (const object of pair) {
                const { user_id, token } = object;
                if (token === session_token) {  
                    found = true;
                    // found pair (valid session token), redirect to profile
                    res.redirect(`https://super-flan-07f2d0.netlify.app/client/profile/${user_id}`);
                }
            }
        }
        // if token not found, send error
        if(!found) {
            res.status(400).send('Invalid session token provided');
        }
    }
});

app.get('/startingEvent/:eventId', async (req, res) => {
    // obtain event id from request
    const eventId = req.params.eventId;

    // check if event id is valid
    if (!eventId) {
        res.status(400).send({ message: 'No event id provided' });
    }

    // check if event has already started
    if (cache[eventId]) {
        res.status(400).send({ message: 'Event already started' });
    }

    //begin pairing process
    const data = await getUsers(eventId);
    
    // match users with corresponding genders
    const [males, females] = matchUserGender(data);
    
    if(!males || !females) {
        res.status(400).send({ message: 'Cannot pair, uneven number of participants!' });
    }

    // create pairs
    const paired_sessions = createPairs(males, females);

    // create qr codes
    const qrCodes = await getQR(eventId, paired_sessions);

    // store event matching and qr codes in cache
    cache[eventId] = paired_sessions;
    
    return res.status(200).send(qrCodes);    
});

app.get('/', async (req, res) => {
    res.send('Hello World!');
    console.log('someone hit the server');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});