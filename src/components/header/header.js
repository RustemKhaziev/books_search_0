import { DivComponent } from '../../common/div-component';
import './header.css';

export class Header extends DivComponent {
  // В конструкторе принимаем состояние appState (здесь внедрение зависимостей через конструктор)
  // Dependensy Injection (DI) - внедрение зависимостей (видео 6, 3:50)
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    //  Здесь this.el = document.createElement('div') -- это создаваемый div (см. div-component.js)
    //  Добавляем класс к div
    this.el.classList.add('header');
    this.el.innerHTML = `
      <div>
         <img src='/static/logo.svg' alt='logo'/>
      </div>
      <div class='menu'>
         <a class='menu__item' href='#'>
            <img src='/static/search.svg' alt='logo search'/>
            Поиск книг
         </a>
         <a class='menu__item' href='#favorites'>
            <img src='/static/favorites.svg' alt='logo favorite'/>
            Избранное
            <div class='menu__counter'>
               ${this.appState.favorites.length}
            </div>
         </a>
      </div>
   `;
    // возврашаем div элемент с версткой
    return this.el;
  }
}
