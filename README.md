# Wall App

[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE.txt)

## Table of Contents

* [Description](#description)
* [Usage](#usage)
* [Testing](#testing)
* [License](#license)
* [Questions](#questions)

## Description

Wall App is an application that allows users to register, login, and post on the wall. The front-end of the app was made using React, React-Bootstrap, Framer Motion to add some transitions to page changes, and Apollo-Client to request and cache data. The back-end server was set up with Apollo-Server-Express and uses Mongoose in order to communicate with the MongoDB database. User passwords are encrypted using bcrypt and email is handled by Handlebars to generate the email HTML and Nodemailer to send over SMTP. The app also uses JSON Web Tokens to handle user authentication.

<img width="1512" alt="Wall App's Homepage" src="https://user-images.githubusercontent.com/53980378/185238856-0473bbed-ad69-4006-9e61-d48471f00e32.png">

## Usage

In the project directory, first install all the dependencies by typing `npm i` and then you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Open [http://localhost:3001/graphql](http://localhost:3001/graphql) to query the backend server in the browser.

The page will reload if you make edits on the backend or frontend.<br />
You will also see any lint errors in the console.

### `npm run seed`

This will seed data into the database to create users, posts and also make the users have friends

### Website Link

You can also checkout the live deployed site on: [Wall-App-Social](https://wall-app-social.herokuapp.com/)

### Creating an account

<img width="1512" alt="Wall App Sign Up page" src="https://user-images.githubusercontent.com/53980378/185240883-ae69b784-a3f1-49bc-b971-bd6f885b69a1.png">

You can create an account by putting in a unique username, a valid email, and a password that is longer than 5 characters.<br />
After submitting you will recieve an email from the site to confirm your email, please check your inbox or spam as you will not be able to sign in until you verify your email. The email will look like so once recieved:

<img width="905" alt="Wall App Confirmation Email" src="https://user-images.githubusercontent.com/53980378/185241495-af5b5ab8-5102-4455-857e-30cdd903d1a7.png">

After clicking the button you will be able to create your own posts for others to see and you will be able to add and remove friends

## Testing

Tests are available for the backend server, so go to the server directory with `cd server` from the project directory and then you can run:

### `npm test`

Launches the Jest test runner.<br />
Currently there is only tests verifying the database reads and writes information correctly using Mongoose. There is also tests for querying the Apollo server to see if the correct data is requested but they do not work anymore. When the tests were being produced, the excecutequery function was working and requesting the appropriate data but I've been unable to get it working again and they will fail because of a server timeout.

## License

Licensed under the [MIT License](LICENSE.txt).

## Questions

My [GitHub](https://github.com/junioresc/)  
If you have any additional questions and would like to reach me, you can at junioresc1092@gmail.com
