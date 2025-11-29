import { createElement } from '../framework/render.js';

function createFiltersComponentTemplate() {
    return (
        `<div class="filters">
            <h2>Фильтры</h2>
            
            <div class="filter-group">
                <h3>Тип подписки</h3>
                <label><input type="checkbox" checked> Стриминг</label>
                <label><input type="checkbox" checked> Музыка</label>
                <label><input type="checkbox" checked> ПО</label>
                <label><input type="checkbox" checked> Игры</label>
                <label><input type="checkbox" checked> Другое</label>
            </div>
            
            <div class="filter-group">
                <h3>Стоимость</h3>
                <input type="range" min="0" max="5000" value="2000">
                <div class="range-values">
                    <div class="min-value">0 ₽</div>
                    <div class="max-value">5 000 ₽</div>
                </div>
            </div>
        </div>`
    );
}

export default class FiltersComponent {
    getTemplate() {
        return createFiltersComponentTemplate();
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