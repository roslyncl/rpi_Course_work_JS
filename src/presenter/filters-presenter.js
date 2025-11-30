import FiltersComponent from '../view/filters-component.js';
import { render } from '../framework/render.js';

export default class FiltersPresenter {
  #container = null;
  #filtersModel = null;
  #filtersComponent = null;

  constructor({ container, filtersModel }) {
    this.#container = container;
    this.#filtersModel = filtersModel;
  }

  init() {
    this.#renderFilters();
    this.#setupEventHandlers();
  }

  #renderFilters() {
    this.#filtersComponent = new FiltersComponent({
      filters: this.#filtersModel.filters
    });
    render(this.#filtersComponent, this.#container);
  }

  #setupEventHandlers() {
    this.#setupFilterHandlers();
  }

  #setupFilterHandlers() {
    this.#container.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        this.#updateTypeFilters();
      }
    });

    const priceSlider = this.#container.querySelector('input[type="range"]');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        const maxPrice = parseInt(e.target.value);
        this.#filtersModel.setFilters({ maxPrice });
        
        const maxValueElement = this.#container.querySelector('.max-value');
        if (maxValueElement) {
          maxValueElement.textContent = `${maxPrice.toLocaleString('ru-RU')} ₽`;
        }
      });

      this.#updatePriceDisplay();
    }
  }

  #updateTypeFilters() {
    const checkedTypes = Array.from(this.#container.querySelectorAll('.filter-group input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.value);
    
    this.#filtersModel.setFilters({ types: checkedTypes });
  }

  #updatePriceDisplay() {
    const maxValueElement = this.#container.querySelector('.max-value');
    const priceSlider = this.#container.querySelector('input[type="range"]');
    
    if (maxValueElement && priceSlider) {
      maxValueElement.textContent = `${this.#filtersModel.getMaxPrice().toLocaleString('ru-RU')} ₽`;
      priceSlider.value = this.#filtersModel.getMaxPrice();
    }
  }
}