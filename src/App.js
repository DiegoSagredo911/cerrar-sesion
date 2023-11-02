import logo from './logo.svg';
import './App.css';
import InactivityPopup from './InactivityPopup';

function App() {

  const uncionClose = () => {
    //funcion que se ejecutara para cerra sesion
  }
  return (
    <>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          >
          Learn React
        </a>
      </header>
    </div>
    {
       
      //timerInactivity variable numerica por defecto esta en 5 que detectaria 5 minutos de inactividad
      
      //funcionClose crear una funcion anonima en el padre ejemplo:

      //const funcionClose = () => {
        //funcion que se ejecutara para cerra sesion
      //}
      
      
    }
          <InactivityPopup 
          timerInactivity={5}
          funcionClose
          />
    </>
  );
}

export default App;
