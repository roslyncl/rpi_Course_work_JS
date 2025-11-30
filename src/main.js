// src/main.js
import MainPresenter from './presenter/main-presenter.js';
import MainModel from './model/model.js';

document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.querySelector('.app-header');
  const sidebarContainer = document.querySelector('.sidebar-section');
  const mainContentContainer = document.querySelector('.main-content-section');

  // Проверяем контейнеры
  if (!headerContainer || !sidebarContainer || !mainContentContainer) {
    console.error('Контейнеры не найдены! Проверьте HTML структуру');
    return;
  }

  const subscriptionModel = new MainModel();
  const mainPresenter = new MainPresenter({
    headerContainer: headerContainer,
    sidebarContainer: sidebarContainer,
    mainContentContainer: mainContentContainer,
    subscriptionModel: subscriptionModel
  });

  mainPresenter.init();
});