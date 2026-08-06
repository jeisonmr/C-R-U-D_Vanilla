import { frontendToBackend } from "../mappers/frontend-to-backend";
import { reloadPage } from "../store/user-store";

export const updateUserSelected = async (userID: number, userData: any) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${userID}`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(frontendToBackend(userData))
  });
  const updateUser = await response.json();
  await reloadPage();
  return updateUser;
};