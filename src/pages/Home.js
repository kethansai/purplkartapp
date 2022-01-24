import React from 'react';

function Home(props) {
  return <>
    Home {props.isLoggedIn ? "Yes you're logged in ": "Your session is not in active state"}
  </>;
}

export default Home;
