import { DivComponent } from '../../common/div-component';
import './pagination.css';

export class Pagination extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.classList.add('pagination');
    this.el.innerHTML = `
      <div class='pagination__left'>
       <buttton class='btn__pag'>
          <img src="/static/arrow_back.svg"/>
       </buttton>
       <span>Предыдущая страница</span>
      </div>
      <div class='pagination__right'>
      <span>Следующая страница</span>
        <buttton class='btn__pag'>
         <img src="/static/arrow_next.svg"/>
        </buttton>
      </div>
    `;
    return this.el;
  }
}
