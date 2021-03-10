import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from './components/Container/Container';
import './index.css';
import { ToastContainer } from 'react-toastify';
import Contacts from './views/Contacts/Contacts';
import { routes } from './routes';
import HomePage from './views/HomePage/HomePage';
import Register from './views/Register/Register';
import LogIn from './views/Login/Login';
import { connect } from 'react-redux';
import { authOperations } from './redux/auth';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }
  render() {
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
              component={LogIn}
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
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
