import * as React from 'react';
import { Link } from "react-router-dom";
import { connectContext } from "../../store";
import styles from './header.module.scss';


const Header = ({ dispatch, user }) => {
  const logoutHandler = () => {
    localStorage.removeItem('token');
  };

  return (
    <header className={styles.wrapper}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.logo}>
            <h1>Linzy kg: {user.name}</h1>
          </div>
          <div>
            <ul className={styles.menu}>
              {user.isAdmin && (
                <React.Fragment>
                  <li>
                    <Link to="/admin">Админ панель</Link>
                  </li>
                  <li>
                    <Link to="/store">База товаров</Link>
                  </li>
                  <li>
                    <Link to="/stats">Статистика</Link>
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
    </header>
  );
};

export default connectContext(Header, ({ user: { data } }) => ({
  user: data || {},
}));
