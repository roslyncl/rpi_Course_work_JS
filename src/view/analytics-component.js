import { createElement } from '../framework/render.js';

function createAnalyticsComponentTemplate(analytics) {
  const { categories } = analytics;
  
  return (
    `<div class="analytics-section">
      <h2>Анализ затрат</h2>
      
      <div class="analytics-content">
        <div class="chart-container">
          <div class="pie-chart">
            <div class="chart-visual">
              <div class="pie-slice streaming" style="--percentage: 35;"></div>
              <div class="pie-slice music" style="--percentage: 15;"></div>
              <div class="pie-slice software" style="--percentage: 45;"></div>
              <div class="pie-slice other" style="--percentage: 5;"></div>
              <div class="chart-center"></div>
            </div>
            <div class="chart-title">Распределение по категориям</div>
          </div>
          
          <div class="chart-legend">
            ${categories.map(category => 
              `<div class="legend-item">
                <div class="legend-color ${category.color}"></div>
                <div class="legend-text">${category.name} - ${category.cost} (${category.percentage}%)</div>
              </div>`
            ).join('')}
          </div>
        </div>

        <div class="analytics-stats">
          <div class="analytics-stat-item">
            <div class="stat-value">2 450 ₽</div>
            <div class="stat-label">В месяц</div>
          </div>
          <div class="analytics-stat-item">
            <div class="stat-value">29 400 ₽</div>
            <div class="stat-label">В год</div>
          </div>
          <div class="analytics-stat-item">
            <div class="stat-value highlight">-1800 ₽</div>
            <div class="stat-label">Экономия с альтернативами</div>
          </div>
          <div class="analytics-stat-item">
            <div class="stat-value">18%</div>
            <div class="stat-label">От общего бюджета</div>
          </div>
        </div>
      </div>
    </div>`
  );
}

export default class AnalyticsComponent {
  constructor({ analytics }) {
    this.analytics = analytics;
  }

  getTemplate() {
    return createAnalyticsComponentTemplate(this.analytics);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}