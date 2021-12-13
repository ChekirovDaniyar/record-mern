import * as React from 'react';
import { useHistory } from "react-router-dom";
import { connectContext } from "../../store";
import { login } from "../../store/user/actions";
import { ButtonLoader } from "../../components/loaders/buttonLoader";
import styles from './styles.module.scss';
import CloseEyeIcon from '../../assets/eyeClose.svg';


const LoginPage = ({ isLoggedIn, dispatch, loading }) => {
  const [inputData, setInputData] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const history = useHistory();

  const handleChange = ({ target: { value, name }}) => {
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    login(dispatch, inputData);
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>Страница авторизации {process.env.REACT_APP_URL}</h1>
        <form action="#" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Имя"
            onChange={handleChange}
            value={inputData.name || ''}
          />
          <div className={styles.inputWrapper}>
            <img src={CloseEyeIcon} alt="eye" onClick={() => setShowPassword(!showPassword)}/>
            <input
              className="input"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Пароль"
              onChange={handleChange}
              value={inputData.password || ''}
            />
          </div>
          <button
            disabled={!inputData.name?.trim() && !inputData.password?.trim() || loading}
            className="submitBtn"
          >
            {loading ? <ButtonLoader /> : 'Готово'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default connectContext(LoginPage, ({ user }) => ({
  isLoggedIn: user.isLoggedIn,
  loading: user.loading,
}));
