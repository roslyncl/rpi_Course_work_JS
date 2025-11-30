// src/presenter/filters-presenter.js
import FiltersComponent from '../view/filters-component.js';
import { render } from '../framework/render.js';

export default class FiltersPresenter {
  #container = null;
  #subscriptionModel = null;
  #filtersComponent = null;

  #currentFilters = {
    types: ['Стриминг', 'Музыка', 'ПО', 'Видео', 'Игры', 'Другое'],
    maxPrice: 5000
  };

  constructor({ container, subscriptionModel }) {
    this.#container = container;
    this.#subscriptionModel = subscriptionModel;
  }

  init() {
    this.#renderFilters();
    this.#setupEventHandlers();
  }

  #renderFilters() {
    this.#filtersComponent = new FiltersComponent({
      filters: this.#currentFilters,
      onFiltersChange: this.#handleFiltersChange.bind(this)
    });
    render(this.#filtersComponent, this.#container);
  }

  #handleFiltersChange(newFilters) {
    this.#currentFilters = { ...this.#currentFilters, ...newFilters };
    this.#subscriptionModel.setFilters(this.#currentFilters);
  }

  #setupEventHandlers() {
    this.#setupFilterHandlers();
  }

  #setupFilterHandlers() {
    const checkboxes = this.#container.querySelectorAll('.filter-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.#updateTypeFilters();
      });
    });

    const priceSlider = this.#container.querySelector('input[type="range"]');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        const maxPrice = parseInt(e.target.value);
        this.#currentFilters.maxPrice = maxPrice;
        this.#subscriptionModel.setFilters(this.#currentFilters);
        
        const maxValueElement = this.#container.querySelector('.max-value');
        if (maxValueElement) {
          maxValueElement.textContent = `${maxPrice} ₽`;
        }
      });

      const initialMaxValue = this.#container.querySelector('.max-value');
      if (initialMaxValue) {
        initialMaxValue.textContent = `${priceSlider.value} ₽`;
      }
    }
  }

  #updateTypeFilters() {
    const checkedTypes = Array.from(this.#container.querySelectorAll('.filter-group input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.parentElement.textContent.trim());
    
    this.#currentFilters.types = checkedTypes;
    this.#subscriptionModel.setFilters(this.#currentFilters);
  }
}