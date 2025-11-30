import AddSubscriptionBtnComponent from './add-subscription-btn-component.js';
import { AbstractComponent } from "../framework/view/abstract-component.js";
import { render } from "../framework/render.js";

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

export default class SubscriptionsListComponent extends AbstractComponent {
    constructor() {
        super();
        this.addButtonComponent = null;
    }

    get template() {
        return createSubscriptionsListComponentTemplate();
    }

    afterElementCreate() {
        this.renderAddButton();
    }

    renderAddButton() {
        const addButtonContainer = this.element.querySelector('.add-btn-container');
        if (addButtonContainer && !this.addButtonComponent) {
            this.addButtonComponent = new AddSubscriptionBtnComponent();
            render(this.addButtonComponent, addButtonContainer);
        }
    }
}