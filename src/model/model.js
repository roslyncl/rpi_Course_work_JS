// src/model/model.js
import SubscriptionModel from './subscription-model.js';
import NotificationModel from './notification-model.js';
import StatsModel from './stats-model.js';
import AnalyticsModel from './analytics-model.js';
import RecommendationModel from './recommendation-model.js';

import { 
  subscriptions as initialSubscriptions, 
  notifications as initialNotifications, 
  recommendations as initialRecommendations, 
  stats as initialStats,
  analytics as initialAnalytics 
} from '../mock/mock.js';

export default class MainModel {
  #subscriptionModel = null;
  #notificationModel = null;
  #statsModel = null;
  #analyticsModel = null;
  #recommendationModel = null;
  #filtersModel = null;
  #observers = [];

  constructor(filtersModel) {
    this.#filtersModel = filtersModel;
    this.#initModels();
    this.#setupObservers();
  }

  #initModels() {
    // Передаем filtersModel в subscriptionModel
    this.#subscriptionModel = new SubscriptionModel(initialSubscriptions, this.#filtersModel);
    this.#notificationModel = new NotificationModel(initialNotifications);
    this.#statsModel = new StatsModel(initialStats);
    this.#analyticsModel = new AnalyticsModel(initialAnalytics);
    this.#recommendationModel = new RecommendationModel(initialRecommendations);

    this.#syncAllData();
  }

  #setupObservers() {
    this.#subscriptionModel.addObserver(() => this.#onSubscriptionsChange());
    // Добавляем наблюдатель для фильтров
    if (this.#filtersModel) {
      this.#filtersModel.addObserver(() => this.#onFiltersChange());
    }
  }

  #onSubscriptionsChange() {
    const subscriptions = this.#subscriptionModel.allSubscriptions;
    const categories = this.#subscriptionModel.getCategories();
    
    this.#notificationModel.updateNotifications(subscriptions);
    this.#statsModel.updateStats(subscriptions);
    this.#analyticsModel.updateAnalytics(subscriptions);
    this.#recommendationModel.updateRecommendations(subscriptions, categories);
    
    this._notifyObservers();
  }

  #onFiltersChange() {
    // При изменении фильтров уведомляем наблюдателей
    this._notifyObservers();
  }

  #syncAllData() {
    const subscriptions = this.#subscriptionModel.allSubscriptions;
    this.#notificationModel.updateNotifications(subscriptions);
    this.#statsModel.updateStats(subscriptions);
    this.#analyticsModel.updateAnalytics(subscriptions);
    this.#recommendationModel.updateRecommendations(subscriptions);
  }

  // === PUBLIC API ===

  // Subscription methods
  addSubscription(subscriptionData) {
    return this.#subscriptionModel.addSubscription(subscriptionData);
  }

  updateSubscription(subscriptionId, updatedData) {
    return this.#subscriptionModel.updateSubscription(subscriptionId, updatedData);
  }

  removeSubscription(subscriptionId) {
    return this.#subscriptionModel.removeSubscription(subscriptionId);
  }

  getSubscriptions(filters = {}) {
    // Используем встроенную фильтрацию через subscriptionModel
    return this.#subscriptionModel.subscriptions;
  }

  // Filters methods
  setFilters(filters) {
    if (this.#filtersModel) {
      this.#filtersModel.setFilters(filters);
    }
  }

  getFilters() {
    return this.#filtersModel ? this.#filtersModel.filters : {
      types: ['Стриминг', 'Музыка', 'ПО', 'Игры', 'Другое'],
      maxPrice: 5000
    };
  }

  // Getters
  getNotifications() { 
    return this.#notificationModel.notifications; 
  }

  getRecommendations() { 
    return this.#recommendationModel.recommendations; 
  }

  getStats() { 
    return this.#statsModel.stats; 
  }

  getAnalytics() { 
    return this.#analyticsModel.analytics; 
  }

  getFiltersModel() {
    return this.#filtersModel;
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