import { createElement } from '../framework/render.js';

function createHeaderComponentTemplate() {
    return (
        `<header>
            <h1>Менеджер подписок и сервисов</h1>
        </header>`
    );
}

export default class HeaderComponent {
    getTemplate() {
        return createHeaderComponentTemplate();
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