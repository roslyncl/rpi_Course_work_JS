import { AbstractComponent } from "../framework/view/abstract-component.js";

function createAddSubscriptionFormComponentTemplate() {
    return (
        `<div class="add-subscription-form">
            <div class="form-content">
                <h3>Добавить подписку</h3>
                <form class="subscription-form">
                    <div class="form-group">
                        <input type="text" placeholder="Название подписки *" required class="form-input" name="name">
                    </div>
                    
                    <div class="form-group">
                        <input type="number" placeholder="Стоимость в месяц (руб) *" min="1" required class="form-input" name="price">
                    </div>
                    
                    <div class="form-group">
                        <select required class="form-input" name="type">
                            <option value="">Выберите тип *</option>
                            <option value="Стриминг">Стриминг</option>
                            <option value="Музыка">Музыка</option>
                            <option value="ПО">ПО</option>
                            <option value="Видео">Видео</option>
                            <option value="Игры">Игры</option>
                            <option value="Другое">Другое</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <input type="text" placeholder="Описание (необязательно)" class="form-input" name="details">
                    </div>
                    
                    <div class="form-group">
                        <input type="number" placeholder="Через сколько дней платеж?" value="30" min="1" class="form-input" name="daysUntil">
                    </div>
                    
                    <div class="form-buttons">
                        <button type="submit" class="submit-btn">Добавить</button>
                        <button type="button" class="cancel-btn">Отмена</button>
                    </div>
                </form>
            </div>
        </div>`
    );
}

export default class AddSubscriptionFormComponent extends AbstractComponent {
    constructor({ onFormSubmit, onFormCancel }) {
        super();
        this._callback = {
            formSubmit: onFormSubmit,
            formCancel: onFormCancel
        };
    }

    get template() { 
        return createAddSubscriptionFormComponentTemplate();
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

        this._callback.formSubmit(subscriptionData);
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