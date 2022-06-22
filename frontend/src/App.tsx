import { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';

import NavigateTo from './routes/NavigateTo';

export default function App() {
  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Header />
          <NavigateTo />
        </div>
      </Router>
    </Fragment>
  );
}
