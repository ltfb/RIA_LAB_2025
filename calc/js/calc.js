const inputValue = document.getElementById('inputValue');

let justEvaluated = false;


function calcFunctions(e, customValue = null) {
    const btnValue = customValue || e?.target?.innerText?.trim();
    let expression = inputValue.value;
    let lastChar = expression.slice(-1);

    switch (btnValue) {
        case "=": {
            const expr = expression.trim().toUpperCase();
            if (expr === "VS,") {
                document.getElementById('WEBCAM_ICO').style.display = "block";
                inputValue.value = "🎉 Surprise!";
                justEvaluated = true;
                return;
            } else if (expr === "EASTEREGG") {
                document.getElementById('YT_ICO').style.display = "block";
                inputValue.value = "🎉 Surprise!";
                justEvaluated = true;
                return;
            }

            try {
                let safeExpr = expression
                    .replace(/√(\d+(\.\d+)?|\([^()]*\))/g, (_, value) => `Math.sqrt(${value})`)
                    .replace(/(\d+(\.\d+)?|\([^()]*\))²/g, (_, value) => `Math.pow(${value},2)`)
                    .replace(/÷/g, "/")
                    .replace(/×/g, "*");

                // Wrap raw numbers in parentheses
                safeExpr = safeExpr.replace(/(?<![\w.])(\d+(\.\d+)?)(?![\w.])/g, '($1)');

                let result = Function('"use strict"; return (' + safeExpr + ')')();
                inputValue.value = isNaN(result) ? "Error" : result;
                justEvaluated = true;
            } catch (error) {
                inputValue.value = "Error";
                justEvaluated = true;
            }
            break;
        }

        case "AC":
        case "C":
            inputValue.value = "0";
            justEvaluated = false;
            break;

        case "⌫":
            if (
                expression === "" ||
                expression === "Error" ||
                expression === "NaN" ||
                expression === "Infinity" ||
                expression === "🎉 Surprise!" ||
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
                inputValue.value = (!isNaN(value) && value !== 0) ? (1 / value) : "Error";
                justEvaluated = true;
            } catch (error) {
                inputValue.value = "Error";
                console.log("Error: ", error);
                justEvaluated = true;
            }
            break;

        case "x²":
            try {
                let value = parseFloat(expression);
                inputValue.value = !isNaN(value) ? value * value : "Error";
                justEvaluated = true;
            } catch (error) {
                inputValue.value = "Error";
                console.log("Error: ", error);
                justEvaluated = true;
            }
            break;
        
        case "+/-":
            if (inputValue.value !="" && inputValue.value !== "0" && inputValue.value !== "Error" && inputValue.value !== "NaN") {
                if (inputValue.value.startsWith("-")) {
                    inputValue.value = inputValue.value.slice(1);
                } else {
                    inputValue.value = "-" + inputValue.value;
                }
            }
        break;

        case "n!":
            try {
                let value = parseInt(expression);
                if (isNaN(value)) throw new Error("Invalid input");
                inputValue.value = factorial(value);
                justEvaluated = true;
            } catch (error) {
                inputValue.value = "Error";
                justEvaluated = true;
            }
            break;
        case "π":
            inputValue.value += Math.PI;
            justEvaluated = true;
            break;
        case "e":
            inputValue.value += Math.E;
            justEvaluated = true;
            break;
        case "log":
            try {
                let value = parseFloat(expression);
                if (isNaN(value) || value <= 0) {
                    inputValue.value = "Error";
                } else {
                    inputValue.value += Math.log10(value);
                }
                justEvaluated = true;
            } catch (error) {

                inputValue.value = "Error";
                console.log("Error: ", error);
                justEvaluated = true;
            }
            break;
        case "ln":
            try {
                let value = parseFloat(expression);
                if (isNaN(value) || value <= 0) {
                    inputValue.value = "Error";
                } else {
                    inputValue.value += Math.log(value);
                }
                justEvaluated = true;
            } catch (error) {
                inputValue.value = "Error";
                console.log("Error: ", error);
                justEvaluated = true;
            }
            break; 
        default:
            if (justEvaluated) {
                if (!isNaN(btnValue) || btnValue === "√" || btnValue === "x²" || btnValue === "1/x" ) {
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

            if ("+-*/".includes(btnValue) && "+-*/".includes(lastChar)) return;

            if (inputValue.value === "0") inputValue.value = "";

            inputValue.value += btnValue;
            justEvaluated = false;
    }
}

// Attach click event to each button
document.querySelectorAll(".operators, .other-operators").forEach(function (item) {
    item.addEventListener("click", function (e) {
        calcFunctions(e);
    });
});

// Attach Enter key handler globally
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && document.activeElement === inputValue) {
        event.preventDefault(); // Prevent newline
        calcFunctions(null, "=");
        inputValue.value = inputValue.value.replace(/Enter$/, ""); // Remove if ends with Enter
        console.log(inputValue.value + ".");
        console.log("Enter key pressed");
    }
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
  const x = document.getElementById("menuOpts1_2");
  x.style.display = (x.style.display === "block") ? "none" : "block";
}

function openWebcam() {
    const popup = document.getElementById('webcamPopup');
    popup.style.display = 'block';
    popup.style.resize = 'both';
    popup.style.overflow = 'auto';
    popup.style.minWidth = '320px';
    popup.style.minHeight = '240px';
    popup.style.maxWidth = '100vw';
    popup.style.maxHeight = '100vh';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.cursor = 'move';

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            document.getElementById('webcamVideo').srcObject = stream;
        })
        .catch(function() {
            alert('Webcam access denied or not available.');
        });
    }

    // Make popup draggable
    let isDragging = false, offsetX = 0, offsetY = 0;

    popup.onmousedown = function(e) {
        isDragging = true;
        offsetX = e.clientX - popup.getBoundingClientRect().left;
        offsetY = e.clientY - popup.getBoundingClientRect().top;
        document.body.style.userSelect = 'none';
    };

    document.onmousemove = function(e) {
        if (isDragging) {
            popup.style.left = e.clientX - offsetX + 'px';
            popup.style.top = e.clientY - offsetY + 'px';
            popup.style.transform = ''; // Remove centering transform when dragging
        }
    };

    document.onmouseup = function() {
        isDragging = false;
        document.body.style.userSelect = '';
    };
}
function closeWebcam() {
    const popup = document.getElementById('webcamPopup');
    popup.style.display = 'none';
    const video = document.getElementById('webcamVideo');
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
}

// Factorial function for "n!"
function factorial(n) {
    if (n < 0) return "Error";
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}