import * as React from 'react';
import cs from "classnames";
import { NavLink, useHistory } from "react-router-dom";
import { connectContext } from "../../store";
import styles from './header.module.scss';


const Header = ({ user }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem('token');
  };

  const hamburgerClassname = React.useCallback(() => cs({
    [styles.hamburger]: true,
    [styles.activeHamburger]: showMenu,
  }), [showMenu]);

  const menuClassnames = React.useCallback(() => cs({
    [styles.menu]: true,
    [styles.activeMenu]: showMenu,
  }), [showMenu]);

  return (
    <header className={styles.wrapper}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.logo}>
            <h1 onClick={() => history.push('/')}>Silverica: {user.name}</h1>
          </div>
          <div>
            <ul className={menuClassnames()}>
              {user.isAdmin && (
                <React.Fragment>
                  <li>
                    <NavLink to="/admin" activeClassName={styles.activeLink}>Админ панель</NavLink>
                  </li>
                  <li>
                    <NavLink to="/store" activeClassName={styles.activeLink}>База товаров</NavLink>
                  </li>
                </React.Fragment>
              )}
              <li onClick={logoutHandler}>
                <span>Выйти</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {user.isAdmin && (
        <div className={hamburgerClassname()} onClick={() => setShowMenu(!showMenu)}>
          <span />
          <span />
          <span />
        </div>
      )}
    </header>
  );
};

export default connectContext(Header, ({ user: { data } }) => ({
  user: data || {},
}));
