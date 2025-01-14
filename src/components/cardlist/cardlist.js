import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card.js';
import './cardlist.css';

export class Cardlist extends DivComponent {
  constructor(appState, parentState) {
    super();
    this.appState = appState;
    this.parentState = parentState;
  }

  render() {
    if (this.parentState.loading) {
      this.el.innerHTML = `<div class='cardlist__loader'>Loading...</div>`;
      return this.el;
    }

    const cardGrid = document.createElement('div');
    cardGrid.classList.add('card_grid');
    this.el.append(cardGrid);

    for (const card of this.parentState.list) {
      cardGrid.append(new Card(this.appState, card).render());
    }

    return this.el;
  }
}

