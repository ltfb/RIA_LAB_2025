const inputValue = document.getElementById('inputValue');

let justEvaluated = false;

document.querySelectorAll(".operators, .other-operators").forEach(function(item) {
    item.addEventListener("click", function(e) {
        const btnValue = e.target.innerText.trim();
        let expression = inputValue.value;
        let lastChar = expression.slice(-1);

        switch (btnValue) {
            case "=": {
            if (expression.trim().toUpperCase() === "VS,") {
                console.log("EASTER EGG detected!");
                document.getElementById('WEBCAM_ICO').style.display = "block";
                inputValue.value = "🎉 Surprise!";
                justEvaluated = true;
                return; // Exit early after handling easter egg
            } else if (expression.trim().toUpperCase() === "EASTEREGG"){
                console.log("EASTER EGG detected!");
                inputValue.value = "🎉 Surprise!";
                document.getElementById('YT_ICO').style.display = "block";
                justEvaluated = true;
                return; // Exit early after handling easter egg
            }
            try {
                // Only allow numbers, operators, parentheses, decimal points, sqrt, and square
                let safeExpr = expression
                    // Replace √number or √(expression) with Math.sqrt(number/expression)
                    .replace(/√(\d+(\.\d+)?|\([^()]*\))/g, (match, p1) => {
                        return `Math.sqrt(${p1})`;
                    })
                    // Replace number² or (expression)² with Math.pow(number/expression, 2)
                    .replace(/(\d+(\.\d+)?|\([^()]*\))²/g, (match, p1) => {
                        return `Math.pow(${p1},2)`;
                    })
                    .replace(/÷/g, "/")
                    .replace(/×/g, "*");
                    // Evaluate using arithmetic only, no eval or Function for user input
                    // Only allow numbers, operators, parentheses, decimal points, sqrt, and square
                    // Already replaced √ and ² above, so safeExpr should be safe for Function
                // Prevent code injection by allowing only safe characters
                if (!/^[\d+\-*/()., Mathsqrtpowy]+$/.test(safeExpr)) {
                    throw new Error("Unsafe expression");
                }

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