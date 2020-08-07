import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import Todos from "../Todos";
import Login from "../Login";
import { FirebaseContext } from "../Firebase";
import UserContext from "../User";

const App = () => {
  const [state, setState] = useState({
    isLoggedIn: false,
    user: null,
  });
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(`user= ${JSON.stringify(user)}`);
        setState({ isLoggedIn: true, user });
      } else {
        setState({ isLoggedIn: false, user: undefined });
      }
    });
  }, []);

  const Logout = () => {
    firebase.auth().signOut();
    setState({ isLoggedIn: false, user: null });
  };

  if (state.isLoggedIn) {
    return (
      <div className="App">
        <div className="container">
          <button onClick={Logout} className="signOut">
            Sign Out
          </button>
          <UserContext.Provider value={state.user}>
            <Todos user={state.user} />
          </UserContext.Provider>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <div className="container">
        <Login />
      </div>
    </div>
  );
};

export default App;
