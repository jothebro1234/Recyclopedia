import './App.css';
import Navbar from './components/Navbar';
import videoBg from './assets/davideo.mp4';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
      <div className='main_page'>
        <div className='overlay'></div>
        <video src={videoBg} autoPlay loop muted />
        <div className='content fade-in'>
          Recycle Now.
          <Link to="/significance">
            <button className="btn">Start now</button>
          </Link>
        </div>
        <div className='powered-by'>
          <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer">
            powered by gemini
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
