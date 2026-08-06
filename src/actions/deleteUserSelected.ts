export const deleteUserSelected = async (userID: number) => {
  const url = `${ import.meta.env.VITE_BASE_URL }/users/${userID}`;

  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el usuario');
  }
  return true;
}