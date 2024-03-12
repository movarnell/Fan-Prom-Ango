import "./App.css";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./Pages/Checkout";
import { Container } from "react-bootstrap";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import Theaters from "./Pages/Theaters";
import Showtimes from "./Pages/Showtimes";
import Seat from "./Pages/Seat";
import DevTools from "./Pages/DevTools";
import PurchaseSuccess from "./Pages/PurchaseSuccess";
import ContextWrapper from "./Components/ContextWrapper";
function App() {
  


  
  

return (
  <ContextWrapper>
<Router>

  <Container fluid className="bg-dark min-vh-100">
  
    
      <Navigation/>
      <Header />
      <div className='container'>
        
       
          <Switch>
            <Route exact path='/' render={() => <Home/>} />
            <Route path='/devtools' render={() => <DevTools/>} />
            <Route path='/checkout/:movieID/:theaterID/:showtimeID' render={() => <Checkout/>} />
            <Route path='/seat/:movieID/:theaterID/:showtimeID' render={() => <Seat/>} />
            <Route path='/movies/:theaterID' render={() => <Movies/>} />
            <Route path='/theaters/:movieID' render={() => <Theaters/>} />
            <Route path='/showtimes/:movieID/:theaterID' render={() => <Showtimes/>} />
            <Route path='/success' render={() => <PurchaseSuccess/>} />
          </Switch>
       
          
          
      </div>
    
      <Footer/>
    </Container>
    </Router> 
    </ContextWrapper>
  );
}

export default App;
