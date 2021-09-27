import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import Header from './components/header';
import Login from './components/login';
import Registration from './components/registration';
import AddItem from './components/item/additem';
import Homepage from './components/homepage';
import ItemById from './components/item/itembyid';
import ItemsByList from './components/item/itemsbylist';
import NotImplemented from './components/notimplemented';

import store from './store';

library.add(faExclamationTriangle);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className="main-wrapper">
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
            <Route exact path="/">
              <Homepage />
              <ItemById />
              <ItemsByList />
            </Route>
            <Route>
              <NotImplemented />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
