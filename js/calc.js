const inputValue = document.getElementById('inputValue');

document.querySelectorAll(".operators, .other-operators").forEach(function(item) {
    item.addEventListener("click", function(e) {
        const btnValue = e.target.innerText;
        let expression = inputValue.innerText;
        let lastChar = expression.slice(-1);

        if (btnValue === "=") {
            try {
                inputValue.innerText = eval(expression);
            } catch (error) {
                inputValue.innerText = "Error";
            }
        } else if (btnValue === "AC") {
            inputValue.innerText = "0";
        } else if (btnValue === "DEL") {
            if (inputValue.innerText === "Error") // Avoid error message bug
                inputValue.innerText = "0";
            else inputValue.innerText = expression.slice(0, -1) || "0";
        } else {
            if ("+-*/%√".includes(btnValue) && "+-*/%√".includes(lastChar)) {
                return; // prevent multiple operators
            }
            if (inputValue.innerText === "0") {
                inputValue.innerText = "";
            }

            if (btnValue === "√") {
              inputValue.innerText = Math.sqrt(parseFloat(expression)) || "0";
            }
            inputValue.innerText += btnValue;
        }
    });
});

document.querySelectorAll(".numbers").forEach(function(item) {
    item.addEventListener("click", function(e) {
        if (inputValue.innerText === "0") {
            inputValue.innerText = "";
        }
        inputValue.innerText += e.target.innerText.trim();
    });
});
