import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class DeleteSubscriptionFormComponent extends AbstractComponent {
  #subscription = null;
  #onFormSubmit = null;
  #onFormCancel = null;

  constructor({ subscription, onFormSubmit, onFormCancel }) {
    super();
    this.#subscription = subscription;
    this.#onFormSubmit = onFormSubmit;
    this.#onFormCancel = onFormCancel;
  }

  get template() {
    return `
      <div class="modal-overlay">
        <div class="modal">
          <h2>Удаление подписки</h2>
          <div class="delete-confirmation">
            <p>Вы уверены, что хотите удалить подписку <strong>"${this.#subscription.name}"</strong>?</p>
            <div class="subscription-details">
              <div class="detail-item">
                <span>Тип:</span>
                <span>${this.#subscription.type}</span>
              </div>
              <div class="detail-item">
                <span>Стоимость:</span>
                <span>${this.#subscription.price}</span>
              </div>
              <div class="detail-item">
                <span>Следующий платеж:</span>
                <span>${this.#subscription.due}</span>
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="confirm-delete-btn delete-button">Удалить</button>
              <button type="button" class="cancel-btn">Отмена</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  afterElementCreate() {
    const confirmBtn = this.element.querySelector('.confirm-delete-btn');
    const cancelBtn = this.element.querySelector('.cancel-btn');

    confirmBtn.addEventListener('click', () => {
      this.#onFormSubmit(this.#subscription.id);
    });

    cancelBtn.addEventListener('click', () => this.#onFormCancel());
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }
}