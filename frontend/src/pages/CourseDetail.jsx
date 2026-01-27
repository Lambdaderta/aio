import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle, BarChart3, StopCircle, Volume2, Award, Brain, Hash, Code, Lightbulb, RefreshCw, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { coursesApi } from '../api/coursesMock';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Состояния данных
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Состояния навигации внутри курса
  const [viewMode, setViewMode] = useState('overview'); // overview, lecture, task
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Состояния выполнения заданий
  const [userAnswers, setUserAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Text to Speech
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    const loadCourse = async () => {
      const data = await coursesApi.getById(id);
      if (data) {
        setCourse(data);
      } else {
        navigate('/courses');
      }
      setLoading(false);
    };
    loadCourse();
    
    // Cleanup speech
    return () => window.speechSynthesis.cancel();
  }, [id, navigate]);

  // --- Методы для работы с задачами и лекциями ---
  
  const handleLectureSelect = (lecture) => {
    setSelectedLecture(lecture);
    setViewMode('lecture');
    window.scrollTo(0, 0);
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setViewMode('task');
    setUserAnswers({}); // Сброс ответов при открытии новой задачи
    setShowExplanation(false);
    window.scrollTo(0, 0);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleTaskAnswer = (taskId, answer, isCorrect) => {
    setUserAnswers(prev => ({
      ...prev,
      [taskId]: { answer, isCorrect }
    }));
  };

  if (loading) return <div className="p-10 text-center">Загрузка курса...</div>;
  if (!course) return null;

  // --- Рендеринг различных состояний интерфейса ---

  // 1. Обзор задания (Input)
  const renderTaskInput = () => {
    const task = selectedTask;
    const userAnswer = userAnswers[task.id]?.answer || '';

    if (task.type === 'multiple-choice') {
      return (
        <div className="space-y-3">
          {task.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleTaskAnswer(task.id, index, index === task.correctAnswer)}
              className={`w-full text-left p-4 rounded-xl border transition-colors ${
                userAnswer === index
                  ? (userAnswers[task.id]?.isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-500'
                    : 'bg-red-50 dark:bg-red-900/30 border-red-500')
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  userAnswer === index
                    ? (userAnswers[task.id]?.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                  {userAnswer === index ? (
                    userAnswers[task.id]?.isCorrect ? <Check size={14} /> : <X size={14} />
                  ) : String.fromCharCode(65 + index)}
                </div>
                <span className="text-gray-800 dark:text-gray-200">{option}</span>
              </div>
            </button>
          ))}
        </div>
      );
    }
    
    // Numeric and Code inputs are similar... (omitted for brevity, keep your original logic here)
    return <div className="text-gray-500">Тип задачи пока не поддерживается в демо</div>;
  };

  // 2. Рендер Лекции
  if (viewMode === 'lecture' && selectedLecture) {
    return (
      <div>
        <div className="flex items-center mb-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors" 
             onClick={() => setViewMode('overview')}>
          <ArrowLeft className="mr-2" size={20} />
          <span className="font-medium">Вернуться к курсу</span>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedLecture.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Лекция курса "{course.title}"</p>
            </div>
            <button
              onClick={() => isSpeaking ? stopSpeaking() : speakText(selectedLecture.content)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isSpeaking ? <StopCircle size={24} className="text-red-500" /> : <Volume2 size={24} />}
            </button>
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
              {selectedLecture.content}
            </p>
          </div>
        </div>
        
        {/* Список задач лекции */}
        {selectedLecture.tasks?.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
             <div className="border-b dark:border-gray-700 pb-4 mb-6">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white">Практические задания</h3>
             </div>
             {selectedLecture.tasks.map((task) => (
               <div
                 key={task.id}
                 onClick={() => handleTaskSelect(task)}
                 className="mb-4 p-4 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-700/50 hover:bg-indigo-50 dark:hover:bg-gray-700 border border-transparent hover:border-indigo-200 transition-all flex items-start"
               >
                 <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-3 mt-1 text-indigo-600 dark:text-indigo-400">
                   <Hash size={20} />
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900 dark:text-gray-100">{task.question}</h4>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Нажмите, чтобы решить</p>
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>
    );
  }

  // 3. Рендер Задачи
  if (viewMode === 'task' && selectedTask) {
    return (
      <div>
        <div className="flex items-center mb-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors" 
             onClick={() => setViewMode('lecture')}>
          <ArrowLeft className="mr-2" size={20} />
          <span className="font-medium">Вернуться к лекции</span>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
           <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Вопрос:</h3>
           <p className="text-lg mb-6 text-gray-800 dark:text-gray-200">{selectedTask.question}</p>
           
           {renderTaskInput()}

           <div className="flex justify-end mt-6">
              <button 
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center text-indigo-500 hover:text-indigo-600 font-medium"
              >
                <Lightbulb size={18} className="mr-2" />
                {showExplanation ? 'Скрыть объяснение' : 'Показать объяснение'}
              </button>
           </div>

           {showExplanation && selectedTask.explanation && (
             <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
               <p className="text-gray-700 dark:text-indigo-200">{selectedTask.explanation}</p>
             </div>
           )}
        </div>
      </div>
    );
  }

  // 4. Default: Обзор курса
  return (
    <div>
      <div className="flex items-center mb-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-indigo-500" onClick={() => navigate('/courses')}>
        <ArrowLeft className="mr-2" size={20} />
        <span className="font-medium">К списку курсов</span>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 mb-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              {course.level}
            </span>
            <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{course.title}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">{course.description}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center text-indigo-500 dark:text-indigo-400">
             <Brain className="mr-2" size={24} />
             <span className="font-medium">AI Tutor Active</span>
          </div>
        </div>

        {/* Прогресс бар */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-1 text-gray-600 dark:text-gray-400">
            <span>Ваш прогресс</span>
            <span>{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Список лекций */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Программа курса</h3>
          {course.lectures.map((lecture, idx) => (
            <div
              key={lecture.id}
              onClick={() => handleLectureSelect(lecture)}
              className="p-4 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-700/30 hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all shadow-sm"
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-4 text-indigo-600 dark:text-indigo-400">
                  <BookOpen size={20} />
                </div>
                <div className="flex-grow">
                   <h4 className="font-bold text-gray-900 dark:text-gray-100">
                     {idx + 1}. {lecture.title}
                   </h4>
                   <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{lecture.content}</p>
                </div>
                {lecture.completed && <CheckCircle className="text-green-500" size={20} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;