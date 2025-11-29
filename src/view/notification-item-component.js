import { createElement } from '../framework/render.js';

function createNotificationItemComponentTemplate(notification) {
    const { title, text } = notification;
    
    return (
        `<div class="notification-item">
            <div class="notif-icon">⚠️</div>
            <div class="notif-content">
                <div class="notif-title">${title}</div>
                <div class="notif-text">${text}</div>
            </div>
        </div>`
    );
}

export default class NotificationItemComponent {
    constructor({ notification }) {
        this.notification = notification;
    }

    getTemplate() {
        return createNotificationItemComponentTemplate(this.notification);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}