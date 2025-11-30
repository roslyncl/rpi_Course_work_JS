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

function createEmptyStateTemplate() {
    return (
        `<div class="empty-state">
            <div class="empty-state-title">Подписок пока нет</div>
            <div class="empty-state-text">Добавьте свою первую подписку, чтобы начать отслеживать расходы</div>
        </div>`
    );
}

export default class SubscriptionsListComponent extends AbstractComponent {
    constructor(subscriptions = []) {
        super();
        this.addButtonComponent = null;
        this.subscriptions = subscriptions;
    }

    get template() {
        return createSubscriptionsListComponentTemplate();
    }

    afterElementCreate() {
        this.renderAddButton();
        this.renderSubscriptionsList();
    }

    // В subscriptions-list-component.js должен быть такой код для рендера кнопки
    renderAddButton() {
        const addButtonContainer = this.element.querySelector('.add-btn-container');
        if (addButtonContainer && !this.addButtonComponent) {
            this.addButtonComponent = new AddSubscriptionBtnComponent();
            render(this.addButtonComponent, addButtonContainer);
        }
    }

    renderSubscriptionsList() {
        const subscriptionsList = this.element.querySelector('.subscriptions-list');
        
        if (this.subscriptions.length === 0) {
            subscriptionsList.innerHTML = createEmptyStateTemplate();
        } else {
            // Здесь будет рендеринг подписок (через presenter)
            subscriptionsList.innerHTML = ''; // Очищаем для будущих подписок
        }
    }

    updateSubscriptions(subscriptions) {
        this.subscriptions = subscriptions;
        this.renderSubscriptionsList();
    }

    removeElement() {
        if (this.addButtonComponent) {
            this.addButtonComponent.removeElement();
            this.addButtonComponent = null;
        }
        super.removeElement();
    }
}