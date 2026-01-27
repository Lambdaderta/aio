import React, { useState, useEffect, useRef } from 'react';
import { Swords, Clock, Zap, User, Trophy, Play, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PVPGame = () => {
  const { user } = useAuth();
  const [gameState, setGameState] = useState('lobby'); // lobby, searching, countdown, playing, finished
  const [opponent, setOpponent] = useState(null);
  const [timer, setTimer] = useState(60);
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [currentTask, setCurrentTask] = useState(null);
  const [inputAnswer, setInputAnswer] = useState('');
  const [result, setResult] = useState(null); // win, lose, draw

  // Имитация веб-сокета
  const socketRef = useRef(null);

  // Список задач для дуэли (обычно приходит с сервера)
  const duelTasks = [
    { q: '2 + 2 * 2', a: '6' },
    { q: 'Корень из 144', a: '12' },
    { q: '5! (факториал)', a: '120' },
    { q: '2 в 10 степени', a: '1024' },
    { q: '100 / 25 * 4', a: '16' },
  ];

  const startSearch = () => {
    setGameState('searching');
    
    // Эмуляция поиска соперника (через 2 сек найдет)
    setTimeout(() => {
      setOpponent({ name: 'AlexMaster', avatar: 'A' });
      setGameState('countdown');
      let count = 3;
      // Обратный отсчет
      const countInterval = setInterval(() => {
        count--;
        if (count <= 0) {
          clearInterval(countInterval);
          startGame();
        }
      }, 1000);
    }, 2000);
  };

  const startGame = () => {
    setGameState('playing');
    setMyScore(0);
    setOpponentScore(0);
    setTimer(60);
    setCurrentTask(duelTasks[0]);
    
    // Эмуляция действий соперника (бот)
    const botInterval = setInterval(() => {
      setOpponentScore(prev => {
        if (Math.random() > 0.7) return prev + 1; // 30% шанс решить задачу раз в секунду
        return prev;
      });
    }, 2000);
    socketRef.current = botInterval;
  };

  useEffect(() => {
    // Таймер игры
    let interval;
    if (gameState === 'playing' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && gameState === 'playing') {
      finishGame();
    }
    return () => clearInterval(interval);
  }, [timer, gameState]);

  const finishGame = () => {
    setGameState('finished');
    clearInterval(socketRef.current); // Остановить бота
    if (myScore > opponentScore) setResult('win');
    else if (myScore < opponentScore) setResult('lose');
    else setResult('draw');
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    if (inputAnswer.trim() === currentTask.a) {
      // Правильный ответ
      const nextScore = myScore + 1;
      setMyScore(nextScore);
      setInputAnswer('');
      
      // Следующая задача или финиш, если задачи кончились (тут просто циклично для теста)
      const nextTaskIndex = nextScore % duelTasks.length;
      setCurrentTask(duelTasks[nextTaskIndex]);
      
      // Визуальный эффект
      // (тут можно добавить анимацию)
    } else {
      // Неправильный ответ - штраф или тряска
      alert("Неверно!");
    }
  };

  // UI компоненты

  if (gameState === 'lobby') {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-indigo-500/10 p-6 rounded-full inline-block mb-6">
          <Swords size={64} className="text-indigo-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-white">Математическая Дуэль</h1>
        <p className="text-gray-400 mb-8 text-xl">Соревнуйся с другими студентами в реальном времени. Кто решит больше задач за 60 секунд?</p>
        <button 
          onClick={startSearch}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold py-4 px-12 rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25 flex items-center mx-auto"
        >
          <Zap className="mr-2" />
          Найти соперника
        </button>
      </div>
    );
  }

  if (gameState === 'searching' || gameState === 'countdown') {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <Loader2 className="animate-spin w-16 h-16 text-indigo-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-2">
          {gameState === 'searching' ? 'Поиск соперника...' : 'Приготовьтесь!'}
        </h2>
        {opponent && (
          <div className="mt-8 p-4 bg-gray-800 rounded-xl flex items-center justify-center animate-bounce">
             <span className="text-gray-400 mr-2">Противник найден:</span>
             <span className="font-bold text-white">{opponent.name}</span>
          </div>
        )}
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className={`p-6 rounded-full inline-block mb-6 ${result === 'win' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <Trophy size={64} className={result === 'win' ? 'text-green-500' : 'text-red-500'} />
        </div>
        <h2 className="text-4xl font-bold mb-2 text-white">
          {result === 'win' ? 'ПОБЕДА!' : result === 'lose' ? 'ПОРАЖЕНИЕ' : 'НИЧЬЯ'}
        </h2>
        <div className="flex justify-center space-x-8 my-8 text-2xl font-bold">
          <div className="text-center">
            <div className="text-indigo-400">{myScore}</div>
            <div className="text-sm text-gray-500">Вы</div>
          </div>
          <div className="text-gray-600">-</div>
          <div className="text-center">
            <div className="text-red-400">{opponentScore}</div>
            <div className="text-sm text-gray-500">{opponent.name}</div>
          </div>
        </div>
        <button onClick={() => setGameState('lobby')} className="bg-white text-gray-900 px-6 py-3 rounded-lg font-bold">
          В меню
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header игры */}
      <div className="flex justify-between items-center mb-8 p-4 bg-gray-800 rounded-2xl border border-gray-700">
        <div className="flex items-center space-x-4 w-1/3">
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">
            {user.name[0]}
          </div>
          <div>
            <div className="font-bold text-white">Вы</div>
            <div className="text-2xl text-indigo-400 font-mono">{myScore}</div>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/3">
          <div className={`text-3xl font-mono font-bold ${timer < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            00:{timer < 10 ? `0${timer}` : timer}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Время</div>
        </div>

        <div className="flex items-center justify-end space-x-4 w-1/3">
          <div className="text-right">
            <div className="font-bold text-white">{opponent.name}</div>
            <div className="text-2xl text-red-400 font-mono">{opponentScore}</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-bold text-white">
            {opponent.avatar}
          </div>
        </div>
      </div>

      {/* Прогресс бар */}
      <div className="mb-8 relative h-4 bg-gray-700 rounded-full overflow-hidden">
        <div 
           className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-300"
           style={{ width: `${Math.min((myScore / 20) * 100, 100)}%` }} // 20 задач как цель
        />
        <div 
           className="absolute top-0 left-0 h-full bg-red-500/50 transition-all duration-300"
           style={{ width: `${Math.min((opponentScore / 20) * 100, 100)}%` }}
        />
      </div>

      {/* Игровое поле */}
      <div className="bg-gray-800 p-8 rounded-3xl text-center shadow-2xl border border-gray-700">
        <div className="text-sm text-gray-400 mb-4">Решите задачу</div>
        <div className="text-4xl md:text-5xl font-bold text-white mb-8 font-mono tracking-wider">
          {currentTask.q} = ?
        </div>
        
        <form onSubmit={submitAnswer} className="max-w-xs mx-auto">
          <input 
            type="number" 
            autoFocus
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
            className="w-full bg-gray-900 border-2 border-indigo-500/50 text-white text-3xl text-center py-4 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 mb-4 font-mono"
            placeholder="..."
          />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default PVPGame;