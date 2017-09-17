import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Directions from './components/map/directions'
import reducer from './reducers'

const store = createStore(reducer)

class Map extends Component {    
  render () {
    return (          
    <Provider store={store}>
         <Router>
             <Switch>
                <Route exact path="/" component={App}/>    
                <Route path="/directions" component={Directions}/>
            </Switch>
        </Router>
    </Provider>
    )
  }
}


ReactDOM.render(<Map />, document.getElementById('root'));
registerServiceWorker();
