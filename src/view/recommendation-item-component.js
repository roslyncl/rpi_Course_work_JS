import { createElement } from '../framework/render.js';

function createRecommendationItemComponentTemplate(recommendation) {
    const { name, savings, details } = recommendation;
    
    return (
        `<div class="recommendation-item">
            <div class="rec-header">
                <div class="rec-name">${name}</div>
                <div class="rec-savings">${savings}</div>
            </div>
            <div class="rec-details">${details}</div>
        </div>`
    );
}

export default class RecommendationItemComponent {
    constructor({ recommendation }) {
        this.recommendation = recommendation;
    }

    getTemplate() {
        return createRecommendationItemComponentTemplate(this.recommendation);
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