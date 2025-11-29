import { 
  subscriptions, 
  notifications, 
  recommendations, 
  stats,
  analytics 
} from '../mock/mock.js';

export default class SubscriptionModel {
  #subscriptions = subscriptions;
  #notifications = notifications;
  #recommendations = recommendations;
  #stats = stats;
  #analytics = analytics;

  getSubscriptions() {
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