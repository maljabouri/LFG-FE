## LFG - Looking For Gamers

## Brief

- **Build a full stack web application**. Must be your own work.
- **Select a Project Idea of your own**.
- Have at _least_ 2 models (more if it makes sense)
  - Auth is a **requirement**
- Have full CRUD on at _least_ one of your models
- Be able to Add/Delete on any remaining models
- Have high quality code:
    - Follow accepted naming conventions
    - Consistent indentation
    - Well-structured and readable code
    - Semantic naming of variables, functions, CSS classes, etc.
    - Short and clear functions that _do one thing_
    - Efficient code - if you have your MVP, refactor
    - DRY (Don't Repeat Yourself) code
- **Use one of these technology stacks**. You may choose which tech stack.
  - Full-Stack Rails App
  - Rails API with React Front-End
  - Express API with React Front-End
- Be deployed on Heroku or similar platform
- **Craft a `README.md` file that explains your app**.

## Deployed Project Link

The deployed project can be accessed at https://github.com/maljabouri/LFG-FE

- Clone the repository to your local machine.
- Install the required dependencies by running npm install in the project directory.
- Set up a MongoDB Atlas database and create a .env file with your database credentials. 
- Start the backend server by running npm run server in the project directory.
- Start the frontend server by running npm start in the project directory.
- Access the app at http://localhost:3000/.

Note: You may need to adjust the API URL in the apiUrl.js file to match the URL of your backend server.


### User Stories

Users should be able to sign up and make an account

Users should be able to set preferences for who they can match with (tank/healer/dps/server)

Users should be able customize profile (bio/dp)

Users should be able to view other peoples ranks (m+ score/raid progress)

Users should be able to communicate with people they have matched with

Users should be able to import their information from raider.io

### Overview & Concept

The project is a social media platform where users can create an account, follow other users, and post content in various formats (text, images, videos, etc.). The main goal of the platform is to provide a space for users to share their thoughts, experiences, and creations with others who share similar interests.

### Technologies Used

The project uses the following technologies:

Frontend:
- ReactJS
- HTML/CSS

Backend:
- Node.js
- Express
- MongoDB

### Approach Taken

The project was developed using an agile methodology, with frequent iterations and feedback loops. The project was divided into several components, each with its own set of features and requirements. 

I first wrote some user stories that would guide me in developing all the features for the app,

- Users should be able to sign up and make an account
- Users should be able to set preferences for who they can match with (tank/healer/dps/server)
- Users should be able customize profile (bio/dp)
- Users should be able to view other peoples ranks (m+ score/raid progress)
- Users should be able to communicate with people they have matched with
- Users should be able to import their information from raider.io

### Initial ERD

![erd](https://i.imgur.com/ZuS7lp5.png)

### Initial Wireframe

![wireframe](https://i.imgur.com/Ieyl2Xq.png)

### Build Process 

Frontend Components: 
- Login and registration forms
- Dashboard page to display a user's groups and allow them to create new ones
- Group search page to allow users to search for groups based on various criteria
- Group detail page to display information about a specific group and allow users to join or leave the group
- Profile page to display information about a user and their groups


Backend Counterparts:
- The backend counterparts for the posts and feed components include a set of APIs for creating, reading, updating, and deleting posts.
- The APIs are implemented using Node.js and Express, with data stored in a MongoDB database.
- The APIs use authentication and authorization to ensure that only authorized users can access or modify data.

I used React as the main frontend framework. I also used React Router for handling routing within the app, and Axios for making HTTP requests to the backend API.

I started by creating the main App component, which handles the top-level routing for the app. The App component also manages the user authentication state using the token and currentUser state variables. I then created the LandingPage component, which displays a login form for the user to enter their credentials. I used React Router to handle navigating across the app

![snippet1](https://i.imgur.com/D1wI1yB.png)


Next, I created the Dashboard component, which serves as the main view for the app's dashboard page. This component allows the user to navigate between different tabs, including user search, profile, and matches. 


![snippet2](https://i.imgur.com/zwUFZ16.png)

![snippet3](https://i.imgur.com/7XJ5dwt.png)

I also created the UserSearch and Matches components, which handle searching for other users and displaying the user's matches, respectively.

To build the SearchUsers component, I created a functional component that manages state for the list of users returned from the backend API. I used the useEffect hook to make an API call to fetch the list of users when the component mounts. I then used the useState hook to manage the filtered list of users based on the user's search criteria. Finally, I used the handleLike and handleDislike functions to handle updating the user's liked and disliked lists and sending the data to the backend API.

![snippet4](https://i.imgur.com/Z8J14aq.png)

To build the Matches component, I created a functional component that manages state for the user's list of matches. I used the useEffect hook to make an API call to fetch the user's matches when the component mounts. I then used the handleUnmatch function to handle removing a user from the user's list of matches and sending the data to the backend API. I also added a button to the component to allow the user to start a conversation with a matched user.

![snippet5](https://i.imgur.com/eDrgIDk.png)

Throughout the build process, I focused on creating clean and reusable components that could be easily managed and modified as needed. I also made sure to use modern best practices for React development, such as using functional components and hooks.


### Bugs, Blockers & Wins

Some of the challenges faced during the development process included:
- Integrating the frontend with the backend API and ensuring that data was being passed correctly between the two.
- Building the tinder style match system, rendering all results one by one as the user swiped across. 
- Implementing client-side validation on the login and registration forms.


Some of the wins during the development process included:

- Building out the search functionality and allowing users to search for groups based on various criteria.
- Developing a dashboard page that displays a user's groups and allows them to create new ones.
- Being able to tackle the whole scope of the project in the time frame. It was incredibly daunting and I set my bar very high and - being able to meet that was a huge win.

### Future Features + Key Learnings

Some future features that could be added to the app include:
- Implementing real-time messaging between users in a group.
- Allowing users to rate and review groups they've joined.
- Implementing a notification system to alert users of new group activity.
- Some key learnings from the development process include:
- The importance of breaking down features into smaller components and building them incrementally.
- The benefits of using Redux for state management in larger applications.
- The challenges of integrating with a backend API and ensuring that data is being passed correctly between the frontend and backend.




