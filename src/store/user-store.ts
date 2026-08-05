import { loadUsersByPage } from "../actions/loadUsersByPage";
import { RenderTable } from "../components/render-table/RenderTable";
import type { User } from "../models/user";

export interface UserStoreProps{
  currentPage:number;
  users: User[]
}

const state:UserStoreProps = {
  currentPage: 1,
  users: [],
}

export const getUsers = () => {
  return [...state.users];
}

export const getCurrentPage = () => {
  return state.currentPage;
}

export const reloadPage = async () =>{
  const users = await loadUsersByPage(state.currentPage);  
  if(users.length === 0){
    await loadPreviusPage();
    return
  }
  state.users = users;
}

export const loadNextPage = async () => {
  const data = await loadUsersByPage(state.currentPage + 1);
  
  if(data.length !== 0 ){
    state.currentPage += 1;
    state.users = data;
    RenderTable();
  }
}

export const loadPreviusPage = async () => {
  const data = await loadUsersByPage(state.currentPage - 1);
  console.log(data.length);

  if(state.currentPage === 0 ){
    return
  }
  state.currentPage -= 1;
  state.users = data;
  RenderTable();
}

export const onChangeUser = () =>{
  throw new Error('Aún no ha sido imeplementada está funcionaliad.');
}