import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, Trophy, Clock, BarChart3, Edit2, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <div className="bg-indigo-500/10 p-3 rounded-xl mr-4">
          <User className="w-8 h-8 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Личный кабинет</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Добро пожаловать, {user.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Карточка профиля */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-3xl font-bold bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mb-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
            </div>
            
            <div className="space-y-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <Calendar className="text-indigo-400 mr-3" size={18} />
                <span>На платформе с {new Date().getFullYear()}</span>
              </div>
              <div className="flex items-center">
                <Trophy className="text-yellow-400 mr-3" size={18} />
                <span>Достижения: 0</span>
              </div>
            </div>

            <button 
              onClick={logout}
              className="w-full flex items-center justify-center space-x-2 border border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-2.5 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span>Выйти</span>
            </button>
          </div>
        </div>

        {/* Статистика (Заглушка пока нет реальных данных) */}
        <div className="lg:col-span-2">
           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 mb-6">
             <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">Статистика обучения</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="p-4 rounded-xl text-center bg-gray-50 dark:bg-gray-700">
                 <div className="text-2xl font-bold text-indigo-500">0</div>
                 <div className="text-xs text-gray-500 dark:text-gray-400">Курсов</div>
               </div>
               <div className="p-4 rounded-xl text-center bg-gray-50 dark:bg-gray-700">
                 <div className="text-2xl font-bold text-blue-500">0</div>
                 <div className="text-xs text-gray-500 dark:text-gray-400">Лекций</div>
               </div>
               <div className="p-4 rounded-xl text-center bg-gray-50 dark:bg-gray-700">
                 <div className="text-2xl font-bold text-green-500">0</div>
                 <div className="text-xs text-gray-500 dark:text-gray-400">Задач</div>
               </div>
               <div className="p-4 rounded-xl text-center bg-gray-50 dark:bg-gray-700">
                 <div className="text-2xl font-bold text-yellow-500">0</div>
                 <div className="text-xs text-gray-500 dark:text-gray-400">Часов</div>
               </div>
             </div>
           </div>
           
           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="text-center py-10 text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Статистика появится после прохождения первого курса</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;