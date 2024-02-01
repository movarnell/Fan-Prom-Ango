import './App.css';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Components/Navigation';

function App() {
  return (
    <div className="container-fluid bg-dark">
      <Navigation />
      <Header/>
      <p>This is new to demo, DELETE ME</p>
    </div>
  );
}

export default App;
