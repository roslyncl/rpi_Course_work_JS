import { AbstractComponent } from "../framework/view/abstract-component.js";

function createStatsComponentTemplate(stats) {
  
  return (
    `<div class="stats">
      <h3>Статистика</h3>
      <div class="stat-item">
        <div class="stat-label">Всего подписок:</div>
        <div class="stat-value">${stats.totalSubscriptions}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Общая стоимость:</div>
        <div class="stat-value">${stats.totalCost}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Экономия:</div>
        <div class="stat-value">${stats.savings}</div>
      </div>
    </div>`
  );
}

export default class StatsComponent extends AbstractComponent {
  constructor({ stats }) {
    super();
    this.stats = stats;
  }

  get template() { 
    return createStatsComponentTemplate(this.stats);
  }
}