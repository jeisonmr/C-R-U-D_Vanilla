import './style.css'
import { RenderTable } from './components/render-table/RenderTable.ts'
import { RenderButtons } from './components/render-buttons/RenderButons.ts';

export const app = document.querySelector<HTMLDivElement>('#app');
RenderTable(app);
RenderButtons(app);


