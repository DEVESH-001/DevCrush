# Routing

- setup react-router (npm install react-router-dom) app.js

## Basic Structure

- navbar
- route => feed
- route => login
- route => connections
- route => profile
- create an outlet in body comp to render the childrens(login,profile ...)

- add cors in login.jsx, and app,js(backend)
- install redux & redux-toolkit
- create redux store (<https://redux-toolkit.js.org/tutorials/quick-start>) appStore.js, now provide this store to the application(App.jsx) wrap it in provider
- npm i react-redux + reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store

- refreshing the page should not logged out
- create a feedSlice in utils for loading feed and import is in app store

- connections, store connection in appStore/reduxStore or use stateVariables
