import './App.css'
import HomePage from "./HomePage"
import SignUp from "./SignUp"
import LogIn from './LogIn'
import ForgotPass from './ForgotPass'
import Sched from './Sched'
import Slots from './Slots'
import ThankYou from './ThankYou'
import AdminLogIn from './AdminLogIn'
import Dashboard from './Dashboard'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

// transitions for routing
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

function App() {
  return (
          <Router>
            <div className="App">
              <div className="content"> 
                <Switch>
                  <Route exact path='/' component={HomePage}/>
                  <Route path='/signup' component={SignUp}/>
                  <Route path='/login' component={LogIn}/>
                  <Route path='/forgotpass' component={ForgotPass}/>
                  <Route path='/sched' component={Sched}/>
                  <Route path='/slots' component={Slots}/>
                  <Route path='/thankyou' component={ThankYou}/>
                  <Route path='/adminlogin' component={AdminLogIn}/>
                  <Route path='/dashboard' component={Dashboard}/>
                </Switch>
              </div>
            </div>
          </Router>
  )
}

export default App
