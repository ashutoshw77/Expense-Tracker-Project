//UI elements
balance = document.querySelector("#Balance");
money_plus = document.getElementById("money-plus");
money_minus = document.getElementById("money-minus");
list = document.getElementById("list");
form = document.getElementById("form");
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

let transactions;

//for loading previous transactions on reloading
function loadLocal() {
    let amounts=0,income=0,expense=0;
    if(localStorage.getItem('transactions') !== null){
        transactions = localStorageTransactions;
        transactions.forEach((transaction) => {
            if(transaction.amount<0) {
                expense += Math.abs(transaction.amount);
                amounts += transaction.amount;
                addTransaction(transaction);
            }else{
                income += transaction.amount;
                amounts += transaction.amount;
                addTransaction(transaction);
            }
        });
    }else {
        transactions = [];
    }
    balance.innerText = `${amounts}`;
    money_plus.innerText = `${income}`;
    money_minus.innerText = `${expense}`;
}

loadLocal();

//Add transactions
function addtrans(e) {
    e.preventDefault();
    if (text.value === "" || amount.value === "") {
        alert("Please enter Text and Amount")
    }
    else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        addTransaction(transaction);

        transactions.push(transaction);

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }

}

//geneating id
function generateID() {
    return Math.floor(Math.random() * 100000);
}

function addTransaction(transaction) {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    //get list
    const item = document.createElement('li');

    //add classes
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.id = 'item';

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removetransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);

    updatevalues(transaction);

}


//fot updating values
function updatevalues(transaction) {
    let amounts, income, expense;
    amounts = parseInt(balance.innerText) + transaction.amount;
    if (transaction.amount < 0) {
        expense = parseInt(money_minus.innerText) + Math.abs(transaction.amount);
        income = parseInt(money_plus.innerText);
    }
    else {
        income = parseInt(money_plus.innerText) + Math.abs(transaction.amount);
        expense = parseInt(money_minus.innerText);
    }

    balance.innerText = `${amounts}`;
    money_plus.innerText = `${income}`;
    money_minus.innerText = `${expense}`;
}

//for removing transactions
function removetransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    removetrans();
}

function removetrans() {
    list.innerHTML = ``;

    balance.innerText = '0';
    money_plus.innerText = '0';
    money_minus.innerText = '0';

    transactions.forEach(addTransaction);
}


// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

//event listener for submiting the form
form.addEventListener('submit', addtrans);
