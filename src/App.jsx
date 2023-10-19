import { useState } from 'react'
import './App.css'
import PreLoginPage from "./components/PreLoginPage";
import PostLoginPage from "./components/PostLoginPage";

function App() {

  const [isLogged, SetIsLogged] = useState(false);

  function toAppPage(logged){
    SetIsLogged(logged);
    console.log("Usuario loggeado: " + logged);
  }

  return (
    <div>
      {isLogged ? <PostLoginPage logged={isLogged}/> : <PreLoginPage logged={isLogged} toAppPage={toAppPage}/>}
    </div>
  );
}

export default App;
