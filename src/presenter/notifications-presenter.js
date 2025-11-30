import NotificationItemComponent from '../view/notification-item-component.js';
import { render } from '../framework/render.js';

export default class NotificationsPresenter {
  #container = null;
  #subscriptionModel = null;

  constructor({ container, subscriptionModel }) {
    this.#container = container;
    this.#subscriptionModel = subscriptionModel;
  }

  init() {
    this.#renderNotifications();
  }

  #renderNotifications() {
    const notificationsSection = document.createElement('div');
    notificationsSection.className = 'notifications-section';
    notificationsSection.innerHTML = '<h2>Ближайшие платежи</h2>';
    
    const notificationsList = document.createElement('div');
    notificationsList.className = 'notifications-list';
    
    notificationsSection.appendChild(notificationsList);
    this.#container.appendChild(notificationsSection);

    const notifications = this.#subscriptionModel.getNotifications();
    
    notifications.forEach(notification => {
      const notificationComponent = new NotificationItemComponent({ notification });
      render(notificationComponent, notificationsList);
    });
  }
}