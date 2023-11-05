## Final Checkpoint checkpoint 2:

Our app currently implements a fully functional login page, as well as a signup page. The created user is then added to our database (supabase).
All routes in our web app are protected and require user authentication in order to make it to the landing page. We have also implemented the option for users to login
through Google. Our web app also features a welcoming UI that was done with bootstrap.

# Isaias Hernandez - iherna50

# Roman Moreno - rmoren21

### https://github.com/ihern/final-project-484

### Live Site :

https://strong-nasturtium-040bab.netlify.app/

## MVP:

For checkpoint 2, we plan to have our secure login page fully incorporated, which
will be achieved with Google's sign-in authentication. As well as a fully implemented
UI using bootstrap to allow for an attractive look. We also plan to have 2 roles
created, 'User' and 'Admin' that will have their own permission levels for our web
application.

## What does your application do?

We will be creating a speed dating web application with the purpose of aiding speed dating events.
This application will provide users a more personalized experience that makes them eager to find out who they matched with during speed dating events, and also encourages them to keep coming to events.
There will be two modes, an admin and a user mode.

### Admin:

- Creates new speed dating events
- View user matches and total event matches
- View feedback on event
- Send email reminders to people about event date proximity
- Ban users

### Users:

- Need to register through our website
- Fill out questionaire that gives more information their interest
- Register for speed dating events
- Check in to event at arrival
- At the event, people will scan QR code on table for our algorithm to generate interesting conversation starting questions based on the two peoples interest
- Select people they would like to go on a second date with and why
- Matches will come with ideas for second dates based on user interest

## What makes it different than a CRUD app? I.e., what functionality does it provide that is not just a user interface layer on top of a database of user information,and the ability to view / add to / change that information?

Our website will take a user's information from the sign up questionare. Using this it will generate unique questions that invoke good conversations personalized to the pair sitting at the same table during speed dating event.
The app will also generate second date ideas based on interests. These ideas will be attach to user match notifications.

## What security and privacy concerns do you expect you (as developers) or your users to have with this application?

Some security and privacy concerns that we have for our users is being able to limit the amount of information they can know about each other. Our application will heavily rely on keeping things short and private between users. So being able to
ensure that each user's data will be secured and stored is our number one priority. Another concern we have is for the admin role, though they may have special permissions, apart from regular users, the role should not have more information than
what is needed in order to fulfill the role. In other words, we want to make sure they know enough to make the speed dating process as smooth as possible, but not enough to ruin the integrity of the app's purpose.
