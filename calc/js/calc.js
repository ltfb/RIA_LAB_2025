const inputValue = document.getElementById('inputValue');

let justEvaluated = false;

function allTheOperations(e, customValue = null) {
    let btnValue = customValue || (e && e.target.innerText.trim());
    let inputStr = inputValue.value;

    switch (btnValue) {
        case "=": {
            let expr = inputStr.replace(/\s+/g, "");

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

            expr = expr.replace(/(\d+|\([^()]*\))²/g, (_, base) => `Math.pow(${base}, 2)`);
            expr = expr.replace(/(\d+|\([^()]*\))³/g, (_, base) => `Math.pow(${base}, 3)`);
            expr = expr.replace(/(\d+|\([^()]*\))\^(\d+|\([^()]*\))/g, (_, base, exp) => {
                return `Math.pow(${base}, ${exp})`;
            });
            expr = expr.replace(/√(\d+(\.\d+)?|\([^()]*\))/g, (_, inside) => `Math.sqrt(${inside})`);
            expr = expr.replace(/∛(\d+|\([^()]*\))/g, (_, val) => `Math.cbrt(${val})`);
            expr = expr.replace(/\|([^|]+)\|/g, (_, val) => `Math.abs(${val})`);
            expr = expr.replace(/(?<![a-zA-Z0-9_.])e(?![a-zA-Z0-9_])/g, 'Math.E');
            expr = expr.replace(/log\(/gi, "Math.log10(");
            expr = expr.replace(/ln\(/gi, "Math.log(");
            expr = expr.replace(/exp\(/gi, "Math.exp(");

            let result = Function(`"use strict"; return (${expr})`)();
            inputValue.value = result;
            console.log("Result:", result);
            } catch (error) {
            console.error("Error evaluating expression:", error);
            inputValue.value = "Error";
            }
            break;
        }
        case "AC":
        case "C":
            inputValue.value = "";
            break;
        case "1/x":
            try {
                let val = parseFloat(inputValue.value);
                if (val === 0) throw new Error("Divide by zero");
                inputValue.value = 1 / val;
            } catch {
                inputValue.value = "Error";
            }
            break;
        case "x²":
            inputValue.value += "²";
            break;
        case "+/-":
            if (inputValue.value.startsWith("-")) {
                inputValue.value = inputValue.value.slice(1);
            } else {
                inputValue.value = "-" + inputValue.value;
            }
            break;
        case "n!":
            inputValue.value += "!";
            break;
        case "π":
            inputValue.value += Math.PI.toFixed(8);
            break;
        case "e":
            inputValue.value += "e";
            break;
        case "log":
            inputValue.value += "log(";
            break;
        case "ln":
            inputValue.value += "ln(";
            break;
        case "|x|":
            inputValue.value += "|";
            break;
        case "exp":
            inputValue.value += "exp(";
            break;
        case "x^y":
            if (!inputValue.value.endsWith("^") && inputValue.value !== "" && inputValue.value !== "Error") {
                inputValue.value += "^";
            }
            break;
        case "10^x":
            if (!inputValue.value.endsWith("^") && inputValue.value !== "" && inputValue.value !== "Error") {
                inputValue.value += "10^";
            }
            break;
        case "√":
            if (!inputValue.value.endsWith("√") && !inputValue.value.endsWith(")")) {
                inputValue.value += "√";
            }
            break;
        default:
            inputValue.value += btnValue;
            break;
        case "⌫":
            // Set all textareas to "0" if any of these cases
            if (
                inputValue.value === "" ||
                inputValue.value === "Error" ||
                inputValue.value === "NaN" ||
                inputValue.value === "Infinity" ||
                inputValue.value === "🎉 Surprise!" ||
                inputValue.value === "0"
            ) {
                document.querySelectorAll("textarea").forEach(function (ta) {
                    ta.value = "0";
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
document.querySelectorAll(".operators, .other-operators").forEach(function (item) {
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

