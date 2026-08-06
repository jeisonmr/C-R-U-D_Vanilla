import { getUsers } from "../store/user-store"
import { setFormValues } from "../components/render-modal/RenderModal";

export const loadUserSelected = (userID: number) => {
  const users = getUsers();
  const user = users.find((user) => user.id === userID);
  if (user) {
    setFormValues(user);
    const showModal = document.querySelector('.modalView');
    showModal.classList.remove('hiddenModal')
  }
}