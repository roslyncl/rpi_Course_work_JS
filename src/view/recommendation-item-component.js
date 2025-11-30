import { AbstractComponent } from "../framework/view/abstract-component.js";

function createRecommendationItemComponentTemplate(recommendation) {
    const { name, formattedPrice, details, category } = recommendation;
    
    return (
        `<div class="recommendation-item">
            <div class="rec-header">
                <div class="rec-category">${category}</div>
                <div class="rec-price">${formattedPrice}</div>
            </div>
            <div class="rec-name">${name}</div>
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