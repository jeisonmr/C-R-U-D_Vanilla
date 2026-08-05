import { User } from "../models/user";


export const backendToFrontend = (backendUser: any): User => {
  const { id, balance, first_name, last_name, isActive, gender, avatar } = backendUser;
  
  return new User({
    id,
    balance,
    firstName: first_name,
    lastName: last_name,
    gender,
    isActive,
    avatar
  })
}