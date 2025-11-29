import { createElement } from '../framework/render.js';

function createAddSubscriptionBtnComponentTemplate() {
    return (
        `<button class="add-btn">+ Добавить подписку</button>`
    );
}

export default class AddSubscriptionBtnComponent {
    getTemplate() {
        return createAddSubscriptionBtnComponentTemplate();
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