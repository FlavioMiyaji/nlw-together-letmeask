import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom';

import {
  AdminRoom,
  Home,
  NewRoom,
  Room,
} from './pages';
import { AuthContextProvider } from './contexts/AuthContext';

import './styles/global.scss';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
};
