// src/presenter/presenter.js
import HeaderComponent from '../view/header-component.js';
import FiltersComponent from '../view/filters-component.js';
import StatsComponent from '../view/stats-component.js';
import SubscriptionsListComponent from '../view/subscriptions-list-component.js';
import SubscriptionItemComponent from '../view/subscription-item-component.js';
import NotificationsListComponent from '../view/notifications-list-component.js';
import NotificationItemComponent from '../view/notification-item-component.js';
import RecommendationsListComponent from '../view/recommendations-list-component.js';
import RecommendationItemComponent from '../view/recommendation-item-component.js';
import AnalyticsComponent from '../view/analytics-component.js';
import { render } from '../framework/render.js';

export default class SubscriptionPresenter {
  #headerContainer = null;
  #sidebarContainer = null;
  #mainContentContainer = null;
  #subscriptionModel = null;
  #currentFilters = {
    types: ['Стриминг', 'Музыка', 'ПО', 'Видео', 'Игры', 'Другое'],
    maxPrice: 5000
  };
  #subscriptionsListComponent = null; // Добавляем ссылку на компонент

  constructor({ 
    headerContainer, 
    sidebarContainer, 
    mainContentContainer, 
    subscriptionModel 
  }) {
    this.#headerContainer = headerContainer;
    this.#sidebarContainer = sidebarContainer;
    this.#mainContentContainer = mainContentContainer;
    this.#subscriptionModel = subscriptionModel;
  }

  init() {
    this.renderHeader();
    this.renderSidebar();
    this.renderMainContent();
  }

  renderHeader() {
    const headerComponent = new HeaderComponent();
    render(headerComponent, this.#headerContainer);
  }

  renderSidebar() {
    // Рендерим фильтры
    const filtersComponent = new FiltersComponent({
      filters: this.#currentFilters,
      onFiltersChange: this.handleFiltersChange.bind(this)
    });
    render(filtersComponent, this.#sidebarContainer);

    // Рендерим статистику
    const stats = this.#subscriptionModel.getStats();
    const statsComponent = new StatsComponent({ stats });
    render(statsComponent, this.#sidebarContainer);
  }

  renderMainContent() {
    this.#mainContentContainer.innerHTML = '';
    
    this.renderSubscriptions();
    this.renderHorizontalBlocks();
    this.renderAnalytics();
    this.setupEventHandlers();
  }

  renderSubscriptions() {
    const subscriptions = this.#subscriptionModel.getSubscriptions(this.#currentFilters);
    
    // Создаем компонент списка подписок
    this.#subscriptionsListComponent = new SubscriptionsListComponent(subscriptions);
    render(this.#subscriptionsListComponent, this.#mainContentContainer);

    // Если есть подписки - рендерим их
    if (subscriptions.length > 0) {
      this.renderSubscriptionItems();
    }
  }

  // Новый метод для рендеринга элементов подписок
  renderSubscriptionItems() {
    const subscriptionsList = this.#mainContentContainer.querySelector('.subscriptions-list');
    const subscriptions = this.#subscriptionModel.getSubscriptions(this.#currentFilters);
    
    // Очищаем список перед рендером
    subscriptionsList.innerHTML = '';
    
    subscriptions.forEach(subscription => {
      const subscriptionComponent = new SubscriptionItemComponent({ 
        subscription,
        onEdit: () => this.handleEditSubscription(subscription),
        onDelete: () => this.handleRemoveSubscription(subscription.id)
      });
      render(subscriptionComponent, subscriptionsList);
    });
  }

  renderHorizontalBlocks() {
    const horizontalBlocksContainer = document.createElement('div');
    horizontalBlocksContainer.className = 'horizontal-blocks';
    this.#mainContentContainer.appendChild(horizontalBlocksContainer);

    this.renderNotifications(horizontalBlocksContainer);
    this.renderRecommendations(horizontalBlocksContainer);
  }

  renderNotifications(container) {
    const notificationsSection = document.createElement('div');
    notificationsSection.className = 'notifications-section';
    notificationsSection.innerHTML = '<h2>Ближайшие платежи</h2>';
    
    const notificationsList = document.createElement('div');
    notificationsList.className = 'notifications-list';
    
    notificationsSection.appendChild(notificationsList);
    container.appendChild(notificationsSection);

    const notifications = this.#subscriptionModel.getNotifications();
    
    notifications.forEach(notification => {
      const notificationComponent = new NotificationItemComponent({ notification });
      render(notificationComponent, notificationsList);
    });
  }

  renderRecommendations(container) {
    const recommendationsSection = document.createElement('div');
    recommendationsSection.className = 'recommendations-section';
    recommendationsSection.innerHTML = '<h2>Рекомендации</h2>';
    
    const recommendationsList = document.createElement('div');
    recommendationsList.className = 'recommendations-list';
    
    recommendationsSection.appendChild(recommendationsList);
    container.appendChild(recommendationsSection);

    const recommendations = this.#subscriptionModel.getRecommendations();
    
    recommendations.forEach(recommendation => {
      const recommendationComponent = new RecommendationItemComponent({ recommendation });
      render(recommendationComponent, recommendationsList);
    });
  }

  renderAnalytics() {
    const analyticsSection = document.createElement('div');
    analyticsSection.className = 'analytics-section';
    this.#mainContentContainer.appendChild(analyticsSection);

    const analytics = this.#subscriptionModel.getAnalytics();
    const analyticsComponent = new AnalyticsComponent({ analytics });
    render(analyticsComponent, analyticsSection);
  }

  // === ОБРАБОТЧИКИ СОБЫТИЙ ===

  handleFiltersChange(newFilters) {
    this.#currentFilters = { ...this.#currentFilters, ...newFilters };
    this.rerenderSubscriptions();
  }

  handleAddSubscription(subscriptionData) {
    // Бизнес-логика валидации
    if (!subscriptionData.name || !subscriptionData.price || !subscriptionData.type) {
      alert('Заполните название, стоимость и тип подписки');
      return;
    }

    if (subscriptionData.price <= 0) {
      alert('Стоимость должна быть положительной');
      return;
    }

    const newSubscription = this.#subscriptionModel.addSubscription(subscriptionData);
    console.log('Добавлена подписка:', newSubscription);
    this.rerenderAll();
  }

  handleRemoveSubscription(subscriptionId) {
    if (confirm('Вы уверены, что хотите удалить эту подписку?')) {
      const success = this.#subscriptionModel.removeSubscription(subscriptionId);
      if (success) {
        this.rerenderAll();
      }
    }
  }

  handleEditSubscription(subscription) {
    // TODO: Реализовать редактирование
    console.log('Редактирование подписки:', subscription);
    alert(`Редактирование подписки "${subscription.name}" будет реализовано позже`);
  }

  setupEventHandlers() {
    this.setupAddButtonHandler();
    this.setupFilterHandlers();
  }

  setupAddButtonHandler() {
    const addButton = this.#mainContentContainer.querySelector('.add-btn');
    if (addButton) {
      addButton.addEventListener('click', () => {
        this.showAddSubscriptionForm();
      });
    }
  }

  setupFilterHandlers() {
    // Обработчики для чекбоксов фильтров
    const checkboxes = this.#sidebarContainer.querySelectorAll('.filter-group input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateTypeFilters();
      });
    });

    // Обработчик для слайдера цены
    const priceSlider = document.querySelector('input[type="range"]');
    if (priceSlider) {
      console.log('Слайдер найден!');
      
      priceSlider.addEventListener('input', (e) => {
        const maxPrice = parseInt(e.target.value);
        console.log('Слайдер изменен:', maxPrice);
        
        this.#currentFilters.maxPrice = maxPrice;
        this.rerenderSubscriptions();
        
        // Обновляем отображение цены
        const maxValueElement = document.querySelector('.max-value');
        if (maxValueElement) {
          maxValueElement.textContent = `${maxPrice} ₽`;
        }
      });

      // Инициализируем начальное значение
      const initialMaxValue = document.querySelector('.max-value');
      if (initialMaxValue) {
        initialMaxValue.textContent = `${priceSlider.value} ₽`;
      }
    } else {
      console.error('Слайдер не найден!');
    }
  }

  updateTypeFilters() {
    const checkedTypes = Array.from(this.#sidebarContainer.querySelectorAll('.filter-group input[type="checkbox"]:checked'))
      .map(checkbox => {
        const label = checkbox.parentElement.textContent.trim();
        return label;
      });
    
    this.#currentFilters.types = checkedTypes;
    this.rerenderSubscriptions();
  }

  showAddSubscriptionForm() {
    const name = prompt('Название подписки:');
    if (!name) return;

    const price = parseInt(prompt('Стоимость (руб/мес):'));
    if (!price || price <= 0) {
      alert('Введите корректную стоимость');
      return;
    }

    const type = prompt('Тип (Стриминг/Музыка/ПО/Видео/Игры/Другое):');
    if (!type) return;

    const details = prompt('Описание (необязательно):') || '';

    const daysUntil = parseInt(prompt('Через сколько дней платеж?', '30')) || 30;

    this.handleAddSubscription({
      name,
      price,
      type,
      details,
      daysUntil
    });
  }

  rerenderSubscriptions() {
    const subscriptions = this.#subscriptionModel.getSubscriptions(this.#currentFilters);
    
    if (this.#subscriptionsListComponent) {
      this.#subscriptionsListComponent.updateSubscriptions(subscriptions);
    }
    
    // Если есть подписки - рендерим их
    if (subscriptions.length > 0) {
      this.renderSubscriptionItems();
    }
  }

  rerenderAll() {
    this.#mainContentContainer.innerHTML = '';
    this.renderMainContent();
  }
}