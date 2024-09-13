import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import { Cardlist } from '../../components/cardlist/cardlist.js';
import { Pagination } from '../../components/pagination/pagination.js';

export class MainView extends AbstractView {
  // Локальный стейт
  state = {
    list: [], //получаемый массив данных
    numFound: 0, //общее количество найденных книг
    loading: false, //состояние загрузки
    searchQuery: undefined, //запрос
    offset: 0, //смещение относительно страниц
  };

  //Принимаем в конструкторе глобальный стейт переданный в app.js
  constructor(appState) {
    super();
    this.appState = appState;
    // Следим за глобальным стейтом (подписываемся на обновления объекта (стейт=объект))
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    // Следим за локальным стейтом
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle('Поиск книг');
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  appStateHook(path) {
    console.log(path);
    // если есть изменения делаем перерендер
    if (path === 'favorites') {
      this.render();
      // console.log(path);
    }
  }
  async stateHook(path) {
    if (path === 'searchQuery') {
      this.state.loading = true;
      const data = await this.loadList(
        this.state.searchQuery,
        this.state.offset
      );
      this.state.loading = false;
      // console.log(data);
      this.state.numFound = data.numFound;
      this.state.list = data.docs;
      // console.log(data.docs.length);
    }
    if (path === 'loading' || path === 'list') {
      this.render();
    }
  }

  // загрузщик
  async loadList(q, offset) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&limit=6&offset=${offset}`
    );
    return res.json();
  }

  // Основной рендер (ничего не возвращает, но обеспечивает отображение страницы)
  render() {
    const main = document.createElement('div');
    this.app.innerHTML = '';
    main.innerHTML = `<h1>Найдено книг - ${this.state.numFound}</h1>`;
    main.append(new Search(this.state).render());
    main.append(new Cardlist(this.appState, this.state).render());
    this.app.append(main);
    // вызываем функцию renderHeader() для его запуска
    this.renderHeader();
    this.renderPag();
  }
  // Рендерим Header отдельно
  renderHeader() {
    // Передаем состояние appState в Header и вызываем его метод render(),
    // для получения div элемента
    const header = new Header(this.appState).render();
    //console.log(header); //<div class='header'></div>
    this.app.prepend(header);
    // console.log(this.app); //this.app - это корневой элемент приложения <div id='root'></div>
    // вкладываем в него header
  }

  // Здесь пагинация создана не верно и неработает
  renderPag() {
    const pag = new Pagination(this.appState).render();
    this.app.append(pag);
  }
}

/*
Библиотека onChange рекурсивно следит за изменениями объекта или массива
https://www.npmjs.com/package/on-change
Следим за глобальным стейтом (подписываемся на обновления объекта (стейт=объект))
const object = onChange(object, onChange, options?)
object - Объект для наблюдения за изменениями
onChange - Функция, которая вызывается каждый раз при изменении объекта.
Функция получает четыре аргумента: onChange(path, value, previousValue, applyData)
1. Путь к значению (path = favorites, т.е. свойство объекта {favorites: []}),
которое было изменено. Изменение на c в приведенном выше примере вернет a.b.0.c.
2. Новое значение по пути.
3. Предыдущее значение по пути. Изменения в WeakSets и WeakMaps вернут undefined.
4. Объект с именем метода, который произвел изменение, аргументы, переданные методу, и результат метода.
Контекст (this) устанавливается на исходный объект, переданный onChange (с Proxy).
options - Варианты изменения поведения onChange (читай документацию)
*/
