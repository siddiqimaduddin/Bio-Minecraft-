// Fungsi Buka Jendela Popup
function openWindow(id) {
    document.querySelectorAll('.mc-window').forEach(win => win.style.display = 'none');
    let target = document.getElementById(id);
    let overlay = document.getElementById('overlay');
    if (target) target.style.display = 'block';
    if (overlay) overlay.style.display = 'block';
}

// Fungsi Tutup Jendela Popup
function closeWindow(id) {
    let target = document.getElementById(id);
    let overlay = document.getElementById('overlay');
    if (target) target.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
}

function closeAllWindows() {
    document.querySelectorAll('.mc-window').forEach(win => win.style.display = 'none');
    let overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'none';
}

// ================= FUNGSI SALIN IP & PORT (KOMPATIBEL DENGAN HP / LOCAL FILE) =================
function copyText(textToCopy, buttonElement) {
    // Cek apakah browser mendukung navigator.clipboard
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => showSuccessAnimation(buttonElement))
            .catch(() => fallbackCopy(textToCopy, buttonElement));
    } else {
        // Metode cadangan untuk file lokal (file://) / Acode Preview
        fallbackCopy(textToCopy, buttonElement);
    }
}

// Metode cadangan menggunakan elemen buatan sementara
function fallbackCopy(textToCopy, buttonElement) {
    let textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    
    // Cegah layar nge-scroll saat elemen dibuat
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        let successful = document.execCommand('copy');
        if (successful) {
            showSuccessAnimation(buttonElement);
        } else {
            alert('Gagal menyalin, silakan salin manual.');
        }
    } catch (err) {
        alert('Gagal menyalin: ' + err);
    }
    
    document.body.removeChild(textArea);
}

// Animasi Perubahan Tombol Saat Berhasil Disalin
function showSuccessAnimation(buttonElement) {
    let originalText = buttonElement.innerText;
    buttonElement.innerText = "TERSALIN! ✅";
    buttonElement.style.background = "#55FF55";
    buttonElement.style.color = "#000";

    setTimeout(() => {
        buttonElement.innerText = originalText;
        buttonElement.style.background = "";
        buttonElement.style.color = "";
    }, 2000);
}
// GANTI PASSWORD ADMIN KAMU DI SINI
const ADMIN_PASSWORD = "admin123"; 

function loginAdmin() {
    let passInput = document.getElementById("admin-pass").value;
    if (passInput === ADMIN_PASSWORD) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("control-section").style.display = "block";
        loadCurrentStatus();
    } else {
        alert("Password Salah!");
    }
}

function loadCurrentStatus() {
    let serverData = JSON.parse(localStorage.getItem("mc_server_status")) || {
        status: "ONLINE",
        players: "0/50",
        motd: "Selamat datang di server!"
    };

    document.getElementById("status-select").value = serverData.status;
    document.getElementById("player-count").value = serverData.players;
    document.getElementById("motd-text").value = serverData.motd;
}

function saveStatus() {
    let statusVal = document.getElementById("status-select").value;
    let playersVal = document.getElementById("player-count").value;
    let motdVal = document.getElementById("motd-text").value;

    let serverData = {
        status: statusVal,
        players: playersVal,
        motd: motdVal
    };

    // Menyimpan data ke Storage Browser / JSON
    localStorage.setItem("mc_server_status", JSON.stringify(serverData));
    alert("Status server berhasil disimpan!");
}

function logoutAdmin() {
    document.getElementById("admin-pass").value = "";
    document.getElementById("login-section").style.display = "block";
    document.getElementById("control-section").style.display = "none";
}
// ================= MEMBACA STATUS DARI ADMIN PANEL =================
function loadServerStatusFromAdmin() {
    let statusElement = document.getElementById("server-status");
    if (!statusElement) return;

    // Ambil data dari penyimpanan JSON / Admin
    let serverData = JSON.parse(localStorage.getItem("mc_server_status"));

    if (serverData) {
        if (serverData.status === "ONLINE") {
            statusElement.innerHTML = `🟢 STATUS SERVER: ONLINE (${serverData.players || '0/50'})`;
            statusElement.style.color = "#55FF55";
        } else if (serverData.status === "OFFLINE") {
            statusElement.innerHTML = `🔴 STATUS SERVER: OFFLINE`;
            statusElement.style.color = "#FF5555";
        } else if (serverData.status === "MAINTENANCE") {
            statusElement.innerHTML = `🟡 STATUS SERVER: MAINTENANCE`;
            statusElement.style.color = "#FFFF55";
        }
    }
}

// Jalankan saat web dibuka oleh pemain
document.addEventListener("DOMContentLoaded", loadServerStatusFromAdmin);
