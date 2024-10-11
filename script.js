let names = [];
let result = {};

setTimeout(function() {
    var mainContainer = document.getElementById("main_container");
    mainContainer.classList.add("visible");
}, 200);

function addNames() {
    let inputNames = document.getElementById("names").value;
    names = inputNames.split(",").map(name => name.trim());
    
    if (names.length < 2) {
        return;
    }

    document.getElementById("form_container").style.display = "none";
    document.getElementById("expense_container").style.display = "block";

    let namesContainer = document.getElementById("names_container");
    namesContainer.innerHTML = "";
    names.forEach(name => {
        result[name] = 0;
        let button = document.createElement("button");
        button.id = name;
        button.textContent = name;
        button.classList.add("name_button");
        button.classList.toggle("selected");
        namesContainer.appendChild(button);

        button.addEventListener("click", function(event) {
            event.preventDefault();
            button.classList.toggle("selected");
        });
    });
}

function addExpense(event) {
    event.preventDefault();
    let formattedAmount = document.getElementById("expense_amount").value;
    let expenseAmount = parseInt(formattedAmount.substring(1).replace(/[.,]/g, ""));

    if (expenseAmount > 0){
        document.getElementById("expense_amount").value = "$0";

        let consumers = [];
        names.forEach(function(name) {
            button = document.getElementById(name)

            if (button.classList.contains("selected")) {
                consumers.push(name);
            }
        });

        let individualAmount = expenseAmount / consumers.length;
        consumers.forEach(function(name) {
            result[name] += individualAmount;
        });
    }
}

function showResults() {
    document.getElementById("expense_container").style.display = "none";
    let resultContainer = document.getElementById("result");
    let paragraph = document.createElement("p");

    Object.keys(result).forEach(name => {
        paragraph.innerHTML += `<div>${name}: <span style="float: right;">$${Number(result[name].toFixed(0)).toLocaleString("es-AR")}</span></div>`;
    });
    
    paragraph.innerHTML += `<hr id="line">`;

    let totalExpense = Object.values(result).reduce((acc, curr) => acc + curr, 0);
    paragraph.innerHTML += `<div>Total: <span style="float: right;">$${totalExpense.toLocaleString("es-AR")}</span></div>`;
    resultContainer.appendChild(paragraph);
}

function changeTheme(){
    document.body.classList.toggle("dark_theme");
    let theme_icon = document.getElementById("theme_icon");
    let home_icon = document.getElementById("reload_icon");

    if(document.body.classList.contains("dark_theme")){
        theme_icon.src = "images/sun.png";
        home_icon.src = "images/dark_home.png";
    } else {
        theme_icon.src = "images/moon.png";
        home_icon.src = "images/home.png";
    }
}

function formatCurrency(input) {
    let value = input.value.replace(/\D/g, "");
    let formattedValue = "$" + Number(value).toLocaleString("es-AR");
    input.value = formattedValue;
}

const darkTheme = window.matchMedia("(prefers-color-scheme: dark")
if (darkTheme.matches){
    changeTheme()
}

function reloadPage() {
    location.reload();
}