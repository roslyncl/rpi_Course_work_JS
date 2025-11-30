import { notificationConstants } from '../mock/mock.js';

export default class NotificationModel {
  #notifications = [];
  #observers = [];

  constructor(initialNotifications = []) {
    this.#notifications = initialNotifications;
  }

  get notifications() {
    return this.#notifications;
  }

  updateNotifications(subscriptions) {
    this.#notifications = subscriptions
      .filter(sub => this.#isSubscriptionDueSoon(sub.daysUntil))
      .map(sub => ({
        id: sub.id,
        title: sub.name,
        text: `${sub.price} ${sub.due.toLowerCase()}`,
        daysUntil: sub.daysUntil,
        isUrgent: sub.daysUntil <= notificationConstants.URGENT_DAYS
      }))
      .sort((a, b) => a.daysUntil - b.daysUntil);

    this._notifyObservers();
  }

  #isSubscriptionDueSoon(daysUntil) {
    return daysUntil <= notificationConstants.DUE_SOON_DAYS;
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