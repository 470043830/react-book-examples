import logo from './logo.svg';
import './App.css';
import { useWinSize } from "./winSize";

function App() {
  const size = useWinSize();

  return (
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
        <div className='text-111' style={{fontSize: '20px'}}>
          页面大小: {size.width}*{size.height}
        </div>
      </header>

    </div>
  );
}

export default App;
