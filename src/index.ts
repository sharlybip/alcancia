const bAdd = document.querySelector('#bAdd') as HTMLButtonElement; 
const inputTitle = document.querySelector('#title') as HTMLInputElement;
const inputCost = document.querySelector('#cost') as HTMLInputElement;
const inputCurrency = document.querySelector('#currency') as HTMLInputElement;

const expenses = new Expenses('USD');

bAdd?.addEventListener('click', e => {
    if (inputTitle!.value != '' && inputCost!.value != '' && isNaN(parseFloat(inputCurrency.value))) {
        const title = inputTitle.value;
        const cost: number = parseFloat(inputCost.value);
        const currency: Currency = <Currency>(inputCurrency.value);

        expenses.add({
            title: title,
            cost : {
                number: cost,
                currency: currency
            }
        })
        render();
    } else {
        alert('Completa los datos correctamente')
    }

});
const render = () =>{
    let html = '';

    expenses.getItems().forEach(item =>{
        const {id, title, cost} = item;
        const { number, currency} = cost;
        html += `
            <div class="item">
                <div><span class="currency">${currency} $</span>${number}</div>
                <div>${title}</div>
                <div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
            </div>
        `;
    });
    $('#items').innerHTML =  html;
    $('#display').innerHTML =  expenses.getTotal();

    $$('.bEliminar').forEach(bEliminar =>{
        bEliminar.addEventListener('click', e =>{
            const id = (e.target as HTMLButtonElement).getAttribute('data-id');

            expenses.remove(parseInt(id!));
            
            render();
        });
    });


}
const $ = (selector: string): HTMLElement => {
    return document.querySelector(selector) as HTMLElement;
}

const $$ = (selector: string): NodeListOf<HTMLElement> => {
    return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
}