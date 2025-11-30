import { AbstractComponent } from "../framework/view/abstract-component.js";

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

export default class NotificationItemComponent extends AbstractComponent {
    constructor({ notification }) {
        super();
        this.notification = notification;
    }

    get template() { 
        return createNotificationItemComponentTemplate(this.notification);
    }
}