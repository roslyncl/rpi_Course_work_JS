// src/model/subscription-model.js
export default class SubscriptionModel {
  #subscriptions = [];
  #observers = [];

  constructor(initialSubscriptions = []) {
    this.#subscriptions = this.#parseSubscriptions(initialSubscriptions);
    this.#updateAllData();
  }

  // Преобразуем моковые данные в рабочий формат
  #parseSubscriptions(subscriptionsData) {
    return subscriptionsData.map(sub => ({
      ...sub,
      priceValue: parseInt(sub.price.replace(/\s₽|\D/g, '')),
      daysUntil: parseInt(sub.due.match(/\d+/)[0]),
      nextPaymentDate: this.#calculateNextPaymentDate(parseInt(sub.due.match(/\d+/)[0])),
      status: 'active'
    }));
  }

  #calculateNextPaymentDate(daysUntil) {
    const date = new Date();
    date.setDate(date.getDate() + daysUntil);
    return date;
  }

  #updateDaysUntil() {
    const today = new Date();
    this.#subscriptions.forEach(sub => {
      const timeDiff = sub.nextPaymentDate - today;
      const daysUntil = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      sub.daysUntil = daysUntil;
      sub.due = this.#formatDueText(daysUntil);
    });
  }

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

  #updateAllData() {
    this.#updateDaysUntil();
    this._notifyObservers();
  }

  // Публичные методы
  get subscriptions() {
    return this.#subscriptions;
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

  updateSubscription(subscriptionId, updatedData) {
    const subscriptionIndex = this.#subscriptions.findIndex(sub => sub.id === subscriptionId);
    
    if (subscriptionIndex === -1) {
      throw new Error('Подписка не найдена');
    }

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

    if (filters.types && filters.types.length > 0) {
      filtered = filtered.filter(sub => filters.types.includes(sub.type));
    }

    if (filters.maxPrice > 0) {
      filtered = filtered.filter(sub => sub.priceValue <= filters.maxPrice);
    }

    return filtered;
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

  // Observer pattern
  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }
}