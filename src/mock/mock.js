export const subscriptions = [
  {
    id: '1',
    name: 'Netflix',
    price: '599 ₽',
    details: 'Премиум подписка',
    type: 'Стриминг',
    due: 'Через 5 дней'
  },
  {
    id: '2',
    name: 'Spotify',
    price: '169 ₽',
    details: 'Индивидуальная подписка',
    type: 'Музыка',
    due: 'Через 12 дней'
  },
  {
    id: '3',
    name: 'YouTube Premium',
    price: '379 ₽',
    details: 'Без рекламы',
    type: 'Видео',
    due: 'Через 8 дней'
  },
  {
    id: '4',
    name: 'Adobe',
    price: '1 499 ₽',
    details: 'Все приложения',
    type: 'ПО',
    due: 'Через 3 дня'
  }
];

export const notifications = [
  {
    id: '1',
    title: 'Adobe',
    text: '1 499 ₽ через 3 дня'
  },
  {
    id: '2',
    title: 'Netflix',
    text: '599 ₽ через 5 дней'
  },
  {
    id: '3',
    title: 'YouTube Premium',
    text: '379 ₽ через 8 дней'
  }
];

export const recommendations = [
  {
    id: '1',
    name: 'Okko вместо Netflix',
    savings: '-300 ₽',
    details: 'Похожий контент, выгоднее'
  },
  {
    id: '2',
    name: 'Figma вместо Adobe',
    savings: 'Бесплатно',
    details: 'Бесплатный план для проектов'
  },
  {
    id: '3',
    name: 'Яндекс.Музыка вместо Spotify',
    savings: '-50 ₽',
    details: 'Локальный контент, дешевле'
  }
];

export const stats = {
  totalSubscriptions: 4,
  totalCost: '2 450 ₽/мес',
  savings: '1 800 ₽/мес',
  monthlyCost: '2 450 ₽',
  yearlyCost: '29 400 ₽',
  savingsWithAlternatives: '-1800 ₽',
  budgetPercentage: '18%'
};

export const analytics = {
  categories: [
    {
      name: 'Стриминг',
      cost: '599 ₽',
      percentage: 35,
      color: 'streaming'
    },
    {
      name: 'Музыка',
      cost: '169 ₽',
      percentage: 15,
      color: 'music'
    },
    {
      name: 'ПО',
      cost: '1 499 ₽',
      percentage: 45,
      color: 'software'
    },
    {
      name: 'Другое',
      cost: '379 ₽',
      percentage: 5,
      color: 'other'
    }
  ]
};

export const recommendationsData = {
  'Стриминг': [
    { name: 'Okko', avoid: ['netflix'], price: 299, details: 'Локальный контент дешевле' },
    { name: 'IVI', avoid: [], price: 199, details: 'Российские фильмы и сериалы' },
    { name: 'Start', avoid: [], price: 249, details: 'Эксклюзивные российские сериалы' }
  ],
  'Музыка': [
    { name: 'Яндекс.Музыка', avoid: ['spotify'], price: 149, details: 'Умные рекомендации и локальный контент' },
    { name: 'Apple Music', avoid: ['spotify'], price: 169, details: 'Высокое качество звука' },
    { name: 'Deezer', avoid: [], price: 219, details: 'Flow - умный плейлист' }
  ],
  'ПО': [
    { name: 'Figma Pro', avoid: ['adobe'], price: 999, details: 'Профессиональный дизайн для команд' },
    { name: 'Notion Plus', avoid: [], price: 299, details: 'Расширенные возможности для организации' },
    { name: 'Grammarly Premium', avoid: [], price: 599, details: 'Проверка грамматики и стиля' }
  ],
  'Видео': [
    { name: 'YouTube Premium через VPN', avoid: ['youtube premium'], price: 179, details: 'Тот же сервис по региональной цене' },
    { name: 'Twitch Turbo', avoid: [], price: 449, details: 'Просмотр без рекламы на Twitch' }
  ],
  'Игры': [
    { name: 'Xbox Game Pass', avoid: [], price: 499, details: 'Доступ к сотням игр за одну подписку' },
    { name: 'PlayStation Plus Essential', avoid: [], price: 599, details: 'Мультиплеер и бесплатные игры ежемесячно' },
    { name: 'Nintendo Switch Online', avoid: [], price: 299, details: 'Классические игры NES и SNES' }
  ],
  'Другое': [
    { name: 'Google One 100GB', avoid: [], price: 149, details: 'Облачное хранилище и дополнительные бонусы' },
    { name: 'ChatGPT Plus', avoid: [], price: 1699, details: 'Расширенный доступ к нейросети' },
    { name: 'Midjourney Pro', avoid: [], price: 1999, details: 'Генерация изображений без ограничений' }
  ]
};

//Константы (потом уберу)
export const filterConstants = {
  DEFAULT_TYPES: ['Стриминг', 'Музыка', 'ПО', 'Видео', 'Игры', 'Другое'],
  DEFAULT_MAX_PRICE: 5000
};

export const notificationConstants = {
  DUE_SOON_DAYS: 7,
  URGENT_DAYS: 3
};

export const categoryColors = {
  'Стриминг': 'streaming',
  'Музыка': 'music', 
  'ПО': 'software',
  'Видео': 'streaming',
  'Игры': 'other',
  'Другое': 'other'
};

export const presenterConstants = {
  CLASS_NAMES: {
    SUBSCRIPTIONS_LIST: 'subscriptions-list',
    NOTIFICATIONS_SECTION: 'notifications-section',
    NOTIFICATIONS_LIST: 'notifications-list',
    RECOMMENDATIONS_SECTION: 'recommendations-section',
    RECOMMENDATIONS_LIST: 'recommendations-list',
    HORIZONTAL_BLOCKS: 'horizontal-blocks',
    ANALYTICS_SECTION: 'analytics-section',
    ADD_BUTTON: 'add-btn',
    FILTER_GROUP: 'filter-group',
    MAX_VALUE: 'max-value'
  },
  
  TEXTS: {
    NOTIFICATIONS_TITLE: 'Ближайшие платежи',
    RECOMMENDATIONS_TITLE: 'Рекомендации',
    ADD_SUBSCRIPTION_ERROR: 'Ошибка при добавлении подписки: ',
    UPDATE_SUBSCRIPTION_ERROR: 'Ошибка при обновлении подписки: ',
    DELETE_SUBSCRIPTION_ERROR: 'Ошибка при удалении подписки: '
  },
  
  EVENT_TYPES: {
    CHANGE: 'change',
    INPUT: 'input',
    CLICK: 'click'
  },
  
  ELEMENT_TYPES: {
    CHECKBOX: 'checkbox',
    RANGE: 'range'
  }
};

export const componentConfig = {
  HEADER: {
    tagName: 'header',
    className: 'header'
  },
  FILTERS: {
    tagName: 'section',
    className: 'filters'
  },
  STATS: {
    tagName: 'section',
    className: 'stats'
  },
  SUBSCRIPTIONS: {
    tagName: 'section',
    className: 'subscriptions'
  },
  NOTIFICATIONS: {
    tagName: 'div',
    className: 'notifications-section'
  },
  RECOMMENDATIONS: {
    tagName: 'div',
    className: 'recommendations-section'
  },
  ANALYTICS: {
    tagName: 'div',
    className: 'analytics-section'
  }
};

export const componentConstants = {
  TEXTS: {
    ADD_SUBSCRIPTION: 'Добавить подписку',
    EDIT_SUBSCRIPTION: 'Редактировать подписку',
    DELETE_SUBSCRIPTION: 'Удаление подписки',
    MY_SUBSCRIPTIONS: 'Мои подписки',
    STATISTICS: 'Статистика',
    FILTERS: 'Фильтры',
    NEAREST_PAYMENTS: 'Ближайшие платежи',
    RECOMMENDATIONS: 'Рекомендации',
    COST_ANALYSIS: 'Анализ затрат',
    SUBSCRIPTION_MANAGER: 'Менеджер подписок и сервисов',
    NO_SUBSCRIPTIONS_TITLE: 'Подписок пока нет',
    NO_SUBSCRIPTIONS_TEXT: 'Добавьте свою первую подписку, чтобы начать отслеживать расходы',
    DELETE_CONFIRMATION: 'Вы уверены, что хотите удалить подписку',
    TOTAL_SUBSCRIPTIONS: 'Всего подписок:',
    TOTAL_COST: 'Общая стоимость:',
    PER_MONTH: 'В месяц',
    PER_YEAR: 'В год',
    CATEGORIES: 'Категорий',
    ALL_SUBSCRIPTIONS: 'Всего подписок',
    CATEGORY_DISTRIBUTION: 'Распределение по категориям'
  },

  FORM: {
    NAME_PLACEHOLDER: 'Название подписки *',
    PRICE_PLACEHOLDER: 'Стоимость в месяц (руб) *',
    TYPE_PLACEHOLDER: 'Выберите тип *',
    DESCRIPTION_PLACEHOLDER: 'Описание (необязательно)',
    DAYS_PLACEHOLDER: 'Через сколько дней платеж?',
    SUBSCRIPTION_TYPE: 'Тип подписки',
    COST: 'Стоимость'
  },

  SUBSCRIPTION_TYPES: [
    'Стриминг',
    'Музыка', 
    'ПО',
    'Видео',
    'Игры',
    'Другое'
  ],

  DEFAULTS: {
    DAYS_UNTIL: 30,
    MIN_PRICE: 1
  }
};