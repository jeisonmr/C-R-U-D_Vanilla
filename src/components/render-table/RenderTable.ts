import { getUsers, reloadPage } from '../../store/user-store';
import './renderTable.css';

let table:HTMLElement;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');
    tableHeader.innerHTML = `
              <tr>
                  <th>#ID</th>
                  <th>Balance</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Activo</th>
                  <th>Acción</th>
              </tr>
          `;

    table.append(tableHeader, tableBody);
    return table;
}


export const RenderTable = async (elementID?: HTMLElement) => {
    
    await reloadPage();
    const users = getUsers();

    if(!table){
        table = createTable();
        elementID.append(table);
    }


    let tableBodyHTML:string = '';
    users.forEach(user => {
        tableBodyHTML +=
            `
        <tr>
            <td>${user.id}</td>
            <td>${user.balance}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.isActive}</td>
            <td>
                <a href="#/" data-id="${user.id}">Seleccionar</a>
                |
                <a href="#/" data-id="${user.id}">Eliminar</a>
            </td>
        </tr>
        `
    });
    table.querySelector('tbody').innerHTML = tableBodyHTML;
};