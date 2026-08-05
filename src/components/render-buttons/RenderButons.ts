import { getCurrentPage, loadNextPage, loadPreviusPage } from '../../store/user-store';
import './renderButtons.css'

export const RenderButtons = (elementID:HTMLElement) => {
  const buttonPrev = document.createElement('button');
  const buttonNext = document.createElement('button');
  const counterPage = document.createElement('span');
  buttonPrev.textContent = "Anterior"
  buttonNext.textContent = "Siguiente"

  elementID.append(buttonPrev, counterPage, buttonNext);
  counterPage.textContent = getCurrentPage().toString();

  buttonPrev.addEventListener('click', ()=> {
    loadPreviusPage();
    counterPage.textContent = getCurrentPage().toString();
  });

  buttonNext.addEventListener('click', ()=> {
    loadNextPage();
    counterPage.textContent = getCurrentPage().toString();
  })

}