import { resetForm } from '../render-modal/RenderModal';
import './renderButtonModal.css';

export const RenderButtonModal = (elementID:HTMLElement) => {
  const buttonShowModal = document.createElement('button');
  
  buttonShowModal.classList.add('buttonShowModal');
  buttonShowModal.innerText = ' + '
  
  elementID.append(buttonShowModal);

  buttonShowModal.addEventListener('click', () => {
    const showModal = document.querySelector('.modalView');
    const form = document.querySelector('form');
    (form as HTMLFormElement).reset();
    resetForm(); // Activar modo creación
    showModal.classList.remove('hiddenModal');
  });
}