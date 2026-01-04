import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, LogIn, UserPlus, LogOut, BookOpen, Mic, CheckCircle, Plus, ArrowLeft, Star, GraduationCap, Brain, Volume2, ArrowRight, User, Settings, Calendar, Trophy, Clock, Edit2, StopCircle, Play, ChevronLeft, ChevronRight, Check, X, MessageSquare, Lightbulb, BarChart3, Medal, Award, Code, Hash, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  // State management
  const [theme, setTheme] = useState('dark');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('landing'); 
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: 'ОГЭ по математике', 
      description: 'Полный курс подготовки к основному государственному экзамену по математике',
      level: 'Средний',
      lectures: [
        { 
          id: 1, 
          title: 'Алгебраические выражения', 
          content: 'Алгебраические выражения — это математические выражения, содержащие числа, переменные и арифметические операции. В этом разделе мы рассмотрим основные типы выражений и методы их упрощения.',
          tasks: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'Упростите выражение: 3x + 2y - x + 4y',
              options: ['2x + 6y', '4x + 6y', '2x + 2y', '4x - 2y'],
              correctAnswer: 0,
              explanation: '3x - x = 2x и 2y + 4y = 6y, поэтому правильный ответ: 2x + 6y'
            },
            {
              id: 2,
              type: 'numeric',
              question: 'Вычислите значение выражения 2a² - 3b при a = 2, b = 1',
              correctAnswer: '5',
              explanation: '2 × 2² - 3 × 1 = 2 × 4 - 3 = 8 - 3 = 5'
            }
          ],
          completed: false,
          score: 0
        },
        { 
          id: 2, 
          title: 'Геометрические фигуры', 
          content: 'Геометрические фигуры — это формы, которые изучаются в геометрии. Мы рассмотрим свойства треугольников, четырехугольников и окружностей, а также научимся решать задачи на нахождение площадей и объемов.',
          tasks: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'Найдите площадь прямоугольника со сторонами 5 см и 8 см',
              options: ['13 см²', '40 см²', '26 см²', '20 см²'],
              correctAnswer: 1,
              explanation: 'Площадь прямоугольника = длина × ширина = 5 × 8 = 40 см²'
            },
            {
              id: 2,
              type: 'numeric',
              question: 'Чему равен периметр квадрата со стороной 6 см?',
              correctAnswer: '24',
              explanation: 'Периметр квадрата = 4 × сторона = 4 × 6 = 24 см'
            }
          ],
          completed: false,
          score: 0
        }
      ],
      progress: 0,
      completed: false,
      averageScore: 0
    },
    { 
      id: 2, 
      title: 'Основы программирования', 
      description: 'Курс по основам программирования на Python для начинающих',
      level: 'Начальный',
      lectures: [
        { 
          id: 1, 
          title: 'Переменные и типы данных', 
          content: 'В этой лекции мы изучим основные типы данных в Python: числа, строки, списки и словари. Также рассмотрим, как объявлять переменные и работать с ними.',
          tasks: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'Какой тип данных используется для хранения целых чисел в Python?',
              options: ['float', 'string', 'int', 'boolean'],
              correctAnswer: 2,
              explanation: 'В Python для хранения целых чисел используется тип данных int.'
            },
            {
              id: 2,
              type: 'code',
              question: 'Напишите функцию на Python, которая возвращает сумму двух чисел',
              correctAnswer: 'def sum_two(a, b):\n    return a + b',
              explanation: 'Простая функция, принимающая два параметра и возвращающая их сумму.'
            }
          ],
          completed: false,
          score: 0
        },
        { 
          id: 2, 
          title: 'Условные операторы', 
          content: 'В этой лекции мы изучим условные операторы if, elif, else, которые позволяют программе принимать решения на основе различных условий.',
          tasks: [
            {
              id: 1,
              type: 'code',
              question: 'Напишите функцию на Python, которая проверяет, является ли число четным',
              correctAnswer: 'def is_even(n):\n    return n % 2 == 0',
              explanation: 'Функция использует оператор % (остаток от деления) для проверки четности числа.'
            }
          ],
          completed: false,
          score: 0
        }
      ],
      progress: 0,
      completed: false,
      averageScore: 0
    }
  ]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', level: 'beginner' });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [similarTasks, setSimilarTasks] = useState([]);
  const [currentSimilarTaskIndex, setCurrentSimilarTaskIndex] = useState(0);
  const [similarTaskAnswers, setSimilarTaskAnswers] = useState({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [users] = useState([
    { id: 1, email: 'student@example.com', password: 'password123', name: 'Алексей Петров', joinDate: '2025-01-15', achievements: [] }
  ]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ name: '', email: '' });
  const [speechUtterance, setSpeechUtterance] = useState(null);
  const synthRef = useRef(null);
  
  // Theme management
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    synthRef.current = window.speechSynthesis;
  }, [theme]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (speechUtterance) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechUtterance]);
  
  // Initialize edited profile when user changes
  useEffect(() => {
    if (currentUser) {
      setEditedProfile({ name: currentUser.name, email: currentUser.email });
    }
  }, [currentUser]);
  
  // Text-to-speech functionality
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 0.9;
      
      const voices = window.speechSynthesis.getVoices();
      const russianVoice = voices.find(voice => voice.lang.includes('ru'));
      if (russianVoice) {
        utterance.voice = russianVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      setSpeechUtterance(utterance);
    }
  };
  
  const stopSpeaking = () => {
    if (speechUtterance) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  
  // Handlers
  const handleSkip = () => {
    const guestUser = { 
      id: 0, 
      name: 'Гость', 
      email: 'guest@example.com', 
      joinDate: new Date().toISOString().split('T')[0],
      achievements: []
    };
    setCurrentUser(guestUser);
    setIsLoggedIn(true);
    setCurrentView('courses');
  };
  
  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentView('courses');
    }
  };
  
  const handleRegister = (name, email, password) => {
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      joinDate: new Date().toISOString().split('T')[0],
      achievements: []
    };
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setCurrentView('courses');
  };
  
  const handleLogout = () => {
    stopSpeaking();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView('landing');
    setSelectedCourse(null);
    setSelectedLecture(null);
    setSelectedTask(null);
    setSimilarTasks([]);
    setIsEditingProfile(false);
    setUserAnswers({});
    setSimilarTaskAnswers({});
  };
  
  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description) {
      const course = {
        id: courses.length + 1,
        title: newCourse.title,
        description: newCourse.description,
        level: newCourse.level === 'beginner' ? 'Начальный' : 
               newCourse.level === 'intermediate' ? 'Средний' : 
               newCourse.level === 'advanced' ? 'Продвинутый' : 'Эксперт',
        lectures: [],
        progress: 0,
        completed: false,
        averageScore: 0
      };
      setCourses([...courses, course]);
      setNewCourse({ title: '', description: '', level: 'beginner' });
      setCurrentView('courses');
    }
  };
  
  const handleCheckLevel = () => {
    const feedbacks = [
      'Отличная работа! Ваши знания соответствуют ожидаемому уровню для этого курса. Рекомендую продолжить с текущего модуля.',
      'Хорошие результаты, но есть пробелы в некоторых темах. Стоит повторить разделы по алгебраическим выражениям.',
      'Вам нужно больше практики по основным концепциям. Начните с первого модуля и внимательно изучите лекции.'
    ];
    setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);
  };
  
  const handleTaskAnswer = (taskId, answer, isCorrect) => {
    const newAnswers = {
      ...userAnswers,
      [taskId]: {
        answer,
        isCorrect,
        timestamp: new Date().toISOString()
      }
    };
    setUserAnswers(newAnswers);
    
    // If this is the last task and all are correct, mark lecture as completed
    if (selectedLecture.tasks.length > 0) {
      const allTasksAnswered = Object.keys(newAnswers).length === selectedLecture.tasks.length;
      const allCorrect = Object.values(newAnswers).every(a => a.isCorrect);
      
      if (allTasksAnswered) {
        let score = Math.round((Object.values(newAnswers).filter(a => a.isCorrect).length / selectedLecture.tasks.length) * 100);
        
        // Update lecture completion and score
        setSelectedLecture(prev => ({
          ...prev,
          completed: true,
          score: score
        }));
        
        // Show achievement if score is high
        if (score >= 90 && currentUser && !currentUser.achievements.includes('perfect_score')) {
          setFeedback('🎉 Отличный результат! Вы получили достижение "Идеальный результат" за выполнение всех заданий без ошибок!');
        } else if (score >= 80) {
          setFeedback('Отличная работа! Вы отлично справились с заданиями по этой теме.');
        } else if (score >= 60) {
          setFeedback('Хороший результат! Повторите материал, чтобы улучшить свои знания.');
        } else {
          setFeedback('Вам стоит пересмотреть материал лекции и попробовать решить задачи еще раз.');
        }
      }
    }
  };
  
  const generateSimilarTasks = (task) => {
    // Mock similar tasks generation - in real app this would come from backend
    let baseTasks = [];
    
    if (task.type === 'code') {
      baseTasks = [
        {
          id: 101,
          type: 'code',
          question: 'Напишите функцию на Python, которая возвращает произведение двух чисел',
          correctAnswer: 'def multiply(a, b):\n    return a * b',
          explanation: 'Простая функция, принимающая два параметра и возвращающая их произведение.'
        },
        {
          id: 102,
          type: 'code',
          question: 'Напишите функцию на Python, которая возвращает максимальное из двух чисел',
          correctAnswer: 'def max_of_two(a, b):\n    return a if a > b else b',
          explanation: 'Функция сравнивает два числа и возвращает большее из них.'
        },
        {
          id: 103,
          type: 'code',
          question: 'Напишите функцию на Python, которая проверяет, является ли число положительным',
          correctAnswer: 'def is_positive(n):\n    return n > 0',
          explanation: 'Функция возвращает True, если число больше нуля, иначе False.'
        }
      ];
    } else if (task.type === 'numeric') {
      baseTasks = [
        {
          id: 101,
          type: 'numeric',
          question: 'Вычислите значение выражения 3a² - 2b при a = 3, b = 2',
          correctAnswer: '23',
          explanation: '3 × 3² - 2 × 2 = 3 × 9 - 4 = 27 - 4 = 23'
        },
        {
          id: 102,
          type: 'numeric',
          question: 'Вычислите значение выражения 4x² + 5y при x = 2, y = 3',
          correctAnswer: '31',
          explanation: '4 × 2² + 5 × 3 = 4 × 4 + 15 = 16 + 15 = 31'
        }
      ];
    } else {
      baseTasks = [
        {
          id: 101,
          type: 'multiple-choice',
          question: 'Упростите выражение: 4x + 3y - 2x + 5y',
          options: ['2x + 8y', '6x + 8y', '2x + 2y', '6x - 2y'],
          correctAnswer: 0,
          explanation: '4x - 2x = 2x и 3y + 5y = 8y, поэтому правильный ответ: 2x + 8y'
        },
        {
          id: 102,
          type: 'multiple-choice',
          question: 'Упростите выражение: 5a - 2b + 3a + 4b',
          options: ['8a + 2b', '2a + 6b', '8a - 6b', '2a - 2b'],
          correctAnswer: 0,
          explanation: '5a + 3a = 8a и -2b + 4b = 2b, поэтому правильный ответ: 8a + 2b'
        }
      ];
    }
    
    setSimilarTasks(baseTasks);
    setCurrentSimilarTaskIndex(0);
    setSimilarTaskAnswers({});
    setCurrentView('similar-tasks');
  };
  
  const handleSimilarTaskAnswer = (taskId, answer, isCorrect) => {
    const newAnswers = {
      ...similarTaskAnswers,
      [taskId]: {
        answer,
        isCorrect,
        timestamp: new Date().toISOString()
      }
    };
    setSimilarTaskAnswers(newAnswers);
  };
  
  const handleNextSimilarTask = () => {
    if (currentSimilarTaskIndex < similarTasks.length - 1) {
      setCurrentSimilarTaskIndex(prev => prev + 1);
      setShowExplanation(false);
    }
  };
  
  const handlePreviousSimilarTask = () => {
    if (currentSimilarTaskIndex > 0) {
      setCurrentSimilarTaskIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };
  
  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };
  
  const handleSaveProfile = () => {
    if (currentUser.id === 0) {
      // Guest user
      setCurrentUser({...currentUser, ...editedProfile});
    } else {
      // Registered user - in real app would save to backend
      setCurrentUser({...currentUser, ...editedProfile});
    }
    setIsEditingProfile(false);
  };
  
  const getLevelColor = (level) => {
    switch(level) {
      case 'Начальный':
        return 'bg-green-500/10 text-green-400';
      case 'Средний':
        return 'bg-blue-500/10 text-blue-400';
      case 'Продвинутый':
        return 'bg-purple-500/10 text-purple-400';
      case 'Эксперт':
        return 'bg-pink-500/10 text-pink-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };
  
  const getProgressColor = (progress) => {
    if (progress > 80) return 'bg-green-500';
    if (progress > 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };
  
  const renderTaskInput = (task) => {
    const userAnswer = userAnswers[task.id]?.answer || '';
    
    switch(task.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {task.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleTaskAnswer(
                  task.id,
                  index,
                  index === task.correctAnswer
                )}
                className={`w-full text-left p-4 rounded-xl border ${
                  userAnswer === index
                    ? (userAnswers[task.id]?.isCorrect
                      ? (theme === 'dark' ? 'bg-green-900/30 border-green-500' : 'bg-green-50 border-green-300')
                      : (theme === 'dark' ? 'bg-red-900/30 border-red-500' : 'bg-red-50 border-red-300'))
                    : (theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50')
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    userAnswer === index
                      ? (userAnswers[task.id]?.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                      : (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
                  }`}>
                    {userAnswer === index ? (
                      userAnswers[task.id]?.isCorrect ? <Check size={14} /> : <X size={14} />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        );
      
      case 'numeric':
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswers({
                ...userAnswers,
                [task.id]: { answer: e.target.value, isCorrect: false }
              })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
              placeholder="Введите число"
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleTaskAnswer(
                  task.id,
                  userAnswer,
                  userAnswer.trim() === task.correctAnswer
                )}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                Проверить ответ
              </button>
            </div>
          </div>
        );
      
      case 'code':
        return (
          <div className="space-y-4">
            <div className={`font-mono text-sm p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'
            }`}>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswers({
                  ...userAnswers,
                  [task.id]: { answer: e.target.value, isCorrect: false }
                })}
                className={`w-full bg-transparent border-none focus:ring-0 ${
                  theme === 'dark' ? 'text-gray-200 placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'
                }`}
                placeholder="def solution():\n    # Ваш код\n    return result"
                rows="10"
              />
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <p>• Используйте пробелы для отступов</p>
              <p>• Верните результат с помощью оператора return</p>
              <p>• Функция должна работать для любых входных данных</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleTaskAnswer(
                  task.id,
                  userAnswer,
                  userAnswer.trim() === task.correctAnswer
                )}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                Проверить решение
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  const renderSimilarTaskInput = (task) => {
    const userAnswer = similarTaskAnswers[task.id]?.answer || '';
    
    switch(task.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {task.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSimilarTaskAnswer(
                  task.id,
                  index,
                  index === task.correctAnswer
                )}
                className={`w-full text-left p-4 rounded-xl border ${
                  userAnswer === index
                    ? (similarTaskAnswers[task.id]?.isCorrect
                      ? (theme === 'dark' ? 'bg-green-900/30 border-green-500' : 'bg-green-50 border-green-300')
                      : (theme === 'dark' ? 'bg-red-900/30 border-red-500' : 'bg-red-50 border-red-300'))
                    : (theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50')
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    userAnswer === index
                      ? (similarTaskAnswers[task.id]?.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                      : (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
                  }`}>
                    {userAnswer === index ? (
                      similarTaskAnswers[task.id]?.isCorrect ? <Check size={14} /> : <X size={14} />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        );
      
      case 'numeric':
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setSimilarTaskAnswers({
                ...similarTaskAnswers,
                [task.id]: { answer: e.target.value, isCorrect: false }
              })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
              placeholder="Введите число"
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleSimilarTaskAnswer(
                  task.id,
                  userAnswer,
                  userAnswer.trim() === task.correctAnswer
                )}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                Проверить ответ
              </button>
            </div>
          </div>
        );
      
      case 'code':
        return (
          <div className="space-y-4">
            <div className={`font-mono text-sm p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'
            }`}>
              <textarea
                value={userAnswer}
                onChange={(e) => setSimilarTaskAnswers({
                  ...similarTaskAnswers,
                  [task.id]: { answer: e.target.value, isCorrect: false }
                })}
                className={`w-full bg-transparent border-none focus:ring-0 ${
                  theme === 'dark' ? 'text-gray-200 placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'
                }`}
                placeholder="def solution():\n    # Ваш код\n    return result"
                rows="10"
              />
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <p>• Используйте пробелы для отступов</p>
              <p>• Верните результат с помощью оператора return</p>
              <p>• Функция должна работать для любых входных данных</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleSimilarTaskAnswer(
                  task.id,
                  userAnswer,
                  userAnswer.trim() === task.correctAnswer
                )}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                Проверить решение
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };
  
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b ${theme === 'dark' ? 'border-gray-800 bg-gray-900/80' : 'border-gray-200 bg-white/80'} backdrop-blur-lg`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className={`w-8 h-8 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              EduMind
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <>
                <button
                  onClick={() => setCurrentView('courses')}
                  className={`hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                    currentView === 'courses' || currentView === 'course-detail' || currentView === 'create-course' || 
                    currentView === 'lecture-detail' || currentView === 'task-detail' || currentView === 'similar-tasks'
                      ? (theme === 'dark' ? 'bg-indigo-900/50' : 'bg-indigo-50')
                      : ''
                  } ${theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <BookOpen size={18} />
                  <span>Курсы</span>
                </button>
                <button
                  onClick={() => setCurrentView('profile')}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                    currentView === 'profile'
                      ? (theme === 'dark' ? 'bg-indigo-900/50' : 'bg-indigo-50')
                      : ''
                  } ${theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <User size={18} />
                  <span className="hidden sm:inline">Профиль</span>
                </button>
              </>
            )}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-full transition-colors ${theme === 'dark' 
                ? 'text-yellow-400 hover:bg-gray-800' 
                : 'text-gray-700 hover:bg-gray-200'}`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Выход</span>
              </button>
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            {/* Landing Page */}
            {currentView === 'landing' && (
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
                      onClick={() => setCurrentView('login')}
                      className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-xl transition-all transform hover:scale-105"
                    >
                      <LogIn size={20} />
                      <span>Войти</span>
                    </button>
                    <button
                      onClick={handleSkip}
                      className={`flex items-center justify-center space-x-2 font-medium py-3 px-8 rounded-xl transition-all transform hover:scale-105 ${
                        theme === 'dark'
                          ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                          : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      <ArrowRight size={20} />
                      <span>Пропустить</span>
                    </button>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                >
                  <div className={`p-6 rounded-2xl ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
                  } border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                    <GraduationCap className="w-10 h-10 text-indigo-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Готовые курсы</h3>
                    <p className="text-gray-400">Полные программы подготовки к экзаменам и олимпиадам</p>
                  </div>
                  <div className={`p-6 rounded-2xl ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
                  } border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                    <Brain className="w-10 h-10 text-indigo-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">ИИ-ассистент</h3>
                    <p className="text-gray-400">Проверка заданий и персонализированные рекомендации</p>
                  </div>
                  <div className={`p-6 rounded-2xl ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
                  } border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                    <Mic className="w-10 h-10 text-indigo-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Аудио-лекции</h3>
                    <p className="text-gray-400">Озвучивание материалов для обучения в любом месте</p>
                  </div>
                </motion.div>
              </div>
            )}
            
            {/* Authentication Views */}
            {!isLoggedIn && (currentView === 'login' || currentView === 'register') && (
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-block p-3 rounded-2xl mb-4 bg-indigo-500/10">
                    {currentView === 'login' ? (
                      <LogIn className="w-8 h-8 text-indigo-400" />
                    ) : (
                      <UserPlus className="w-8 h-8 text-indigo-400" />
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {currentView === 'login' ? 'Добро пожаловать' : 'Создать аккаунт'}
                  </h2>
                  <p className="text-gray-400">
                    {currentView === 'login' 
                      ? 'Войдите для сохранения прогресса' 
                      : 'Бесплатный доступ ко всем курсам'}
                  </p>
                </div>
                <div className={`p-6 md:p-8 rounded-2xl shadow-xl ${
                  theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white'
                }`}>
                  {currentView === 'login' && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const email = e.target.email.value;
                      const password = e.target.password.value;
                      handleLogin(email, password);
                    }}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                          <input
                            id="email"
                            type="email"
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                            }`}
                            placeholder="student@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium mb-1">Пароль</label>
                          <input
                            id="password"
                            type="password"
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                            }`}
                            placeholder="••••••••"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-2"
                        >
                          Войти
                        </button>
                      </div>
                      <div className="mt-6 text-center">
                        <button
                          type="button"
                          onClick={() => setCurrentView('register')}
                          className="text-indigo-500 hover:text-indigo-400 font-medium mr-4"
                        >
                          Создать аккаунт
                        </button>
                        <button
                          type="button"
                          onClick={handleSkip}
                          className="text-gray-400 hover:text-gray-300 font-medium"
                        >
                          Пропустить →
                        </button>
                      </div>
                    </form>
                  )}
                  {currentView === 'register' && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const name = e.target.name.value;
                      const email = e.target.email.value;
                      const password = e.target.password.value;
                      handleRegister(name, email, password);
                    }}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">Имя</label>
                          <input
                            id="name"
                            type="text"
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                            }`}
                            placeholder="Алексей Петров"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                          <input
                            id="email"
                            type="email"
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                            }`}
                            placeholder="student@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium mb-1">Пароль</label>
                          <input
                            id="password"
                            type="password"
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${
                              theme === 'dark' 
                                ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                            }`}
                            placeholder="••••••••"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-2"
                        >
                          Зарегистрироваться
                        </button>
                      </div>
                      <div className="mt-6 text-center">
                        <button
                          type="button"
                          onClick={() => setCurrentView('login')}
                          className="text-indigo-500 hover:text-indigo-400 font-medium mr-4"
                        >
                          Уже есть аккаунт?
                        </button>
                        <button
                          type="button"
                          onClick={handleSkip}
                          className="text-gray-400 hover:text-gray-300 font-medium"
                        >
                          Пропустить →
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
            
            {/* Courses View */}
            {isLoggedIn && currentView === 'courses' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Доступные курсы</h2>
                    <p className="text-gray-400 mt-1">Начните обучение или продолжите изучение материалов</p>
                  </div>
                  <button
                    onClick={() => setCurrentView('create-course')}
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors"
                  >
                    <Plus size={20} />
                    <span>Создать курс</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <motion.div
                      key={course.id}
                      whileHover={{ y: -5 }}
                      className={`rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all ${
                        theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700/50' : 'bg-white hover:shadow-xl'
                      }`}
                      onClick={() => {
                        setSelectedCourse(course);
                        setCurrentView('course-detail');
                      }}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
                              {course.level}
                            </span>
                          </div>
                          <Star className="text-yellow-400" size={20} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <p className="text-gray-400 mb-4 line-clamp-2">{course.description}</p>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Прогресс</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all ${getProgressColor(course.progress)}`}
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          {course.averageScore > 0 && (
                            <div className="flex items-center">
                              <BarChart3 className="text-indigo-400 mr-2" size={16} />
                              <span className="text-sm">Средний балл: {course.averageScore}%</span>
                            </div>
                          )}
                          <button 
                            className="w-full flex items-center justify-center space-x-2 py-2 bg-indigo-600/10 text-indigo-400 rounded-lg hover:bg-indigo-600/20 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCheckLevel();
                            }}
                          >
                            <CheckCircle size={18} />
                            <span>Проверить уровень</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Create Course View */}
            {isLoggedIn && currentView === 'create-course' && (
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center mb-6 cursor-pointer" onClick={() => setCurrentView('courses')}>
                  <ArrowLeft className="mr-2" size={20} />
                  <span className="font-medium">Вернуться к курсам</span>
                </div>
                <div className={`rounded-2xl p-6 md:p-8 ${
                  theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white'
                } shadow-xl`}>
                  <h2 className="text-2xl font-bold mb-6">Создать новый курс</h2>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="course-title" className="block text-sm font-medium mb-1">Название курса</label>
                      <input
                        id="course-title"
                        type="text"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                        }`}
                        placeholder="Например: Подготовка к ОГЭ по русскому языку"
                      />
                    </div>
                    <div>
                      <label htmlFor="course-description" className="block text-sm font-medium mb-1">Описание</label>
                      <textarea
                        id="course-description"
                        rows="3"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                        }`}
                        placeholder="Подробное описание курса и его целей"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="course-level" className="block text-sm font-medium mb-1">Уровень сложности</label>
                      <select
                        id="course-level"
                        value={newCourse.level}
                        onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                        }`}
                      >
                        <option value="beginner">Начальный</option>
                        <option value="intermediate">Средний</option>
                        <option value="advanced">Продвинутый</option>
                        <option value="expert">Эксперт</option>
                      </select>
                    </div>
                    <button
                      onClick={handleCreateCourse}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-2"
                      disabled={!newCourse.title || !newCourse.description}
                    >
                      Создать курс
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Course Detail View */}
            {isLoggedIn && currentView === 'course-detail' && selectedCourse && (
              <div>
                <div className="flex items-center mb-6 cursor-pointer" onClick={() => {
                  setCurrentView('courses');
                  setSelectedCourse(null);
                }}>
                  <ArrowLeft className="mr-2" size={20} />
                  <span className="font-medium">Вернуться к курсам</span>
                </div>
                <div className={`rounded-2xl p-6 md:p-8 mb-8 ${
                  theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white'
                } shadow-xl`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getLevelColor(selectedCourse.level)}`}>
                        {selectedCourse.level}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold mt-2">{selectedCourse.title}</h2>
                      <p className="text-gray-400 mt-1 max-w-2xl">{selectedCourse.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="flex items-center">
                        <Brain className="mr-2 text-indigo-400" size={24} />
                        <span className="font-medium">ИИ-ассистент • {selectedCourse.averageScore > 0 ? `${selectedCourse.averageScore}%` : 'Нет данных'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Ваш прогресс</span>
                      <span>{selectedCourse.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${getProgressColor(selectedCourse.progress)}`}
                        style={{ width: `${selectedCourse.progress}%` }}
                      ></div>
                    </div>
                    {selectedCourse.completed && (
                      <div className="mt-3 flex items-center text-green-400">
                        <Award className="mr-2" size={18} />
                        <span className="font-medium">Курс завершен! Отличная работа!</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="border-b pb-4 mb-6">
                      <h3 className="text-xl font-bold">Лекции</h3>
                    </div>
                    {selectedCourse.lectures.map((lecture) => (
                      <div
                        key={lecture.id}
                        className={`mb-4 p-4 rounded-xl cursor-pointer transition-all ${
                          theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-white'
                        } border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                        onClick={() => {
                          setSelectedLecture(lecture);
                          setCurrentView('lecture-detail');
                        }}
                      >
                        <div className="flex items-start">
                          <div className="bg-indigo-500/10 p-2 rounded-lg mr-3 mt-1">
                            <BookOpen className="text-indigo-400" size={20} />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h4 className="font-bold text-lg">{lecture.title}</h4>
                              {lecture.completed && (
                                <CheckCircle className="text-green-400 flex-shrink-0" size={18} />
                              )}
                            </div>
                            <p className="text-gray-400 mt-1 line-clamp-1">{lecture.content}</p>
                            {lecture.completed && lecture.score > 0 && (
                              <div className="mt-2 flex items-center">
                                <BarChart3 className="text-indigo-400 mr-1" size={14} />
                                <span className="text-sm text-indigo-400">Балл: {lecture.score}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Lecture Detail View */}
            {isLoggedIn && currentView === 'lecture-detail' && selectedLecture && (
              <div>
                <div className="flex items-center mb-6 cursor-pointer" onClick={() => {
                  setCurrentView('course-detail');
                  setSelectedLecture(null);
                }}>
                  <ArrowLeft className="mr-2" size={20} />
                  <span className="font-medium">Вернуться к курсу</span>
                </div>
                
                <div className={`rounded-2xl p-6 md:p-8 ${
                  theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white'
                } shadow-xl`}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold">{selectedLecture.title}</h3>
                      <p className="text-gray-400 mt-1">Лекция {selectedCourse.lectures.findIndex(l => l.id === selectedLecture.id) + 1} из {selectedCourse.lectures.length}</p>
                    </div>
                    <button
                      onClick={() => isSpeaking ? stopSpeaking() : speakText(selectedLecture.content)}
                      className={`p-2 rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                      title={isSpeaking ? "Остановить озвучку" : "Озвучить лекцию"}
                    >
                      {isSpeaking ? <StopCircle size={24} className="text-red-400" /> : <Volume2 size={24} />}
                    </button>
                  </div>
                  <div className="prose prose-indigo max-w-none dark:prose-invert">
                    <p className="text-lg leading-relaxed whitespace-pre-line">
                      {selectedLecture.content}
                    </p>
                  </div>
                </div>
                
                {/* Tasks Section */}
                {selectedLecture.tasks.length > 0 && (
                  <div className={`rounded-2xl p-6 md:p-8 mt-8 ${
                    theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white'
                  } shadow-xl`}>
                    <div className="border-b pb-4 mb-6">
                      <h3 className="text-xl font-bold">Задания</h3>
                    </div>
                    {selectedLecture.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`mb-6 p-4 rounded-xl cursor-pointer transition-all ${
                          theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-white'
                        } border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                        onClick={() => {
                          setSelectedTask(task);
                          setCurrentView('task-detail');
                        }}
                      >
                        <div className="flex items-start">
                          <div className="bg-indigo-500/10 p-2 rounded-lg mr-3 mt-1">
                            {task.type === 'multiple-choice' && <CheckCircle size={20} className="text-indigo-400" />}
                            {task.type === 'numeric' && <Hash size={20} className="text-indigo-400" />}
                            {task.type === 'code' && <Code size={20} className="text-indigo-400" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{task.question}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Task Detail View */}
            {isLoggedIn && currentView === 'task-detail' && selectedTask && (
              <div>
                <div className="flex items-center mb-6 cursor-pointer" onClick={() => {
                  setCurrentView('lecture-detail');
                  setSelectedTask(null);
                }}>
                  <ArrowLeft className="mr-2" size={20} />
                  <span className="font-medium">Вернуться к лекции</span>
                </div>
                
                <div className={`rounded-2xl p-6 md:p-8 ${
                  theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white'
                } shadow-xl`}>
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      {selectedTask.type === 'multiple-choice' && <CheckCircle className="text-indigo-400 mr-2" size={20} />}
                      {selectedTask.type === 'numeric' && <Hash className="text-indigo-400 mr-2" size={20} />}
                      {selectedTask.type === 'code' && <Code className="text-indigo-400 mr-2" size={20} />}
                      <h3 className="text-xl font-bold">Задание</h3>
                    </div>
                    <p className="text-lg mb-6">{selectedTask.question}</p>
                    
                    {renderTaskInput(selectedTask)}
                    
                    {showExplanation && selectedTask.explanation && (
                      <div className={`mt-6 p-4 rounded-xl ${
                        theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-50'
                      }`}>
                        <div className="flex items-start">
                          <Lightbulb className="text-indigo-400 mt-1 mr-3 flex-shrink-0" size={20} />
                          <div>
                            <h5 className="font-bold mb-1">Объяснение</h5>
                            <p className="text-gray-300">{selectedTask.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-8">
                    <button
                      onClick={() => setCurrentView('lecture-detail')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ArrowLeft size={18} />
                      <span>Вернуться к лекции</span>
                    </button>
                    
                    <div className="flex space-x-3">
                      {selectedTask.explanation && (
                        <button
                          onClick={toggleExplanation}
                          className={`px-4 py-2 rounded-lg flex items-center ${
                            theme === 'dark'
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          <Lightbulb className="mr-2" size={16} />
                          {showExplanation ? 'Скрыть объяснение' : 'Показать объяснение'}
                        </button>
                      )}
                      <button
                        onClick={() => generateSimilarTasks(selectedTask)}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        <RefreshCw size={18} />
                        <span>Похожие задачи</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Similar Tasks View */}
            {isLoggedIn && currentView === 'similar-tasks' && similarTasks.length > 0 && (
              <div>
                <div className="flex items-center mb-6 cursor-pointer" onClick={() => {
                  setCurrentView('task-detail');
                  setSimilarTasks([]);
                }}>
                  <ArrowLeft className="mr-2" size={20} />
                  <span className="font-medium">Вернуться к задаче</span>
                </div>
                
                <div className={`rounded-2xl p-6 md:p-8 ${
                  theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white'
                } shadow-xl`}>
                  <div className="flex items-center mb-6">
                    <RefreshCw className="text-green-400 mr-3" size={28} />
                    <h2 className="text-2xl font-bold">Похожие задачи ({currentSimilarTaskIndex + 1} из {similarTasks.length})</h2>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">{similarTasks[currentSimilarTaskIndex].question}</h3>
                    {renderSimilarTaskInput(similarTasks[currentSimilarTaskIndex])}
                    
                    {showExplanation && similarTasks[currentSimilarTaskIndex].explanation && (
                      <div className={`mt-6 p-4 rounded-xl ${
                        theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-50'
                      }`}>
                        <div className="flex items-start">
                          <Lightbulb className="text-indigo-400 mt-1 mr-3 flex-shrink-0" size={20} />
                          <div>
                            <h5 className="font-bold mb-1">Объяснение</h5>
                            <p className="text-gray-300">{similarTasks[currentSimilarTaskIndex].explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handlePreviousSimilarTask}
                      disabled={currentSimilarTaskIndex === 0}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        currentSimilarTaskIndex === 0
                          ? (theme === 'dark' ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed')
                          : (theme === 'dark' ? 'text-indigo-400 hover:bg-gray-800' : 'text-indigo-600 hover:bg-gray-100')
                      }`}
                    >
                      <ChevronLeft size={18} />
                      <span>Предыдущая</span>
                    </button>
                    
                    <div className="flex space-x-3">
                      {similarTasks[currentSimilarTaskIndex].explanation && (
                        <button
                          onClick={toggleExplanation}
                          className={`px-4 py-2 rounded-lg flex items-center ${
                            theme === 'dark'
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          <Lightbulb className="mr-2" size={16} />
                          {showExplanation ? 'Скрыть объяснение' : 'Показать объяснение'}
                        </button>
                      )}
                      
                      <button
                        onClick={handleNextSimilarTask}
                        disabled={currentSimilarTaskIndex === similarTasks.length - 1}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          currentSimilarTaskIndex === similarTasks.length - 1
                            ? (theme === 'dark' ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed')
                            : (theme === 'dark' ? 'text-indigo-400 hover:bg-gray-800' : 'text-indigo-600 hover:bg-gray-100')
                        }`}
                      >
                        <span>Следующая</span>
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Profile View */}
            {isLoggedIn && currentView === 'profile' && (
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                  <div className="bg-indigo-500/10 p-3 rounded-xl mr-4">
                    <User className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Личный кабинет</h1>
                    <p className="text-gray-400 mt-1">Добро пожаловать, {currentUser.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Card */}
                  <div className="lg:col-span-1">
                    <div className={`rounded-2xl p-6 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } shadow-xl`}>
                      <div className="text-center mb-6">
                        <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center text-3xl font-bold ${
                          theme === 'dark' ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          {currentUser.name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-bold mt-4">{currentUser.name}</h3>
                        <p className="text-gray-400">{currentUser.email}</p>
                      </div>
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center">
                          <Calendar className="text-indigo-400 mr-3" size={20} />
                          <span>На платформе с {currentUser.joinDate}</span>
                        </div>
                        <div className="flex items-center">
                          <Trophy className="text-yellow-400 mr-3" size={20} />
                          <span>Завершено курсов: {courses.filter(c => c.completed).length}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="text-blue-400 mr-3" size={20} />
                          <span>Всего обучения: 15ч 30м</span>
                        </div>
                        <div className="flex items-center">
                          <BarChart3 className="text-green-400 mr-3" size={20} />
                          <span>Средний балл: {courses.length > 0 ? Math.round(courses.reduce((sum, c) => sum + c.averageScore, 0) / courses.length) : 0}%</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setIsEditingProfile(true);
                          setEditedProfile({ name: currentUser.name, email: currentUser.email });
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                        <span>Редактировать профиль</span>
                      </button>
                      {isEditingProfile && (
                        <div className={`mt-6 p-4 rounded-xl ${
                          theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                        }`}>
                          <h4 className="font-bold mb-3">Редактирование профиля</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium mb-1">Имя</label>
                              <input
                                type="text"
                                value={editedProfile.name}
                                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                                className={`w-full px-3 py-2 rounded-lg border ${
                                  theme === 'dark' 
                                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                                }`}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Email</label>
                              <input
                                type="email"
                                value={editedProfile.email}
                                onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                                className={`w-full px-3 py-2 rounded-lg border ${
                                  theme === 'dark' 
                                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500' 
                                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                                }`}
                              />
                            </div>
                            <div className="flex space-x-3">
                              <button
                                onClick={handleSaveProfile}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-lg transition-colors"
                              >
                                Сохранить
                              </button>
                              <button
                                onClick={() => setIsEditingProfile(false)}
                                className={`flex-1 font-medium py-2 px-3 rounded-lg transition-colors ${
                                  theme === 'dark'
                                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                }`}
                              >
                                Отмена
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="mt-6 pt-6 border-t border-gray-700">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">Темная тема</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={theme === 'dark'}
                              onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                              className="sr-only"
                            />
                            <div className={`w-11 h-6 bg-gray-200 rounded-full shadow-inner dark:bg-gray-600 transition-colors ${
                              theme === 'dark' ? 'bg-indigo-500' : ''
                            }`}></div>
                            <div className={`absolute w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                              theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                            }`}></div>
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Переключение между светлой и темной темой</p>
                      </div>
                      
                      {/* Achievements */}
                      <div className="mt-8 pt-6 border-t border-gray-700">
                        <h4 className="font-bold mb-4 flex items-center">
                          <Medal className="mr-2 text-yellow-400" size={20} />
                          Достижения
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                              <Star className="text-white" size={16} />
                            </div>
                            <div>
                              <div className="font-medium">Новичок в математике</div>
                              <div className="text-xs text-gray-400">Завершите 3 лекции по математике</div>
                            </div>
                          </div>
                          {currentUser.achievements.includes('perfect_score') && (
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <Check className="text-white" size={16} />
                              </div>
                              <div>
                                <div className="font-medium">Идеальный результат</div>
                                <div className="text-xs text-gray-400">Получите 90% или выше за лекцию</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Courses Progress */}
                  <div className="lg:col-span-2">
                    <div className={`rounded-2xl p-6 mb-6 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } shadow-xl`}>
                      <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-bold">Ваши курсы</h2>
                        <span className="text-indigo-400 font-medium">{courses.length} курсов</span>
                      </div>
                      <div className="space-y-4">
                        {courses.map((course) => (
                          <div key={course.id} className={`p-4 rounded-xl border cursor-pointer hover:-translate-y-1 transition-all ${
                            theme === 'dark' 
                              ? 'border-gray-700 hover:bg-gray-700/50' 
                              : 'border-gray-200 hover:bg-gray-50'
                          }`} onClick={() => {
                            setSelectedCourse(course);
                            setCurrentView('course-detail');
                          }}>
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getLevelColor(course.level)}`}>
                                  {course.level === 'Средний' && <GraduationCap size={20} />}
                                  {course.level === 'Продвинутый' && <Brain size={20} />}
                                  {course.level === 'Эксперт' && <Star size={20} />}
                                  {course.level === 'Начальный' && <BookOpen size={20} />}
                                </div>
                              </div>
                              <div className="ml-3 flex-grow">
                                <div className="flex justify-between">
                                  <h3 className="font-bold">{course.title}</h3>
                                  <div className="flex items-center space-x-2">
                                    {course.completed && (
                                      <CheckCircle className="text-green-400" size={18} />
                                    )}
                                    <span className={`text-xs px-2 py-1 rounded-full ${getProgressColor(course.progress)}`}>
                                      {course.progress}% завершено
                                    </span>
                                  </div>
                                </div>
                                <p className="text-gray-400 text-sm mt-1 line-clamp-1">{course.description}</p>
                                <div className="mt-3 w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all ${getProgressColor(course.progress)}`}
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                                {course.averageScore > 0 && (
                                  <div className="mt-2 flex items-center text-sm">
                                    <BarChart3 className="text-indigo-400 mr-1" size={14} />
                                    <span>Средний балл: {course.averageScore}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Statistics */}
                    <div className={`rounded-2xl p-6 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } shadow-xl`}>
                      <h2 className="text-xl font-bold mb-5">Статистика обучения</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className={`p-4 rounded-xl text-center ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                        }`}>
                          <div className="text-3xl font-bold text-indigo-400 mb-1">{courses.length}</div>
                          <div className="text-sm text-gray-400">Курсов</div>
                        </div>
                        <div className={`p-4 rounded-xl text-center ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                        }`}>
                          <div className="text-3xl font-bold text-blue-400 mb-1">
                            {courses.reduce((sum, course) => sum + course.lectures.length, 0)}
                          </div>
                          <div className="text-sm text-gray-400">Лекций</div>
                        </div>
                        <div className={`p-4 rounded-xl text-center ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                        }`}>
                          <div className="text-3xl font-bold text-green-400 mb-1">
                            {courses.reduce((sum, course) => sum + course.lectures.filter(l => l.completed).length, 0)}
                          </div>
                          <div className="text-sm text-gray-400">Завершено</div>
                        </div>
                        <div className={`p-4 rounded-xl text-center ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                        }`}>
                          <div className="text-3xl font-bold text-yellow-400 mb-1">
                            {currentUser.achievements.length}
                          </div>
                          <div className="text-sm text-gray-400">Достижений</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">Активность за неделю</span>
                            <span className="text-indigo-400">12 часов</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">Прогресс обучения</span>
                            <span className="text-indigo-400">68%</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{ width: '68%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">Качество выполнения</span>
                            <span className="text-indigo-400">85%</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className={`py-8 mt-12 border-t ${
        theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 EduMind. Бесплатная платформа для обучения. Все курсы доступны без подписки.</p>
          <p className="mt-2 text-sm">Искусственный интеллект используется только для оценки знаний и генерации материалов</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
