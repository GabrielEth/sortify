import React from 'react'
import Login from './Login';
import { Router } from 'express';
import Landingpage from './Landingpage';

const App = () => {
  return (
    <Router>
      <div>
        <div className='bg-green-400 text-white'>Sortify</div>
        <Route path="/" exact component={Login} />
        <Route path="/landingpage" component={Landingpage} />
      </div>
    </Router>
  )
}

export default App;
