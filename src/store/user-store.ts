import { loadUsersByPage } from "../actions/loadUsersByPage";
import type { User } from "../models/user";

export interface UserStoreProps{
  currentPage:number;
  users: User[];
  lastPage: boolean;
}

const state:UserStoreProps = {
  currentPage: 1,
  users: [],
  lastPage: false,
}

export const getUsers = () => {
  return [...state.users];
}

export const getCurrentPage = () => {
  return state.currentPage;
}

export const reloadPage = async () =>{
  const users = await loadUsersByPage(state.currentPage);  
  if(users.length === 0 && state.currentPage > 1){
    await loadPreviusPage();
    return
  }
  state.users = users;
  state.lastPage = users.length === 0;
}

export const loadNextPage = async () => {
  if(state.lastPage) return; // No hacer petición si ya estamos en la última página
  
  const nextPage = state.currentPage + 1;
  const data = await loadUsersByPage(nextPage);
  if(data.length !== 0 ){
    state.currentPage = nextPage;
    state.users = data;
    state.lastPage = false;
  } else {
    state.lastPage = true; // Marcar como última página si no hay datos
  };
}

export const loadPreviusPage = async () => {
  if(state.currentPage > 1 ){
    const prevPage = state.currentPage - 1;
    const data = await loadUsersByPage(prevPage);
    state.currentPage = prevPage;
    state.users = data;
    state.lastPage = false; // Al retroceder, ya no estamos en la última página
  }
}

export const onChangeUser = () =>{
  throw new Error('Aún no ha sido imeplementada está funcionaliad.');
}