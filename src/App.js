import './index.css';
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, PrivateRoute, PublicRoute } from './components';
import { ToastContainer } from 'react-toastify';
import { Contacts, HomePage, Register, Login } from './views';
import { routes } from './routes';
import { connect } from 'react-redux';
import { authOperations } from './redux/auth';
import { useDispatch } from 'react-redux';

export default function App() {
  const dispatch = useDispatch();

  const onGetCurrentUser = () => dispatch(authOperations.getCurrentUser());

  useEffect(() => onGetCurrentUser());

  return (
    <>
      <Container>
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <PublicRoute
            path={routes.register}
            component={Register}
            redirectTo={routes.contacts}
            restricted
          />
          <PublicRoute
            path={routes.login}
            component={Login}
            redirectTo={routes.contacts}
            restricted
          />
          <PrivateRoute
            path={routes.contacts}
            component={Contacts}
            redirectTo={routes.home}
          />
        </Switch>
        <ToastContainer />
      </Container>
    </>
  );
}
