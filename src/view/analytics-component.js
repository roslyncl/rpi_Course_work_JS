// src/view/analytics-component.js
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createAnalyticsComponentTemplate(analytics) {
  const categories = analytics?.categories || [];
  const totalCost = analytics?.totalCost || '2 450 ₽';
  const yearlyCost = analytics?.yearlyCost || '29 400 ₽';
  
  const pieSlices = generatePieSlices(categories);
  
  return (
    `<div class="analytics-section">
      <h2>Анализ затрат</h2>
      
      <div class="analytics-content">
        <div class="chart-container">
          <div class="pie-chart">
            <div class="chart-visual">
              ${pieSlices}
              <div class="chart-center"></div>
            </div>
            <div class="chart-title">Распределение по категориям</div>
          </div>
          
          <div class="chart-legend">
            ${categories.map(category => 
              `<div class="legend-item">
                <div class="legend-color ${category.color || 'other'}"></div>
                <div class="legend-text">${category.name} - ${category.cost} (${category.percentage}%)</div>
              </div>`
            ).join('')}
          </div>
        </div>

        <div class="analytics-stats">
          <div class="analytics-stat-item">
            <div class="stat-value">${totalCost}</div>
            <div class="stat-label">В месяц</div>
          </div>
          <div class="analytics-stat-item">
            <div class="stat-value">${yearlyCost}</div>
            <div class="stat-label">В год</div>
          </div>
          <div class="analytics-stat-item">
            <div class="stat-value">${categories.length}</div>
            <div class="stat-label">Категорий</div>
          </div>
          <div class="analytics-stat-item">
            <div class="stat-value">${categories.reduce((sum, cat) => sum + cat.count, 0)}</div>
            <div class="stat-label">Всего подписок</div>
          </div>
        </div>
      </div>
    </div>`
  );
}

function generatePieSlices(categories) {
  if (!categories || categories.length === 0) {
    return '<div class="chart-visual"><div class="chart-center"></div></div>';
  }

  let gradientStops = [];
  let currentPercent = 0;

  categories.forEach((category) => {
    const percentage = category.percentage || 0;
    const color = getCategoryColor(category.name, percentage);
    const startPercent = currentPercent;
    const endPercent = currentPercent + percentage;
    
    gradientStops.push(`${color} ${startPercent}% ${endPercent}%`);
    currentPercent = endPercent;
  });

  const gradientString = gradientStops.join(', ');
  return `
    <div class="chart-visual" style="--chart-gradient: ${gradientString};">
      <div class="chart-center"></div>
    </div>
  `;
}

function getCategoryColor(categoryType, percentage) {
  const baseHue = 270;
  const saturation = 40 + (percentage / 100) * 50;
  const lightness = 85 - (percentage / 100) * 40;
  
  return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
}

export default class AnalyticsComponent extends AbstractComponent {
  constructor({ analytics }) {
    super();
    this.analytics = analytics || {
      categories: [],
      totalCost: '2 450 ₽',
      yearlyCost: '29 400 ₽'
    };
  }

  get template() {
    return createAnalyticsComponentTemplate(this.analytics);
  }
}