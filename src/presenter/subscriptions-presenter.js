// src/presenter/subscriptions-presenter.js
import SubscriptionsListComponent from '../view/subscriptions-list-component.js';
import SubscriptionItemComponent from '../view/subscription-item-component.js';
import AddSubscriptionFormComponent from '../view/add-subscription-form-component.js';
import EditSubscriptionFormComponent from '../view/edit-subscription-form-component.js';
import DeleteSubscriptionFormComponent from '../view/delete-subscription-form-component.js';
import { render } from '../framework/render.js';

export default class SubscriptionsPresenter {
  #container = null;
  #subscriptionModel = null;

  #subscriptionsListComponent = null;
  #addSubscriptionFormComponent = null;
  #editSubscriptionFormComponent = null;
  #deleteSubscriptionFormComponent = null;

  constructor({ container, subscriptionModel }) {
    this.#container = container;
    this.#subscriptionModel = subscriptionModel;
  }

  init() {
    this.#renderSubscriptionsList();
    this.#renderSubscriptionItems();
    this.#renderAddSubscriptionForm();
    this.#setupEventHandlers();
  }

  #renderSubscriptionsList() {
    const subscriptions = this.#subscriptionModel.getSubscriptions();
    this.#subscriptionsListComponent = new SubscriptionsListComponent(subscriptions);
    render(this.#subscriptionsListComponent, this.#container);
  }

  #renderSubscriptionItems() {
    const subscriptionsList = this.#container.querySelector('.subscriptions-list');
    const subscriptions = this.#subscriptionModel.getSubscriptions();
    
    if (subscriptionsList) {
      subscriptionsList.innerHTML = '';
    }
    
    subscriptions.forEach(subscription => {
      const subscriptionComponent = new SubscriptionItemComponent({ 
        subscription,
        onEdit: () => this.#handleEditSubscription(subscription),
        onDelete: () => this.#handleDeleteSubscription(subscription)
      });
      render(subscriptionComponent, subscriptionsList);
    });
  }

  #renderAddSubscriptionForm() {
    this.#addSubscriptionFormComponent = new AddSubscriptionFormComponent({
      onFormSubmit: this.#handleAddSubscription.bind(this),
      onFormCancel: this.#handleFormCancel.bind(this)
    });
    
    render(this.#addSubscriptionFormComponent, document.body);
    this.#addSubscriptionFormComponent.hide();
  }

  #handleAddSubscription(subscriptionData) {
    try {
      this.#subscriptionModel.addSubscription(subscriptionData);
      this.#addSubscriptionFormComponent.hide();
    } catch (error) {
      alert('Ошибка при добавлении подписки: ' + error.message);
    }
  }

  #handleFormCancel() {
    this.#addSubscriptionFormComponent.hide();
  }

  #handleDeleteSubscription(subscription) {
    this.#showDeleteSubscriptionForm(subscription);
  }

  #handleConfirmDelete(subscriptionId) {
    try {
      this.#subscriptionModel.removeSubscription(subscriptionId);
      this.#hideDeleteForm();
    } catch (error) {
      alert('Ошибка при удалении подписки: ' + error.message);
    }
  }

  #handleEditSubscription(subscription) {
    this.#showEditSubscriptionForm(subscription);
  }

  #handleUpdateSubscription(subscriptionId, updatedData) {
    try {
      this.#subscriptionModel.updateSubscription(subscriptionId, updatedData);
      this.#hideEditForm();
    } catch (error) {
      alert('Ошибка при обновлении подписки: ' + error.message);
    }
  }

  #handleEditFormCancel() {
    this.#hideEditForm();
  }

  #handleDeleteFormCancel() {
    this.#hideDeleteForm();
  }

  #showEditSubscriptionForm(subscription) {
    if (this.#editSubscriptionFormComponent) {
      this.#hideEditForm();
    }

    this.#editSubscriptionFormComponent = new EditSubscriptionFormComponent({
      subscription: subscription,
      onFormSubmit: this.#handleUpdateSubscription.bind(this),
      onFormCancel: this.#handleEditFormCancel.bind(this)
    });
    
    render(this.#editSubscriptionFormComponent, document.body);
    this.#editSubscriptionFormComponent.show();
  }

  #showDeleteSubscriptionForm(subscription) {
    if (this.#deleteSubscriptionFormComponent) {
      this.#hideDeleteForm();
    }

    this.#deleteSubscriptionFormComponent = new DeleteSubscriptionFormComponent({
      subscription: subscription,
      onFormSubmit: this.#handleConfirmDelete.bind(this),
      onFormCancel: this.#handleDeleteFormCancel.bind(this)
    });
    
    render(this.#deleteSubscriptionFormComponent, document.body);
    this.#deleteSubscriptionFormComponent.show();
  }

  #hideEditForm() {
    if (this.#editSubscriptionFormComponent) {
      this.#editSubscriptionFormComponent.hide();
      this.#editSubscriptionFormComponent.removeElement();
      this.#editSubscriptionFormComponent = null;
    }
  }

  #hideDeleteForm() {
    if (this.#deleteSubscriptionFormComponent) {
      this.#deleteSubscriptionFormComponent.hide();
      this.#deleteSubscriptionFormComponent.removeElement();
      this.#deleteSubscriptionFormComponent = null;
    }
  }

  #setupEventHandlers() {
    const addButton = this.#container.querySelector('.add-btn');
    if (addButton) {
      addButton.addEventListener('click', () => {
        this.#addSubscriptionFormComponent.show();
      });
    }
  }
}