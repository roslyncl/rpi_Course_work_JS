import { createElement } from '../framework/render.js';

function createRecommendationsListComponentTemplate() {
    return (
        `<div class="recommendations-section">
            <h2>Рекомендации</h2>
            <div class="recommendations-list"></div>
        </div>`
    );
}

export default class RecommendationsListComponent {
    getTemplate() {
        return createRecommendationsListComponentTemplate();
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