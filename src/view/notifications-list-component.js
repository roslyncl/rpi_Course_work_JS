import { createElement } from '../framework/render.js';

function createNotificationsListComponentTemplate() {
    return (
        `<div class="notifications-section">
            <h2>Ближайшие платежи</h2>
            <div class="notifications-list"></div>
        </div>`
    );
}

export default class NotificationsListComponent {
    getTemplate() {
        return createNotificationsListComponentTemplate();
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