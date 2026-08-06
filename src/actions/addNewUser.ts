import { frontendToBackend } from "../mappers/frontend-to-backend";

export const addNewUser = async (newUser: any) => {
  const url = import.meta.env.VITE_BASE_URL + '/users';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(frontendToBackend(newUser)),
  });


  const newUserAdded = await response.json();
  return newUserAdded;
}