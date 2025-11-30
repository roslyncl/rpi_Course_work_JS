import { AbstractComponent } from "../framework/view/abstract-component.js";

function createRecommendationsListComponentTemplate() {
    return (
        `<div class="recommendations-section">
            <h2>Рекомендации</h2>
            <div class="recommendations-list"></div>
        </div>`
    );
}

export default class RecommendationsListComponent extends AbstractComponent {
    get template() { 
        return createRecommendationsListComponentTemplate();
    }
}