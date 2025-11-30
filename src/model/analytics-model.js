import { categoryColors } from '../mock/mock.js';

export default class AnalyticsModel {
  #analytics = {};
  #observers = [];

  constructor(initialAnalytics = {}) {
    this.#analytics = initialAnalytics;
  }

  get analytics() {
    return this.#analytics;
  }

  updateAnalytics(subscriptions) {
    const categories = {};
    
    subscriptions.forEach(sub => {
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

    const totalCost = subscriptions.reduce((sum, sub) => sum + sub.priceValue, 0);
    
    Object.values(categories).forEach(category => {
      category.percentage = Math.round((category.total / totalCost) * 100);
      category.cost = this.#formatCurrency(category.total);
    });

    this.#analytics = {
      categories: Object.values(categories),
      totalCost: this.#formatCurrency(totalCost),
      yearlyCost: this.#formatCurrency(totalCost * 12)
    };

    this._notifyObservers();
  }

  #getCategoryColor(type) {
    return categoryColors[type] || 'other';
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