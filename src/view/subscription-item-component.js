import { AbstractComponent } from "../framework/view/abstract-component.js";

function createSubscriptionItemComponentTemplate(subscription) {
    const { id, name, price, details, type, due } = subscription;
    
    return (
        `<div class="subscription-item" data-id="${id}">
            <div class="sub-header">
                <div class="sub-name">${name}</div>
                <div class="sub-price">${price}</div>
            </div>
            <div class="sub-details">${details}</div>
            <div class="sub-footer">
                <div class="sub-type">${type}</div>
                <div class="sub-actions">
                    <button class="edit-btn" type="button" title="Редактировать">✏️</button>
                    <button class="delete-btn" type="button" title="Удалить">🗑️</button>
                </div>
            </div>
            <div class="sub-due">${due}</div>
        </div>`
    );
}

export default class SubscriptionItemComponent extends AbstractComponent {
    constructor({ subscription, onEdit = null, onDelete = null }) {
        super();
        this.subscription = subscription;
        this.onEdit = onEdit;
        this.onDelete = onDelete;
    }

    get template() {
        return createSubscriptionItemComponentTemplate(this.subscription);
    }

    afterElementCreate() {
        this.setEventListeners();
    }

    setEventListeners() {
        const editBtn = this.element.querySelector('.edit-btn');
        const deleteBtn = this.element.querySelector('.delete-btn');
        
        if (editBtn && this.onEdit) {
            editBtn.addEventListener('click', () => this.onEdit(this.subscription));
        }
        
        if (deleteBtn && this.onDelete) {
            deleteBtn.addEventListener('click', () => this.onDelete(this.subscription.id));
        }
    }
}