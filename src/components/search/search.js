import { DivComponent } from '../../common/div-component';
import './search.css';

export class Search extends DivComponent {
  // Получаем локальный стейт
  constructor(state) {
    super();
    this.state = state;
  }

  search() {
    // Берем из инпута его валуе
    const value = this.el.querySelector('input').value;
    // Обновляем стейн новым значением
    this.state.searchQuery = value;
  }

  render() {
    this.el.classList.add('search');
    this.el.innerHTML = `
      <div class='search__wrapper'>
         <input
         type='text'
         placeholder='Найти книгу или автора...'
         class='search__input'
         value='${this.state.searchQuery ? this.state.searchQuery : ''}'
         />
         <img src='/static/search.svg' alt='logo search'/>
      </div>
      <button><img src='/static/search-white.svg' alt='logo search'/></button>
   `;
    //Вызываем функцию search() в двух случаях: при нажатии кнопки поиска или при нажатии enter
    this.el
      .querySelector('button')
      .addEventListener('click', this.search.bind(this));

    this.el.querySelector('input').addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        this.search();
      }
    });
    return this.el;
  }
}
