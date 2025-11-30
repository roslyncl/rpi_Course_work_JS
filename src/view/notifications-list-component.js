import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNotificationsListComponentTemplate() {
    return (
        `<div class="notifications-section">
            <h2>Ближайшие платежи</h2>
            <div class="notifications-list"></div>
        </div>`
    );
}

export default class NotificationsListComponent extends AbstractComponent {
    get template() {
        return createNotificationsListComponentTemplate();
    }
}