const Modal = {
    open(){
        document
            .querySelector('.modal-overlay')
            .classList.add('active')
        setTimeout(() => document.querySelector('input#description').focus(), 50)
    },
    close(){
        document
            .querySelector('.modal-overlay')
            .classList.remove('active')
        document.querySelector('.button.new').focus()
    }
} 

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.querySelector('.modal-overlay.active')) Modal.close()
})

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transactions){
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    },
}

const Transaction = {
    
    all: Storage.get(), 

    add(transaction){
        Transaction.all.push(transaction)
        App.reload()//atualizar aplicação 
    },

    remove(index){
        const [removida] = Transaction.all.splice(index,1)
        App.reload()
        LT.aviso(`Transação "${removida.description}" removida.`, "info")
    },

    incomes(){
        let income = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;
            }
        })
        return income
    },

    expenses(){
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount;
            }
        })
        return expense   
    },

    total(){
        //remover das entradas o valor das saídas
        return (Transaction.incomes() + Transaction.expenses()) 
    },
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index) 
        tr.dataset.index = index
        DOM.transactionsContainer.appendChild(tr) 
    },

    innerHTMLTransaction(transaction, index) {
        const CssClass = transaction.amount > 0 ? 'income' : 'expense' 
        const amount = Utils.formatCurrency(transaction.amount)
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CssClass}">${amount}</td>
            <td class="date">${transaction.date}</td> 
            <td><button type="button" class="remover" onclick="Transaction.remove(${index})" aria-label="Remover ${transaction.description}"><img src="./assets/minus.svg" alt=""></button></td>
        ` 
        return html
    },

    updateBalance(){
        document
            .getElementById('income-display')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expense-display')
            .innerHTML = Utils.formatCurrency(Transaction.expenses()) 
        document
            .getElementById('total-display')
            .innerHTML = Utils.formatCurrency(Transaction.total()) 
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value){
        value = Number(value) * 100
        return value
    },

    formatDate(date){ 
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "" 
        value = String(value).replace(/\D/g, "") 
        value = Number(value) / 100 
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }) 
       return signal + value
    }
}

const Form = {

    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    date: document.querySelector("input#date"),

    getValues(){
        return{
            description: Form.description.value,    
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields(){//validar informações foram preenchidas
        if(!LT.validar(document.querySelector('#form form'))){
            throw new Error("")
        }
        if(Number(Form.amount.value) === 0){
            LT.marcarErro(Form.amount, "Informe um valor diferente de zero.")
            Form.amount.focus()
            throw new Error("")
        }
    },

    formatData(){//formatar dados para salvar
        let { description, amount, date } = Form.getValues()  
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date) 
        return {
            description,
            amount,
            date,
        }
    },

    saveTransaction(transaction){//salvar dados do formulário
        Transaction.add(transaction)
    },

    clearFields(){//limpar dados para o próximo preenchimento
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event){  
        event.preventDefault() 
        try{ 
            Form.validateFields()  
            const transaction = Form.formatData() 
            Form.saveTransaction(transaction)  
            Form.clearFields()
            Modal.close()//fechar modal 
            LT.aviso(transaction.amount < 0 ? "Despesa registrada." : "Entrada registrada.", "sucesso")
        }catch(error){
            if(error.message) LT.aviso(error.message, "erro")
        }
    }
}

const App = {
    init(){
        Transaction.all.forEach( DOM.addTransaction )
        if(!Transaction.all.length){
            const tr = document.createElement('tr')
            tr.innerHTML = '<td colspan="4" class="vazio">Nenhuma transação ainda. Clique em <strong>+ Nova Transação</strong> para registrar a primeira entrada ou despesa.</td>'
            DOM.transactionsContainer.appendChild(tr)
        }
        DOM.updateBalance()
        Storage.set(Transaction.all) 
    },

    reload(){
        DOM.clearTransactions()
        App.init()
    }
}

 LT.limparAoDigitar(document.querySelector('#form form'))
App.init() 
 