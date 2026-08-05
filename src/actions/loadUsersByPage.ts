import { backendToFrontend } from "../mappers/backend-to-frontend";
import { User } from "../models/user";

/**
 * @return {API}
 */
export const loadUsersByPage = async(page: number = 1): Promise<any> => {
  const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  const users: User[] = data.map((user:User) => backendToFrontend(user));    
  return users;

}