import { updateUserSelected } from '../../actions/updateUserSelected';
import { addNewUser } from '../../actions/addNewUser';
import { reloadPage } from '../../store/user-store';
import { RenderTable } from '../render-table/RenderTable';
import './renderModal.css';

let form: HTMLFormElement;
let isEditMode = false; // Variable para rastrear si estamos en modo edición

export const setFormValues = ( user: any ) => {
  isEditMode = true; // Activar modo edición
  (form.querySelector('[name="id"]') as HTMLInputElement).value = user.id;
  (form.querySelector('[name="firstName"]') as HTMLInputElement).value = user.firstName;
  (form.querySelector('[name="lastName"]') as HTMLInputElement).value = user.lastName;
  (form.querySelector('[name="balance"]') as HTMLInputElement).value = user.balance;
  (form.querySelector('[name="isActive"]') as HTMLInputElement).checked = user.isActive;
}

export const resetForm = () => {
  isEditMode = false; // Activar modo creación
  (form.querySelector('[name="id"]') as HTMLInputElement).value = '';
}

export const RenderModal = (elementID: HTMLElement) => {
  
  const modalView = document.createElement('section');
  let modalForm = '';

  modalView.classList.add('modalView', 'hiddenModal');
  elementID.append(modalView);
  
  modalForm = `
  <form class="formUsers">
    <label for="name">Usuario</label>
    <input name="id" type="hidden" id="id" />
    <input name="firstName" type="text" placeholder="Nombre" id="firstName" /> 
    <input name="lastName" type="text" placeholder="Apellido" id="lastName" /> 
    <input name="balance" type="text" placeholder="Balance" id="balance" />
    
    <div>
      <input name="isActive" type="checkbox" id="isActive" />
      <span>Activo?</span>
    </div>

    <button class="btnSaveModal">Guardar</button>
  </form>
  `;
  modalView.innerHTML = modalForm;

  form = document.querySelector('.formUsers') as HTMLFormElement;

  
  modalView.addEventListener('click', (event) => {
    const showModal = document.querySelector('.modalView');
    if (event.target === showModal) {
      showModal.classList.add('hiddenModal');
    }
  });

  const btnSaveModal = document.querySelector('.btnSaveModal') as HTMLButtonElement;
  btnSaveModal.addEventListener('click', async (event) => {
    event.preventDefault();
    const id = (form.querySelector('[name="id"]') as HTMLInputElement).value;
    
    const user = {
      firstName: (form.querySelector('[name="firstName"]') as HTMLInputElement).value,
      lastName: (form.querySelector('[name="lastName"]') as HTMLInputElement).value,
      balance: parseFloat((form.querySelector('[name="balance"]') as HTMLInputElement).value),
      isActive: (form.querySelector('[name="isActive"]') as HTMLInputElement).checked,
    };

    // Validar que el formulario esté lleno
    if (!user.firstName || !user.lastName || isNaN(user.balance)) {
      alert('Por favor complete todos los campos');
      return;
    }

    if (isEditMode && id) {
      // Modo edición: actualizar usuario existente
      await updateUserSelected(Number(id), user);
    } else {
      // Modo creación: agregar nuevo usuario
      const newUser = {
        firstName: (form.querySelector('[name="firstName"]') as HTMLInputElement).value,
        lastName: (form.querySelector('[name="lastName"]') as HTMLInputElement).value,
        balance: parseFloat((form.querySelector('[name="balance"]') as HTMLInputElement).value),
        isActive: (form.querySelector('[name="isActive"]') as HTMLInputElement).checked,
      };
      await addNewUser(newUser);
    }
    
    await reloadPage();
    await RenderTable(elementID);
    modalView.classList.add('hiddenModal');
    form.reset();
    isEditMode = false; // Resetear modo después de guardar
  });
}