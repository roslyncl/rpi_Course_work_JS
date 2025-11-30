import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEditSubscriptionFormComponentTemplate(subscription) {
    const { name, price, type, details, daysUntil } = subscription;
    
    return (
        `<div class="edit-subscription-form">
            <div class="form-content">
                <h3>Редактировать подписку</h3>
                <form class="subscription-form">
                    <div class="form-group">
                        <input type="text" placeholder="Название подписки *" required class="form-input" name="name" value="${name}">
                    </div>
                    
                    <div class="form-group">
                        <input type="number" placeholder="Стоимость в месяц (руб) *" min="1" required class="form-input" name="price" value="${parseInt(price)}">
                    </div>
                    
                    <div class="form-group">
                        <select required class="form-input" name="type">
                            <option value="">Выберите тип *</option>
                            <option value="Стриминг" ${type === 'Стриминг' ? 'selected' : ''}>Стриминг</option>
                            <option value="Музыка" ${type === 'Музыка' ? 'selected' : ''}>Музыка</option>
                            <option value="ПО" ${type === 'ПО' ? 'selected' : ''}>ПО</option>
                            <option value="Видео" ${type === 'Видео' ? 'selected' : ''}>Видео</option>
                            <option value="Игры" ${type === 'Игры' ? 'selected' : ''}>Игры</option>
                            <option value="Другое" ${type === 'Другое' ? 'selected' : ''}>Другое</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <input type="text" placeholder="Описание (необязательно)" class="form-input" name="details" value="${details || ''}">
                    </div>
                    
                    <div class="form-group">
                        <input type="number" placeholder="Через сколько дней платеж?" value="${daysUntil}" min="1" class="form-input" name="daysUntil">
                    </div>
                    
                    <div class="form-buttons">
                        <button type="submit" class="submit-btn">Сохранить</button>
                        <button type="button" class="cancel-btn">Отмена</button>
                    </div>
                </form>
            </div>
        </div>`
    );
}

export default class EditSubscriptionFormComponent extends AbstractComponent {
    constructor({ subscription, onFormSubmit, onFormCancel }) {
        super();
        this.subscription = subscription;
        this._callback = {
            formSubmit: onFormSubmit,
            formCancel: onFormCancel
        };
    }

    get template() { 
        return createEditSubscriptionFormComponentTemplate(this.subscription);
    }

    afterElementCreate() {
        this.setEventListeners();
    }

    setEventListeners() {
        const form = this.element.querySelector('.subscription-form');
        const cancelBtn = this.element.querySelector('.cancel-btn');

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(form);
        });

        cancelBtn.addEventListener('click', () => {
            this._callback.formCancel();
        });

        this.element.addEventListener('click', (evt) => {
            if (evt.target === this.element) {
                this._callback.formCancel();
            }
        });
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        
        const subscriptionData = {
            name: formData.get('name').trim(),
            price: parseInt(formData.get('price')),
            type: formData.get('type'),
            details: formData.get('details').trim(),
            daysUntil: parseInt(formData.get('daysUntil')) || 30
        };

        if (!subscriptionData.name) {
            alert('Введите название подписки');
            return;
        }

        if (!subscriptionData.price || subscriptionData.price <= 0) {
            alert('Введите корректную стоимость');
            return;
        }

        if (!subscriptionData.type) {
            alert('Выберите тип подписки');
            return;
        }

        this._callback.formSubmit(this.subscription.id, subscriptionData);
    }

    show() {
        this.element.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.element.classList.remove('active');
        document.body.style.overflow = '';
    }
}