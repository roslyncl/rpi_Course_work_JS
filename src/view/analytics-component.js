import { createElement } from '../framework/render.js';

function createAnalyticsComponentTemplate(analytics) {
  const { categories, totalCost, yearlyCost, savings, budgetPercentage } = analytics;
  
  // Динамически генерируем секции для круговой диаграммы
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
                <div class="legend-color ${category.color}"></div>
                <div class="legend-text">${category.name} - ${category.cost} (${category.percentage}%)</div>
              </div>`
            ).join('')}
          </div>
        </div>

        <div class="analytics-stats">
          <div class="analytics-stat-item">
            <div class="stat-value">${totalCost || '2 450 ₽'}</div>
            <div class="stat-label">В месяц</div>
          </div>
          <div class="analytics-stat-item">
            <div class="stat-value">${yearlyCost || '29 400 ₽'}</div>
            <div class="stat-label">В год</div>
          </div>
          <div class="analytics-stat-item">
            <div class="stat-value highlight">${savings || '-1800 ₽'}</div>
            <div class="stat-label">Экономия с альтернативами</div>
          </div>
          <div class="analytics-stat-item">
            <div class="stat-value">${budgetPercentage || '18%'}</div>
            <div class="stat-label">От общего бюджета</div>
          </div>
        </div>
      </div>
    </div>`
  );
}

function generatePieSlices(categories) {
  console.log('🎨 Raw categories:', categories);
  
  if (!categories || categories.length === 0) {
    return '';
  }

  let gradientStops = [];
  let currentPercent = 0;

  categories.forEach((category, index) => {
    const percentage = category.percentage || 0;
    
    // Передаем процент для регулировки насыщенности
    const color = getCategoryColor(category.name, percentage);
    
    const startPercent = currentPercent;
    const endPercent = currentPercent + percentage;
    
    console.log(`🎨 Segment ${index}: ${category.name} ${percentage}% -> ${color}`);
    
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
  // Базовый фиолетовый в HSL
  const baseHue = 270; // Фиолетовый оттенок
  
  // Регулируем насыщенность и яркость в зависимости от процента
  const saturation = 40 + (percentage / 100) * 50; // 40% - 90%
  const lightness = 85 - (percentage / 100) * 40;  // 85% - 45% (чем больше %, тем темнее)
  
  const color = `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
  console.log(`🎨 ${categoryType} ${percentage}% -> hsl(${baseHue}, ${saturation}%, ${lightness}%)`);
  
  return color;
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