import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import Header from './components/header';
import Login from './components/login';
import Registration from './components/registration';
import AddItem from './components/item/additem';
import Homepage from './components/homepage';
import store from './store';
import ItemById from './components/item/itembyid';
import ItemsByList from './components/item/itemsbylist';

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
            <ItemById />
            <ItemsByList />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
