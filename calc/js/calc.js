const inputValue = document.getElementById('inputValue');

let justEvaluated = false;

function allTheOperations(e, customValue = null) {
    let btnValue = customValue || (e && e.target.innerText.trim());
    let inputStr = inputValue.value;
    let btnid = e?.target?.id;

    switch (btnValue) {
        case "=": {
            if (inputValue.value === "Error") {
                inputValue.value = '';
            } else {
                let expr = inputStr;  // NO eliminar espacios aún

                // Easter eggs
                if (expr.toUpperCase() === "EASTEREGG") {
                    document.getElementById('WEBCAM_ICO').style.display = "block";
                    inputValue.value = "🎉 Surprise!";
                    justEvaluated = true;
                    return;
                } else if (expr.toUpperCase() === "YT") {
                    document.getElementById('YT_ICO').style.display = "block";
                    inputValue.value = "🎉 Surprise!";
                    justEvaluated = true;
                    return;
                }

                try {
                    expr = expr.replace(/(\d+)!/g, (_, numStr) => {
                        const num = parseInt(numStr);
                        return factorial(num);
                    });

                    // logyX(base, value) = log(value) / log(base)
                    expr = expr.replace(/logyX\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/g, (_, base, value) => {
                        return `(Math.log10(${value}) / Math.log10(${base}))`;
                    });

                    expr = expr.replace(/([a-zA-Z0-9_.]+|\([^()]*\))\^([a-zA-Z0-9_.]+|\([^()]*\))/g, (_, base, exp) => {
                        return `Math.pow(${base}, ${exp})`;
                    });
                    
                    
                    // raiz n-esima
                    expr = expr.replace(/ⁿ√\(\s*(\d+)\s*,\s*([^)]+)\)/g, (_, n, x) => {
                        return `Math.pow(${x}, 1/${n})`;
                    });
                    // raiz cuadrada
                    expr = expr.replace(/√(\d+(\.\d+)?|\([^()]*\))/g, (_, inside) => `Math.sqrt(${inside})`);
                    // raiz cubica
                    expr = expr.replace(/∛(\d+|\([^()]*\))/g, (_, val) => `Math.cbrt(${val})`);
                    

                    // absoluto
                    expr = expr.replace(/\|([^|]+)\|/g, (_, val) => `Math.abs(${val})`);
                    
                    // e
                    expr = expr.replace(/(^|[^a-zA-Z0-9_.])e([^a-zA-Z0-9_]|$)/g, '$1Math.E$2');
                    
                    // log natural
                    expr = expr.replace(/log\(/gi, "Math.log10(");
                    
                    // Ln 
                    expr = expr.replace(/ln\(/gi, "Math.log(");
                    
                    // exponencial
                    expr = expr.replace(/exp\(/gi, "Math.exp(");

                    expr = expr.replace(/\s+/g, "");  // ELIMINAR espacios después de reemplazos

                    let result = Function(`"use strict"; return (${expr})`)();
                    inputValue.value = result;
                    console.log("Result:", result);
                } catch (error) {
                    console.error("Error evaluating expression:", error);
                    inputValue.value = "Error";
                }
            }
            break;
        }
        case "AC":
        case "C":
            inputValue.value = "";
            break;
        case "1/x":
            try {
                if (inputValue.value === 'Error') throw new Error("Error");
                let val = parseFloat(inputValue.value);
                if (val === 0) throw new Error("Divide by zero");
                inputValue.value = 1 / val;
            } catch {
                inputValue.value = "Error";
            }
            break;
        case "x²":
            if (inputValue.value !== "Error" && inputValue.value !== "0" && inputValue.value !== "") {
                inputValue.value += "^2";
            } else {
                inputValue.value = "Error";
            }
            break;
        case "+/-":
            if (inputValue.value !== "Error" && inputValue.value !== "" && inputValue.value !== "0") {
                if (inputValue.value.startsWith("-")) {
                    inputValue.value = inputValue.value.slice(1);
                } else {
                    inputValue.value = "-" + inputValue.value;
                }
            } else if (inputValue.value === "Error") {
                inputValue.value = "Error";
            }
            break;
        case "n!":
            if (inputValue.value !== "Error" && inputValue.value !== "0" && inputValue.value !== "") {
                inputValue.value += "!";
            } else {
                inputValue.value = "Error";
            }
            break;
        case "π":
            if (inputValue.value !== "Error" && inputValue.value !== "0" && inputValue.value !== "") {
                inputValue.value += Math.PI.toFixed(8);
            } else {
                inputValue.value = Math.PI.toFixed(8);
            }
            break;
        case "e":
            if (inputValue.value === "Error" || inputValue.value === "0" || inputValue.value === "") {
                inputValue.value = "e";
            } else {
                inputValue.value += "e";
            }
            break;
        case "log":
            if (inputValue.value === "Error" || inputValue.value === "0" || inputValue.value === "") {
                inputValue.value = "log(";
            } else {
                inputValue.value += "log(";
            }
            break;
        case "ln":
            if (inputValue.value === "Error" || inputValue.value === "0" || inputValue.value === "") {
                inputValue.value = "ln(";
            } else {
                inputValue.value += "ln(";
            }
            break;
        case "|x|":
            if (inputValue.value === "Error" || inputValue.value === "0" || inputValue.value === "") {
                inputValue.value = "|";
            } else {
                inputValue.value += "|";
            }
            break;
        case "exp":
            if (inputValue.value === "Error" || inputValue.value === "0" || inputValue.value === "") {
                inputValue.value = "exp(";
            } else {
                inputValue.value += "exp(";
            }
            break;
        case "x^y":
            if (!inputValue.value.endsWith("^") && inputValue.value !== "" && inputValue.value !== "Error") {
               inputValue.value += "^";
            }
            break;
        case "10^x":
            if (inputValue.value === "Error" || inputValue.value.endsWith("^") || inputValue.value === "0" || inputValue.value === "") {
                inputValue.value = "10^";
            } else {
                inputValue.value += "10^";
            }
            break;
        case "x³":
            if (inputValue.value !== "Error" && inputValue.value !== "0" && inputValue.value !== "") {
                inputValue.value += "^3";
            } else {
                inputValue.value = "Error";
            }
            break;
        case "2^x":
            if (inputValue.value === "Error" || inputValue.value.endsWith("^") || inputValue.value === "0" || inputValue.value === "") {
                inputValue.value = "2^";
            } else {
                inputValue.value += "2^";
            }
            break;
        case "e^x":
            if (inputValue.value === "Error" || inputValue.value.endsWith("^") || inputValue.value === "0" || inputValue.value === "") {
                inputValue.value = "e^";
            } else {
                inputValue.value += "e^";
            }
            break;
        case "logyX(y,x)":
            if (inputValue.value === "Error" || inputValue.value === "0" || inputValue.value === "") {
                inputValue.value = "logyX(";
            } else {
                inputValue.value += "logyX(";
            }
            break;
        case "ⁿ√(n,x)":
            if (inputValue.value === "Error" || inputValue.value === "0" || inputValue.value === "") {
                inputValue.value = "ⁿ√(";
            } else {
                inputValue.value += "ⁿ√(";
            }
            break;
        default:
            if (btnid === "tr1_1" || btnValue == "nd") break;
            inputValue.value += btnValue;      
            break;
        case "⌫":
            if (
                inputValue.value === "" ||
                inputValue.value === "Error" ||
                inputValue.value === "NaN" ||
                inputValue.value === "Infinity" ||
                inputValue.value === "🎉 Surprise!" ||
                inputValue.value === "0"
            ) {
                document.querySelectorAll("textarea").forEach(function (ta) {
                    ta.value = "";
                });
            } else {
                let newText = inputValue.value.slice(0, -1);
                inputValue.value = newText === "" ? "0" : newText;
            }
            justEvaluated = false;
            break;
    }
}


// Attach click event to each button
document.querySelectorAll(".operators, .other-operators, .repeated-operators").forEach(function (item) {
    item.addEventListener("click", function (e) {
        allTheOperations(e);
    });
});

// Attach Enter key handler globally
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && document.activeElement === inputValue) {
        event.preventDefault(); // Prevent newline
        allTheOperations(null, "=");
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
  const y = document.getElementById("bhabttn");
  y.style.display = (y.style.display === "block") ? "none" : "block";
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

