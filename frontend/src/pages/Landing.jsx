import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, LogIn, ArrowRight, GraduationCap, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="inline-block p-4 rounded-2xl mb-6 bg-indigo-500/10">
          <Brain className="w-12 h-12 text-indigo-400" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          Умное обучение без границ
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Бесплатная платформа для подготовки к ОГЭ, ЕГЭ и олимпиадам с ИИ-помощником
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-xl transition-all transform hover:scale-105"
          >
            <LogIn size={20} />
            <span>Войти</span>
          </button>
          <button
            onClick={() => navigate('/courses')} 
            className="flex items-center justify-center space-x-2 font-medium py-3 px-8 rounded-xl transition-all transform hover:scale-105 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700"
          >
            <ArrowRight size={20} />
            <span>Демо доступ</span>
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      >
        {[
          { icon: GraduationCap, title: 'Готовые курсы', desc: 'Полные программы подготовки к экзаменам' },
          { icon: Brain, title: 'ИИ-ассистент', desc: 'Проверка заданий и рекомендации' },
          { icon: Mic, title: 'Аудио-лекции', desc: 'Озвучивание материалов для обучения' }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-sm">
            <item.icon className="w-10 h-10 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{item.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Landing;