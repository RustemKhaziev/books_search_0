import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { Cardlist } from '../../components/cardlist/cardlist.js';

export class FavoritesView extends AbstractView {
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle('Избранные книги');
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  appStateHook(path) {
    console.log(path);
    if (path === 'favorites') {
      this.render();
      // console.log(path);
    }
  }

  render() {
    const main = document.createElement('div');
    main.innerHTML = `<h1>Избранные книги</h1>`;
    main.append(
      new Cardlist(this.appState, { list: this.appState.favorites }).render()
    );
    this.app.innerHTML = '';
    this.app.append(main);
    this.renderHeader();
  }
  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
