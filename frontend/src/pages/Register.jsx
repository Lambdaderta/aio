import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Имя пока просто сохраняем в контексте (не на беке), email/pass идут на бек
      await register(name, email, password);
      navigate('/courses');
    } catch (err) {
      if (err.response?.status === 400) {
        setError('Пользователь с таким email уже существует');
      } else {
        setError('Ошибка при регистрации. Проверьте данные.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="text-center mb-8">
        <div className="inline-block p-3 rounded-2xl mb-4 bg-indigo-500/10">
          <UserPlus className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">Создать аккаунт</h2>
        <p className="text-gray-500 dark:text-gray-400">Бесплатный доступ ко всем курсам</p>
      </div>

      <div className="p-6 md:p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-500 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Имя</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Иван Иванов"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="student@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Пароль</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-2 disabled:opacity-50"
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>
          <div className="mt-6 text-center">
            <Link to="/login" className="text-indigo-500 hover:text-indigo-400 font-medium mr-4">
              Уже есть аккаунт?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;