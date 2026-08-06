export const frontendToBackend = (backendUser: any) => {
  const { id, balance, firstName, lastName, isActive, gender, avatar } = backendUser;
  return {
    id,
    balance,
    first_name: firstName,
    last_name: lastName,
    gender,
    isActive,
    avatar
  }
}