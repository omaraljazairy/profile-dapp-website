import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Navbar, Home, Skills, Transactions, Campaigns } from "./components";

export const history = createBrowserHistory()

const App = () => {  
  return (
    <div>
      <div className="gradient-bg-Home">
        <Router history={history}>
          <Navbar />
          <Switch>
            <Route path='/home' component={Home} />
            <Route exact path='/transactions' component={Transactions} />
            <Route exact path='/campaigns' component={Campaigns} />
            {/* <Route exact path='/test' component={Test} /> */}
            <Route path="*" component={Home} />
          </Switch>
        </Router>
      </div>
  </div>
  )
}

export default App;