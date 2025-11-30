import NotificationItemComponent from '../view/notification-item-component.js';
import { render } from '../framework/render.js';
import { presenterConstants, componentConfig } from '../mock/mock.js';

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
    const notificationsSection = document.createElement(componentConfig.NOTIFICATIONS.tagName);
    notificationsSection.className = componentConfig.NOTIFICATIONS.className;
    notificationsSection.innerHTML = `<h2>${presenterConstants.TEXTS.NOTIFICATIONS_TITLE}</h2>`;
    
    const notificationsList = document.createElement('div');
    notificationsList.className = presenterConstants.CLASS_NAMES.NOTIFICATIONS_LIST;
    
    notificationsSection.appendChild(notificationsList);
    this.#container.appendChild(notificationsSection);

    const notifications = this.#subscriptionModel.getNotifications();
    
    notifications.forEach(notification => {
      const notificationComponent = new NotificationItemComponent({ notification });
      render(notificationComponent, notificationsList);
    });
  }
}