import { createElement } from '../framework/render.js';
import AddSubscriptionBtnComponent from './add-subscription-btn-component.js';
import { render } from '../framework/render.js';

function createSubscriptionsListComponentTemplate() {
    return (
        `<div class="subscriptions-section">
            <div class="section-header">
                <h2>Мои подписки</h2>
                <div class="add-btn-container"></div>
            </div>
            <div class="subscriptions-list"></div>
        </div>`
    );
}

export default class SubscriptionsListComponent {
    getTemplate() {
        return createSubscriptionsListComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
            this.renderAddButton();
        }
        return this.element;
    }

    renderAddButton() {
        const addButtonContainer = this.element.querySelector('.add-btn-container');
        const addButtonComponent = new AddSubscriptionBtnComponent();
        render(addButtonComponent, addButtonContainer);
    }

    removeElement() {
        this.element = null;
    }
}