import { MainView } from './views/main/main.js';
import { FavoritesView } from './views/favorites/favorites.js';

// Класс App отвечает за роутинг
class App {
  routes = [
    { path: '', view: MainView },
    {
      path: '#favorites',
      view: FavoritesView,
    },
  ];

  // Глобальный стейт
  appState = {
    favorites: [],
  };

  constructor() {
    // Слушаем, меняется ли хэш
    window.addEventListener('hashchange', this.route.bind(this));
    this.route();
  }

  route() {
    // удаляем предыдущую страницу
    if (this.currentView) {
      this.currentView.destroy();
    }
    // Получаем имя текущей страницы
    const view = this.routes.find((r) => r.path == location.hash).view;
    console.log(view); //получаем текущую страницу
    this.currentView = new view(this.appState); //передаем в создаваемые страницы глобальный стейт view(this.appState)
    // console.log(typeof this.currentView);
    console.dir(this.currentView); //MainView or FavoritesView
    // Выхываем метод render() полученного класса (страницы)
    this.currentView.render();
  }
}

new App();

/**
 Объект window.location можно использовать для получения адреса текущей 
 страницы (URL) и перенаправления браузера на новую страницу
 (см. картинку window.location.jpg)

 - window.location.hash устанавливает или возвращает якорную часть URL-адреса, 
 включая знак решетки (#)
 - window.location.href возвращает href (URL) текущей страницы
 - window.location.host возвращает хост (IP-адрес или домен) и порт URL
 - window.location.hostname озвращает хост (IP-адрес или домен) URL-адреса
 - window.location.pathname возвращает путь и имя файла текущей страницы
 - window.location.protocol возвращает используемый веб-протокол (http: или https:)
 - window.location.assign() загружает новый документ
 - window.location.port устанавливает или возвращает номер порта URL
 - window.location.reload() заменяет текущий документ новым
 - window.location.replace() заменяет текущий документ новым
 - window.location.search возвращает часть строки запроса URL, включая вопросительный знак (?)
 - window.location.origin возвращает протокол, имя хоста и номер порта URL
 */
