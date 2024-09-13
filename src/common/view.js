// Шаблон страниц
export class AbstractView {
  constructor() {
    this.app = document.getElementById('root');
  }

  // Название страницы
  setTitle(title) {
    document.title = title;
  }
  render() {
    return;
  }
  destroy() {
    return;
  }
}
