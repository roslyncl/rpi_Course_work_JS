import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFiltersComponentTemplate(filters) {
    const { types, maxPrice } = filters;
    
    return (
        `<div class="filters">
            <h2>Фильтры</h2>
            
            <div class="filter-group">
                <h3>Тип подписки</h3>
                ${types.map(type => `
                    <label><input type="checkbox" value="${type}" checked> ${type}</label>
                `).join('')}
            </div>
            
            <div class="filter-group">
                <h3>Стоимость</h3>
                <input type="range" min="0" max="5000" value="${maxPrice}">
                <div class="range-values">
                    <div class="min-value">0 ₽</div>
                    <div class="max-value">${maxPrice.toLocaleString('ru-RU')} ₽</div>
                </div>
            </div>
        </div>`
    );
}

export default class FiltersComponent extends AbstractComponent {
    #filters = null;

    constructor({ filters }) {
        super();
        this.#filters = filters;
    }

    get template() { 
        return createFiltersComponentTemplate(this.#filters);
    }
}