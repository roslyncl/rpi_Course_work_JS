import { createElement } from "../render.js";

export class AbstractComponent {
  #element = null;

  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error('Can\'t instantiate AbstractComponent, only concrete one.');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
      if (typeof this.afterElementCreate === 'function') {
        this.afterElementCreate();
      }
    }
    return this.#element;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  getElement() {
    return this.element;
  }

  removeElement() {
    this.#element = null;
  }
}