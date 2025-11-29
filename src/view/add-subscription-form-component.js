import { createElement } from '../framework/render.js';

function createAddSubscriptionFormComponentTemplate() {
    return (
        `<div class="add-subscription-form" style="display: none;">
            <h3>Добавить новую подписку</h3>
            <form>
                <input type="text" placeholder="Название подписки" required>
                <input type="number" placeholder="Стоимость в рублях" required>
                <input type="text" placeholder="Описание">
                <select>
                    <option value="">Выберите тип</option>
                    <option value="Стриминг">Стриминг</option>
                    <option value="Музыка">Музыка</option>
                    <option value="ПО">ПО</option>
                    <option value="Игры">Игры</option>
                    <option value="Другое">Другое</option>
                </select>
                <button type="submit">Добавить</button>
                <button type="button" class="cancel-btn">Отмена</button>
            </form>
        </div>`
    );
}

export default class AddSubscriptionFormComponent {
    getTemplate() {
        return createAddSubscriptionFormComponentTemplate();
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