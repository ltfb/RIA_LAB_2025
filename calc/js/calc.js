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


function menuOptions() {
  const x = document.getElementById("myLinks");
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

document.getElementById('burgerMenu').addEventListener('click', () => {
  const content = document.getElementById('content');
  content.classList.toggle('hidden');
});