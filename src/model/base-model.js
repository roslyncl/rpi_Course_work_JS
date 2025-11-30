// src/model/base-model.js
export class BaseModel {
  #data = [];

  constructor(initialData = []) {
    this.#data = initialData;
  }

  get data() {
    return this.#data;
  }

  set data(newData) {
    this.#data = newData;
  }

  add(item) {
    this.#data.push(item);
    return item;
  }

  update(id, updatedItem) {
    const index = this.#data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.#data[index] = { ...this.#data[index], ...updatedItem };
      return this.#data[index];
    }
    return null;
  }

  remove(id) {
    const index = this.#data.findIndex(item => item.id === id);
    if (index !== -1) {
      return this.#data.splice(index, 1)[0];
    }
    return null;
  }

  find(id) {
    return this.#data.find(item => item.id === id);
  }

  filter(predicate) {
    return this.#data.filter(predicate);
  }

  getAll() {
    return this.#data;
  }
}