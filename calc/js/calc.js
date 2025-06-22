const inputValue = document.getElementById('inputValue');

let justEvaluated = false;

document.querySelectorAll(".operators, .other-operators").forEach(function(item) {
    item.addEventListener("click", function(e) {
        const btnValue = e.target.innerText.trim();
        let expression = inputValue.value;
        let lastChar = expression.slice(-1);

        switch (btnValue) {
            case "=":
                try {
                    let safeExpr = expression
                        .replace(/√(\([^()]*\)|\d+(\.\d+)?)/g, match => {
                            const value = match.slice(1);
                            return `Math.sqrt(${value})`;
                        })
                        .replace(/(\([^()]*\)|\d+(\.\d+)?)²/g, match => {
                            const value = match.slice(0, -1);
                            return `Math.pow(${value}, 2)`;
                        });

                    let result = Function('"use strict"; return (' + safeExpr + ')')();
                    inputValue.value = result;
                    justEvaluated = true;
                } catch (error) {
                    inputValue.value = "Error";
                    justEvaluated = true;
                }
                break;

            case "AC":
                inputValue.value = "0";
                justEvaluated = false;
                break;

            case "DEL":
            case "⌫":
                expression = inputValue.value;
                if (
                    expression === "" ||
                    expression === "Error" ||
                    expression === "NaN" ||
                    expression === "0"
                ) {
                    inputValue.value = "0";
                } else {
                    let newText = expression.slice(0, -1);
                    inputValue.value = newText === "" ? "0" : newText;
                }
                justEvaluated = false;
                break;

            case "1/x":
                try {
                    let value = parseFloat(expression);
                    if (!isNaN(value) && value !== 0) {
                        inputValue.value = 1 / value;
                    } else {
                        inputValue.value = "Error";
                    }
                    justEvaluated = true;
                } catch (error) {
                    inputValue.value = "Error";
                    justEvaluated = true;
                }
                break;

            case "x²":
                try {
                    let value = parseFloat(expression);
                    if (!isNaN(value)) {
                        inputValue.value = value * value;
                    } else {
                        inputValue.value = "Error";
                    }
                    justEvaluated = true;
                } catch (error) {
                    inputValue.value = "Error";
                    justEvaluated = true;
                }
                break;

            default:
                if (justEvaluated) {
                    if (!isNaN(btnValue) || btnValue === "√" || btnValue === "x²" || btnValue === "1/x") {
                        if (btnValue === "x²") {
                            inputValue.value = inputValue.value + "²";
                        } else if (btnValue === "√") {
                            inputValue.value = "√";
                        } else {
                            inputValue.value = btnValue;
                        }
                    } else {
                        inputValue.value += btnValue;
                    }
                    justEvaluated = false;
                    return;
                }

                if ("+-*/".includes(btnValue) && "+-*/".includes(lastChar)) {
                    return;
                }

                if (inputValue.value === "0") {
                    inputValue.value = "";
                }

                inputValue.value += btnValue;
                justEvaluated = false;
        }
    });
});

document.querySelectorAll(".numbers").forEach(function(item) { 
    item.addEventListener("click", function(e) {
        if (inputValue.value === "0" || inputValue.value === "Error" || inputValue.value === "NaN") {
            inputValue.value = "";
        }
        inputValue.value += e.target.innerText.trim();
    });
});

function menuOptions() {
  const x = document.getElementById("myLinks");
  x.style.display = (x.style.display === "block") ? "none" : "block";
}