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