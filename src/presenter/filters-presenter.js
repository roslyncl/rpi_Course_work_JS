import FiltersComponent from '../view/filters-component.js';
import { render } from '../framework/render.js';
import { presenterConstants } from '../mock/mock.js';

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
    this.#container.addEventListener(presenterConstants.EVENT_TYPES.CHANGE, (e) => {
      if (e.target.type === presenterConstants.ELEMENT_TYPES.CHECKBOX) {
        this.#updateTypeFilters();
      }
    });

    const priceSlider = this.#container.querySelector(`input[type="${presenterConstants.ELEMENT_TYPES.RANGE}"]`);
    if (priceSlider) {
      priceSlider.addEventListener(presenterConstants.EVENT_TYPES.INPUT, (e) => {
        const maxPrice = parseInt(e.target.value);
        this.#filtersModel.setFilters({ maxPrice });
        
        const maxValueElement = this.#container.querySelector(`.${presenterConstants.CLASS_NAMES.MAX_VALUE}`);
        if (maxValueElement) {
          maxValueElement.textContent = `${maxPrice.toLocaleString('ru-RU')} ₽`;
        }
      });

      this.#updatePriceDisplay();
    }
  }

  #updateTypeFilters() {
    const checkedTypes = Array.from(this.#container.querySelectorAll(`.${presenterConstants.CLASS_NAMES.FILTER_GROUP} input[type="${presenterConstants.ELEMENT_TYPES.CHECKBOX}"]:checked`))
      .map(checkbox => checkbox.value);
    
    this.#filtersModel.setFilters({ types: checkedTypes });
  }

  #updatePriceDisplay() {
    const maxValueElement = this.#container.querySelector(`.${presenterConstants.CLASS_NAMES.MAX_VALUE}`);
    const priceSlider = this.#container.querySelector(`input[type="${presenterConstants.ELEMENT_TYPES.RANGE}"]`);
    
    if (maxValueElement && priceSlider) {
      maxValueElement.textContent = `${this.#filtersModel.getMaxPrice().toLocaleString('ru-RU')} ₽`;
      priceSlider.value = this.#filtersModel.getMaxPrice();
    }
  }
}