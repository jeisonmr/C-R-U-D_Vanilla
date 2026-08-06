import { RenderButtonModal } from "./render-button-modal/RenderButtonModal";
import { RenderButtonsPagination } from "./render-buttons-pagination/RenderButonsPagination";
import { RenderModal } from "./render-modal/RenderModal";
import { RenderTable } from "./render-table/RenderTable";

export const userApp = async (elementID:HTMLElement) =>{
  await RenderTable(elementID);
  RenderButtonsPagination(elementID);
  RenderButtonModal(elementID);
  RenderModal(elementID);
}
