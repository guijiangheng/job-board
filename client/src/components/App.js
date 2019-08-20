import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { isLoggedIn, logout } from '../utils/auth';
import NavBar from './NavBar';
import LoginForm from './LoginForm';
import JobBoard from './JobBoard';
import JobForm from './JobForm';
import JobDetail from './JobDetail';
import CompanyDetail from './CompanyDetail';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: isLoggedIn()
    };
  }

  handleLoginIn() {
    this.setState({ isLoggedIn: true });
    this.router.history.push('/')
  }

  handleLogout() {
    logout();
    this.setState({ isLoggedIn: false });
    this.router.history.push('/');
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <BrowserRouter ref={(router) => this.router = router}>
        <div>
          <NavBar isLoggedIn={isLoggedIn} onLogout={this.handleLogout.bind(this)} />
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/" component={JobBoard} />
                <Route exact path="/login" render={() => <LoginForm onLogin={this.handleLoginIn.bind(this)} />} />
                <Route exact path="/jobs/new" component={JobForm} />
                <Route path="/jobs/:jobId" component={JobDetail} />
                <Route path="/companies/:companyId" component={CompanyDetail} />
              </Switch>
            </div>
          </section>
        </div>
      </BrowserRouter>
    );
  }
}
