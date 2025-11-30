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
        isUrgent: sub.daysUntil <= 3
      }))
      .sort((a, b) => a.daysUntil - b.daysUntil);

    this._notifyObservers();
  }

  #isSubscriptionDueSoon(daysUntil) {
    return daysUntil <= 7;
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