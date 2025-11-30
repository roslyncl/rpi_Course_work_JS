import { AbstractComponent } from "../framework/view/abstract-component.js";

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

export default class RecommendationItemComponent extends AbstractComponent {
    constructor({ recommendation }) {
        super();
        this.recommendation = recommendation;
    }

    get template() { 
        return createRecommendationItemComponentTemplate(this.recommendation);
    }
}