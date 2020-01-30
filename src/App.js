import React, { useState } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Users from "./Users";
import NotFound from "./NotFound";
import Profile from './Profile'
import AuthRoute from './AuthRoute'
import LoginForm from './LoginForm'
import LogoutButton from './LogoutButton'
import {signIn} from './Auth'


function App() {

  const [user, setUser] = useState(null)
  const authenticated = user != null

  const login = ({email, password}) => setUser(signIn({email, password}))
  const logout = () => setUser(null)
  //인증이 불필요한 컴포넌트 Home, About, NotFound
  return (
    <Router>
      <header>
        <Link to="/"> {/*html의 a태그와 비슷 */}
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/users">
          <button>Users</button>
        </Link>
        <Link to='/profile'>
          <button>Profile</button>
        </Link>
        {authenticated ? (
          <LogoutButton logout = {logout} />
        ) : (<Link to ="/login">
          <button>Login</button>
        </Link>)}
      </header>
      <hr />
      <main>
        <Switch>
          {/*Switch : 하위 Route 컴포넌트 중에 매치되는 첫 번째 컴포넌트만 보여줌
          나머지는 무시 */}
          <Route exact path = "/" component = {Home} />
          {/*exact path : 값이 완전히 일치해야 매치됨 */}
          <Route path = "/about" component = {About} />
          <Route path = "/users" component = {Users} />
          <AuthRoute path = "/profile" authenticated = {authenticated}
            render = {props => <Profile user = {user} {...props} />}
          />
          <Route 
            path = "/login"
            render = {props => (
              <LoginForm authenticated = {authenticated} login = {login} {...props} />
            )}
          />
          <Route component = {NotFound} />
          {/*Route 컴포넌트는 match, location, history 3개의 propr을 넘겨줌
          match.url은 Link 컴포넌트, match.path는 Route 컴포넌트를 위해 사용
          match.url은 실제 매칭된 URL 문자열(/articles/1
          match.path는 매칭에 사용된 경로의 패턴(/articles/:id)
          */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
