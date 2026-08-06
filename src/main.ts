import { userApp } from './components/user-app';
import './style.css';

export const app = document.querySelector<HTMLDivElement>('#app');

userApp(app);