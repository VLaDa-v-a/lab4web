import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, fetchResults, checkPoint, clearResults } from '../store/actions';
import { ComboBox, TextInput, Button } from '../components/Belle';
import AreaCanvas from '../components/AreaCanvas';
import '../styles/MainPage.css';

const xOptions = ['-3', '-2', '-1', '0', '1', '2', '3', '4', '5'];
const rOptions = ['-3', '-2', '-1', '0', '1', '2', '3', '4', '5'];

const MainPage = () => {
  const [x, setX] = useState('0');
  const [y, setY] = useState('');
  const [r, setR] = useState('1');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const results = useSelector(state => state.results.items);
  const loading = useSelector(state => state.ui.loading);

  useEffect(() => {
    dispatch(fetchResults());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  const validateY = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return 'Y должен быть числом';
    if (num < -5 || num > 5) return 'Y должен быть в диапазоне [-5, 5]';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const yError = validateY(y);
    if (yError) {
      setError(yError);
      return;
    }

    if (parseFloat(r) === 0) {
      setError('R не может быть равен 0');
      return;
    }

    try {
      await dispatch(checkPoint({
        x: x,
        y: y.trim(),
        r: r
      }));
    } catch (err) {
      setError('Ошибка проверки точки');
    }
  };

  const handleCanvasClick = async (canvasX, canvasY) => {
    if (parseFloat(r) === 0) {
      setError('Выберите R ≠ 0 для клика по графику');
      return;
    }

    try {
      await dispatch(checkPoint({
        x: String(canvasX),
        y: String(canvasY),
        r: r
      }));
    } catch (err) {
      setError('Ошибка проверки точки');
    }
  };

  const handleClearResults = async () => {
    if (window.confirm('Очистить все результаты?')) {
      await dispatch(clearResults());
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU');
  };

  return (
    <div className="main-page">
      <header className="main-header">
        <div className="header-content">
          <h1>Проверка попадания точки в область</h1>
          <div className="user-info">
            <span>Пользователь: {user?.login}</span>
            <Button onClick={handleLogout}>Выход</Button>
          </div>
        </div>
      </header>

      <div className="main-container">
        <div className="left-section">
          <div className="form-card">
            <h2>Ввод координат</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label>X:</label>
                <ComboBox
                  value={x}
                  onUpdate={({ value }) => setX(value)}
                  disabled={loading}
                >
                  {xOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </ComboBox>
              </div>

              <div className="form-row">
                <label>Y (-5 ... 5):</label>
                <TextInput
                  value={y}
                  onUpdate={({ value }) => setY(value)}
                  placeholder="Введите Y"
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <label>R:</label>
                <ComboBox
                  value={r}
                  onUpdate={({ value }) => setR(value)}
                  disabled={loading}
                >
                  {rOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </ComboBox>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="button-group">
                <Button type="submit" disabled={loading} primary>
                  Проверить
                </Button>
                <Button type="button" onClick={handleClearResults} disabled={loading}>
                  Очистить
                </Button>
              </div>
            </form>
          </div>

          <div className="canvas-card">
            <h2>График области</h2>
            <AreaCanvas
              r={parseFloat(r)}
              results={results}
              onCanvasClick={handleCanvasClick}
            />
            <p className="canvas-hint">Кликните на график для проверки точки</p>
          </div>
        </div>

        <div className="right-section">
          <div className="results-card">
            <h2>История результатов</h2>
            <div className="results-table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Время</th>
                    <th>Время выполнения</th>
                  </tr>
                </thead>
                <tbody>
                  {results.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="no-results">
                        Нет результатов
                      </td>
                    </tr>
                  ) : (
                    results.map((result) => (
                      <tr key={result.id} className={result.hit ? 'hit' : 'miss'}>
                        <td title={result.x}>{result.x}</td>
                        <td title={result.y}>{result.y}</td>
                        <td title={result.r}>{result.r}</td>
                        <td>{result.hit ? '✓ Попал' : '✗ Промах'}</td>
                        <td>{formatDate(result.createdAt)}</td>
                        <td>{result.executionTime ? `${(result.executionTime / 1000).toFixed(2)} мкс` : '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

