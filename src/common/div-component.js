// Шаблон компонентов
export class DivComponent {
  constructor() {
    this.el = document.createElement('div');
  }

  // Рендер компонента возвращает какой-либо элемент
  // (компоненты конструируются и возвращаются),
  // а решать как ее отредерить будет рендер вьюшки (страницы),
  // т.е. main.render() или favorite.render().
  // Именно рендерингом занимается вьюшка
  render() {
    this.el;
  }
}
