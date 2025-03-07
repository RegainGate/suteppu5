const pdfFiles = [
   "ステップ5-1.pdf",
    "ステップ5-2.pdf",
    "ステップ5-3.pdf"
];

const passwords = {
   "ステップ5-1.pdf": "GUCCI",
    "ステップ5-2.pdf": "MORABITO"
};

const hints = {
    "ステップ5-1.pdf": "GUCCI",
    "ステップ5-2.pdf": "MORABITO"
};

let currentIndex = 0;

function updateViewer() {
    const pdfObject = document.getElementById("pdfObject");
    const pdfLink = document.getElementById("pdfLink");
    const pdfTitle = document.getElementById("pdfTitle");
    const hintContainer = document.getElementById("hintContainer");
    const hintText = document.getElementById("hintText");
    const hintBtn = document.getElementById("hintBtn");

    pdfObject.data = pdfFiles[currentIndex];
    pdfLink.href = pdfFiles[currentIndex];
    pdfTitle.textContent = "現在のファイル: " + pdfFiles[currentIndex];

    const passwordInput = document.getElementById("passwordInput");
    const nextBtn = document.getElementById("nextBtn");

    // 暗号ボタンの表示設定
    if (hints[pdfFiles[currentIndex]]) {
        hintContainer.style.display = "block";
        hintText.textContent = "";
        hintBtn.onclick = function () {
            hintText.textContent = hints[pdfFiles[currentIndex]];
        };
    } else {
        hintContainer.style.display = "none";
    }

    // パスワードの設定
    if (passwords[pdfFiles[currentIndex]]) {
        passwordInput.style.display = "inline";
        passwordInput.value = "";
        nextBtn.disabled = true;
    } else {
        passwordInput.style.display = "none";
        nextBtn.disabled = false;
    }

    // 「戻る」ボタンの有効・無効化
    document.getElementById("prevBtn").disabled = (currentIndex === 0);

    // **ページを一番上から表示**
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
}

function nextStep() {
    if (currentIndex < pdfFiles.length - 1) {
        currentIndex++;
        updateViewer();
    }
}

function prevStep() {
    if (currentIndex > 0) {
        currentIndex--;
        updateViewer();
    }
}

function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value;
    const currentPdf = pdfFiles[currentIndex];

    if (passwords[currentPdf] && passwordInput === passwords[currentPdf]) {
        document.getElementById("nextBtn").disabled = false;
    } else {
        document.getElementById("nextBtn").disabled = true;
    }
}

// 初期表示の設定
updateViewer();
