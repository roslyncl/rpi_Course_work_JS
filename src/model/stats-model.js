// src/model/stats-model.js
export default class StatsModel {
  #stats = {};
  #observers = [];

  constructor(initialStats = {}) {
    this.#stats = {
      totalSubscriptions: 0,
      totalCost: '0 ₽/мес',
      savings: '0 ₽/мес',
      ...initialStats
    };
  }

  get stats() {
    return this.#stats;
  }

  updateStats(subscriptions) {
    const totalSubscriptions = subscriptions.length;
    const totalMonthlyCost = subscriptions.reduce((sum, sub) => sum + sub.priceValue, 0);

    this.#stats = {
      totalSubscriptions,
      totalCost: this.#formatCurrency(totalMonthlyCost) + '/мес',
      savings: '0 ₽/мес'
    };

    this._notifyObservers();
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