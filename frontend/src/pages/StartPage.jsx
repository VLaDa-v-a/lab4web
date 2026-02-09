import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../store/actions';
import { TextInput, Button } from '../components/Belle';
import '../styles/StartPage.css';

const StartPage = () => {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(state => state.ui.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!loginValue.trim() || !password.trim()) {
      setError('Логин и пароль обязательны');
      return;
    }
    
    try {
      if (isRegister) {
        await dispatch(register({ login: loginValue, password }));
      } else {
        await dispatch(login({ login: loginValue, password }));
      }
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка авторизации');
    }
  };

  return (
    <div className="start-page">
      <div className="start-container">
        <header className="header">
          <h1>Лабораторная работа #4</h1>
          <div className="student-info">
            <p>ФИО: Авдеев Владислав Александрович</p>
            <p>Группа: P3214</p>
            <p>Вариант: 3947</p>
          </div>
        </header>

        <div className="login-card">
          <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Логин:</label>
              <TextInput
                value={loginValue}
                onUpdate={({ value }) => setLoginValue(value)}
                placeholder="Введите логин"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Пароль:</label>
              <TextInput
                value={password}
                onUpdate={({ value }) => setPassword(value)}
                placeholder="Введите пароль"
                type="password"
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="button-group">
              <Button 
                type="submit" 
                disabled={loading}
                primary
              >
                {loading ? 'Загрузка...' : (isRegister ? 'Зарегистрироваться' : 'Войти')}
              </Button>
            </div>

            <div className="toggle-mode">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError('');
                }}
                className="link-button"
              >
                {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartPage;

