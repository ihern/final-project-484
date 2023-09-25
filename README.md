# Isaias Hernandez - iherna50

# Roman Moreno - rmoren21

# https://github.com/ihern/final-project-484

If you have a private repository, please add `kaytwo` and `sauravjoshi` as collaborators.

## ExcaliDraw 
https://excalidraw.com/#json=8PE0U9KuKveDcR-_TCkfI,y0evdrK57JE8g_eJkwchBA 
## Disclaimer : 
We tried deploying our website on render and netlify but they just would stop deploying after succesfull builds. 
When we run npm run dev our local app does work. We tried deploying using start command: ```npm run build```

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
- Will see matches 24 hrs after speed dating event on their dashboard
- Matches will come with ideas for second dates based on user interest

## What makes it different than a CRUD app? I.e., what functionality does it provide that is not just a user interface layer on top of a database of user information,and the ability to view / add to / change that information?

Our website will take a user's information from the sign up questionare. Using this it will generate unique questions that invoke good conversations personalized to the pair sitting at the same table during speed dating event.
The app will also generate second date ideas based on interests. These ideas will be attach to user match notifications.

## What security and privacy concerns do you expect you (as developers) or your users to have with this application?

Some security and privacy concerns that we have for our users is being able to limit the amount of information they can know about each other. Our application will heavily rely on keeping things short and private between users. So being able to
ensure that each user's data will be secured and stored is our number one priority. Another concern we have is for the admin role, though they may have special permissions, apart from regular users, the role should not have more information than
what is needed in order to fulfill the role. In other words, we want to make sure they know enough to make the speed dating process as smooth as possible, but not enough to ruin the integrity of the app's purpose.

### This repository

This repository has a package.json that functions as a blank shell that gets full credit if you turn it in to the gradescope autograder. We will not be using the autograder in any way to actually evaluate your project, it is just there to keep track of your initial submission.

We recommend that you use this repository for your final project code. This will allow you to ask questions on Piazza and get help from the TAs and instructors. Adding a real linter, type checker, etc, based on our other examples would be a good idea.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
