import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import Header from './components/header';
import Login from './components/login';
import Registration from './components/registration';
import AddItem from './components/additem/AddItem';
import Homepage from './components/homepage/Homepage';
import store from './store';

library.add(faExclamationTriangle);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/item">
            <AddItem />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
