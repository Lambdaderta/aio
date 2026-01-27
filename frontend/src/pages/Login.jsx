import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/courses'); // Переход после успешного входа
    } catch (err) {
      // Обработка ошибок от FastAPI
      if (err.response?.status === 401) {
        setError('Неверный email или пароль');
      } else {
        setError('Ошибка сервера. Попробуйте позже.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="text-center mb-8">
        <div className="inline-block p-3 rounded-2xl mb-4 bg-indigo-500/10">
          <LogIn className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">С возвращением</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="student@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Войти
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <span className="text-gray-400">Нет аккаунта? </span>
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Создать
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;