import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
//import RockPaperScissor from './RockPaperScissor';
//import RockPaperScissorWithHooks from './RockPaperScissorWithHooks';
//import Lotto from './Lotto'
//import LottoWithHooks from './LottoWithHooks'

//import Test from './TestWithHooks'
//import Test from './TestWithClass'

import Home from './pages/Home'
import BaseBall from './pages/BaseBall'
import Lotto from './pages/Lotto'
import User from './pages/User'
import TicTacToe from './pages/TicTacToe';

function App() {
  return (
    <Router>
      <div className="App">
         <header>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>
                <Link to={
                  {
                    pathname: '/baseball',
                    state:{
                      from:'root'
                    }
                  }                  
                }>
                BaseBall</Link></li>
              <li><Link to="/lotto">Lotto</Link></li>
              <li><Link to="/user/eunsim/kang">User</Link></li>
              <li><Link to="/tictactoe">TicTacToe</Link></li>
            </ul>
          </header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/baseBall" component={BaseBall} />
            <Route exact path="/lotto" component={Lotto}/>
            <Route exact path="/user/:firstname/:lastname" component={User}/>
            <Route exact path="/tictactoe" component={TicTacToe}/>
          </Switch>
            {/* <RockPaperScissor />    */}
            {/* <RockPaperScissorWithHooks />  */}
            {/* <Lotto /> */}
            {/* <LottoWithHooks /> */}
            {/* <Test /> */}
      </div>
    </Router>
  );
}

export default App;
