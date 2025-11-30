// src/model/model.js
import { 
  subscriptions as initialSubscriptions, 
  notifications as initialNotifications, 
  recommendations as initialRecommendations, 
  stats as initialStats,
  analytics as initialAnalytics 
} from '../mock/mock.js';

export default class SubscriptionModel {
  #subscriptions = [];
  #notifications = [];
  #recommendations = [];
  #stats = {};
  #analytics = {};

  constructor() {
    // Инициализируем данные из моков и добавляем бизнес-логику
    this.#subscriptions = this.#parseSubscriptions(initialSubscriptions);
    this.#updateAllData();
  }

  // Преобразуем моковые данные в рабочий формат с вычисляемыми полями
  #parseSubscriptions(subscriptionsData) {
    return subscriptionsData.map(sub => ({
      ...sub,
      priceValue: parseInt(sub.price.replace(/\s₽|\D/g, '')), // Числовое значение для расчетов
      daysUntil: parseInt(sub.due.match(/\d+/)[0]), // Извлекаем число из "Через X дней"
      nextPaymentDate: this.#calculateNextPaymentDate(parseInt(sub.due.match(/\d+/)[0])),
      status: 'active'
    }));
  }

  // Бизнес-логика: расчет даты следующего платежа
  #calculateNextPaymentDate(daysUntil) {
    const date = new Date();
    date.setDate(date.getDate() + daysUntil);
    return date;
  }

  // Бизнес-логика: обновление дней до платежа (каждый день)
  #updateDaysUntil() {
    const today = new Date();
    this.#subscriptions.forEach(sub => {
      const timeDiff = sub.nextPaymentDate - today;
      const daysUntil = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      sub.daysUntil = daysUntil;
      sub.due = this.#formatDueText(daysUntil);
    });
  }

  // Бизнес-логика: форматирование текста
  #formatDueText(days) {
    if (days === 0) return 'Сегодня';
    if (days === 1) return 'Завтра';
    if (days < 0) return `Просрочено на ${Math.abs(days)} дней`;
    return `Через ${days} ${this.#getDayText(days)}`;
  }

  #getDayText(days) {
    const lastDigit = days % 10;
    const lastTwoDigits = days % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'дней';
    if (lastDigit === 1) return 'день';
    if (lastDigit >= 2 && lastDigit <= 4) return 'дня';
    return 'дней';
  }

  // Бизнес-логика: проверка на ближайшее истечение (< 7 дней)
  #isSubscriptionDueSoon(daysUntil) {
    return daysUntil <= 7;
  }

  // Основная бизнес-логика: обновление всех данных
  #updateAllData() {
    this.#updateDaysUntil();
    this.#updateNotifications();
    this.#updateStats();
    this.#updateAnalytics();
    this.#updateRecommendations();
  }

  #updateNotifications() {
    this.#notifications = this.#subscriptions
      .filter(sub => this.#isSubscriptionDueSoon(sub.daysUntil))
      .map(sub => ({
        id: sub.id,
        title: sub.name,
        text: `${sub.price} ${sub.due.toLowerCase()}`,
        daysUntil: sub.daysUntil,
        isUrgent: sub.daysUntil <= 3
      }))
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }

#updateStats() {
  const totalSubscriptions = this.#subscriptions.length;
  

  
  const totalMonthlyCost = this.#subscriptions.reduce((sum, sub) => {
    return sum + sub.priceValue;
  }, 0);
  

  this.#stats = {
    totalSubscriptions,
    totalCost: this.#formatCurrency(totalMonthlyCost) + '/мес',
    savings: '0 ₽/мес'
  };
}

  #calculatePotentialSavings() {
    return this.#recommendations.reduce((total, rec) => {
      if (rec.savingsValue < 0) {
        return total + rec.savingsValue;
      }
      return total;
    }, 0);
  }

  #updateAnalytics() {
    const categories = {};
    
    // Группируем по категориям для аналитики
    this.#subscriptions.forEach(sub => {
      if (!categories[sub.type]) {
        categories[sub.type] = { 
          total: 0, 
          count: 0,
          name: sub.type,
          color: this.#getCategoryColor(sub.type)
        };
      }
      categories[sub.type].total += sub.priceValue;
      categories[sub.type].count += 1;
    });

    const totalCost = this.#subscriptions.reduce((sum, sub) => sum + sub.priceValue, 0);
    
    // Рассчитываем проценты для круговой диаграммы
    Object.values(categories).forEach(category => {
      category.percentage = Math.round((category.total / totalCost) * 100);
      category.cost = this.#formatCurrency(category.total);
    });

    this.#analytics = {
      categories: Object.values(categories),
      totalCost: this.#formatCurrency(totalCost),
      yearlyCost: this.#formatCurrency(totalCost * 12)
    };
  }

  #getCategoryColor(type) {
    const colorMap = {
      'Стриминг': 'streaming',
      'Музыка': 'music', 
      'ПО': 'software',
      'Видео': 'streaming',
      'Игры': 'other',
      'Другое': 'other'
    };
    return colorMap[type] || 'other';
  }

  #updateRecommendations() {
    this.#recommendations = this.#subscriptions.map(sub => {
      let recommendation = null;
      
      // Бизнес-логика: умные рекомендации по экономии
      switch(sub.name.toLowerCase()) {
        case 'netflix':
          recommendation = {
            id: `rec-${sub.id}`,
            name: 'Okko вместо Netflix',
            savings: '-300 ₽',
            savingsValue: -300,
            details: 'Похожий контент, выгоднее',
            originalSubscription: sub.name
          };
          break;
        case 'adobe':
          recommendation = {
            id: `rec-${sub.id}`,
            name: 'Figma вместо Adobe',
            savings: 'Бесплатно',
            savingsValue: -1499,
            details: 'Бесплатный план для проектов',
            originalSubscription: sub.name
          };
          break;
        case 'spotify':
          recommendation = {
            id: `rec-${sub.id}`,
            name: 'Яндекс.Музыка вместо Spotify',
            savings: '-50 ₽',
            savingsValue: -50,
            details: 'Локальный контент, дешевле',
            originalSubscription: sub.name
          };
          break;
        case 'youtube premium':
          recommendation = {
            id: `rec-${sub.id}`,
            name: 'Браузер с блокировщиком рекламы',
            savings: '-379 ₽', 
            savingsValue: -379,
            details: 'Бесплатный просмотр без рекламы',
            originalSubscription: sub.name
          };
          break;
        default:
          return null;
      }

      return recommendation;
    }).filter(rec => rec !== null);
  }

  #formatCurrency(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return '0 ₽';
    }
    
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount).replace(',00', '');
  }


  addSubscription(subscriptionData) {
    const newSubscription = {
      id: Date.now().toString(),
      ...subscriptionData,
      priceValue: parseInt(subscriptionData.price),
      price: this.#formatCurrency(parseInt(subscriptionData.price)),
      daysUntil: parseInt(subscriptionData.daysUntil) || 30,
      due: this.#formatDueText(parseInt(subscriptionData.daysUntil) || 30),
      nextPaymentDate: this.#calculateNextPaymentDate(parseInt(subscriptionData.daysUntil) || 30),
      status: 'active'
    };

    this.#subscriptions.push(newSubscription);
    this.#updateAllData();
    return newSubscription;
  }

  // src/model/model.js - добавим метод updateSubscription

  // В класс SubscriptionModel добавляем:
  updateSubscription(subscriptionId, updatedData) {
      const subscriptionIndex = this.#subscriptions.findIndex(sub => sub.id === subscriptionId);
      
      if (subscriptionIndex === -1) {
          throw new Error('Подписка не найдена');
      }

      // Обновляем данные подписки
      this.#subscriptions[subscriptionIndex] = {
          ...this.#subscriptions[subscriptionIndex],
          ...updatedData,
          priceValue: parseInt(updatedData.price),
          price: this.#formatCurrency(parseInt(updatedData.price)),
          daysUntil: parseInt(updatedData.daysUntil) || 30,
          due: this.#formatDueText(parseInt(updatedData.daysUntil) || 30),
          nextPaymentDate: this.#calculateNextPaymentDate(parseInt(updatedData.daysUntil) || 30)
      };

      this.#updateAllData();
      return this.#subscriptions[subscriptionIndex];
  }

  removeSubscription(subscriptionId) {
    const index = this.#subscriptions.findIndex(sub => sub.id === subscriptionId);
    if (index !== -1) {
      this.#subscriptions.splice(index, 1);
      this.#updateAllData();
      return true;
    }
    return false;
  }

  filterSubscriptions(filters = {}) {
    let filtered = [...this.#subscriptions];

    // Фильтр по типам
    if (filters.types && filters.types.length > 0) {
      filtered = filtered.filter(sub => filters.types.includes(sub.type));
    }

    // Фильтр по цене (только если maxPrice > 0)
    if (filters.maxPrice > 0) {
      filtered = filtered.filter(sub => sub.priceValue <= filters.maxPrice);
    }
    // Если maxPrice = 0, показываем все подписки

    return filtered;
  }

  // Геттеры (совместимые с текущей структурой)
  getSubscriptions(filters = {}) {
    if (Object.keys(filters).length > 0) {
      return this.filterSubscriptions(filters);
    }
    return this.#subscriptions;
  }

  getNotifications() { 
    return this.#notifications; 
  }

  getRecommendations() { 
    return this.#recommendations; 
  }

  getStats() { 
    return this.#stats; 
  }

  getAnalytics() { 
    return this.#analytics; 
  }
}