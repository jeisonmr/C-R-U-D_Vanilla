import { getCurrentPage, loadNextPage, loadPreviusPage } from '../../store/user-store';
import { RenderTable } from '../render-table/RenderTable';
import './renderButtonsPagination.css';

export const RenderButtonsPagination = (elementID:HTMLElement) => {
  const buttonPrev = document.createElement('button');
  const buttonNext = document.createElement('button');
  const counterPage = document.createElement('span');
  const containerPagination = document.createElement('div');
  buttonPrev.textContent = "Anterior"
  buttonNext.textContent = "Siguiente"

  counterPage.innerText = (getCurrentPage().toString());
  counterPage.id = 'currentPage';

  containerPagination.append(buttonPrev, counterPage, buttonNext);
  containerPagination.classList.add('containerPagination')
  elementID.append(containerPagination);

  buttonPrev.addEventListener('click', async()=> {
    await loadPreviusPage();
    counterPage.textContent = getCurrentPage().toString();
    RenderTable( elementID );
  });

  buttonNext.addEventListener('click', async()=> {
    await loadNextPage();
    counterPage.textContent = getCurrentPage().toString();
    RenderTable( elementID );
  })

}