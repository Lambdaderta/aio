const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_COURSES = [
  { 
    id: 1, 
    title: 'ОГЭ по математике 2026', 
    description: 'Интенсивный курс подготовки. Алгебра, Геометрия и Реальная математика.',
    level: 'Средний',
    lectures: [
      { 
        id: 101, 
        title: 'Задание 6. Числа и вычисления', 
        content: 'В этом задании проверяется умение выполнять вычисления и преобразования. \n\nОсновные правила:\n1. Порядок действий: скобки -> степени -> умножение/деление -> сложение/вычитание.\n2. Работа с дробями: приведение к общему знаменателю.',
        tasks: [
          {
            id: 1,
            type: 'numeric',
            question: 'Найдите значение выражения: (1/4 + 0.7) · 20',
            correctAnswer: '19',
            explanation: '1/4 = 0.25. Тогда 0.25 + 0.7 = 0.95. И 0.95 · 20 = 19.'
          },
          {
            id: 2,
            type: 'multiple-choice',
            question: 'Какое из чисел является иррациональным?',
            options: ['√16', '√1.6', '√0.04', '√(-4)²'],
            correctAnswer: 1,
            explanation: '√16=4 (рац), √0.04=0.2 (рац), √(-4)²=4 (рац). А вот √1.6 извлечь нацело нельзя.'
          }
        ],
        completed: false,
        score: 0
      },
      { 
        id: 102, 
        title: 'Задание 1-5. Участок и шины', 
        content: 'Практико-ориентированные задачи. Нужно внимательно читать текст условия.',
        tasks: [],
        completed: false,
        score: 0
      }
    ],
    progress: 15,
    completed: false,
    averageScore: 85
  },
  { 
    id: 2, 
    title: 'Python: Основы и Алгоритмы', 
    description: 'От Hello World до написания собственных ботов и парсеров.',
    level: 'Начальный',
    lectures: [
      { 
        id: 201, 
        title: 'Переменные и типы данных', 
        content: 'В Python динамическая типизация. \nint - целые числа\nfloat - дробные\nstr - строки\nbool - логические',
        tasks: [
           {
            id: 3,
            type: 'code',
            question: 'Напишите функцию sum_digits(n), которая возвращает сумму цифр числа n.',
            correctAnswer: 'def sum_digits(n):\n    return sum(int(d) for d in str(n))',
            explanation: 'Преобразуем число в строку, проходим по символам, превращаем обратно в int и суммируем.'
           }
        ],
        completed: true,
        score: 100
      }
    ],
    progress: 50,
    completed: false,
    averageScore: 90
  }
];

export const coursesApi = {
  getAll: async () => {
    await delay(500);
    return JSON.parse(JSON.stringify(MOCK_COURSES));
  },
  getById: async (id) => {
    await delay(200);
    return JSON.parse(JSON.stringify(MOCK_COURSES.find(c => c.id === parseInt(id))));
  }
};