const inputValue = document.getElementById('inputValue');

document.querySelectorAll(".operators, .other-operators").forEach(function(item) {
    item.addEventListener("click", function(e) {
        const btnValue = e.target.innerText;
        let expression = inputValue.innerText;
        let lastChar = expression.slice(-1);

        if (btnValue === "=") {
            try {
                // Replace occurrences of √number with Math.sqrt(number)
                let safeExpression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');
                inputValue.innerText = eval(safeExpression);
            } catch (error) {
                inputValue.innerText = "Error";
            }
        } else if (btnValue === "AC") {
            inputValue.innerText = "0";
        } else if (btnValue === "DEL") {
            if (inputValue.innerText === "Error") // Avoid error message bug
                inputValue.innerText = "0";
            else inputValue.innerText = expression.slice(0, -1) || "0";
        } else if (btnValue === "+/-") {
            if (inputValue.innerText!== "0"){
                if (expression.startsWith("-")) {
                    inputValue.innerText = expression.slice(1);
                } else {
                    inputValue.innerText = "-" + expression;
                }
            }
            
        } else {
            // Prevent multiple consecutive operators, except allow "+" or "-" after "√"
            if ("+-*/%√".includes(btnValue) && "+-*/%√".includes(lastChar)) {
                // Allow "+" or "-" after "√"
                if ((lastChar === "√") && (btnValue === "+" || btnValue === "-")) {
                    // allow
                } else {
                    return; // prevent multiple operators
                }
            }
            if (inputValue.innerText === "0") {
                inputValue.innerText = "";
            }

            if (btnValue === "√") {
                // Show "√" on screen, but prevent multiple consecutive "√"
                // Allow summing and subtracting after √, but prevent multiple consecutive "√"
                if (lastChar === "√") {
                    return;
                }
                inputValue.innerText += "√";
                return; // Prevent appending another "√"
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

