// PASSWORD ADMIN UTAMA (Bisa kamu ganti sesuai keinginan)
const ADMIN_PASSWORD = "admin123"; 

// Fungsi Toggle Intip Password (Fitur Logo Mata)
function togglePassword() {
    const passInput = document.getElementById("admin-pass");
    const eyeBtn = document.getElementById("eye-btn");
    
    if (passInput.type === "password") {
        passInput.type = "text";
        eyeBtn.innerText = "🙈"; // Berubah ikon saat kata sandi ditampilkan
    } else {
        passInput.type = "password";
        eyeBtn.innerText = "👁️"; // Kembali ke logo mata
    }
}

// Fungsi Tekan Enter di Keyboard HP/PC untuk Login
function handleKeyPress(event) {
    if (event.key === "Enter") {
        loginAdmin();
    }
}

// Fungsi Login Admin
function loginAdmin() {
    const passInput = document.getElementById("admin-pass").value;
    
    if (passInput === ADMIN_PASSWORD) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("control-section").style.display = "block";
        loadCurrentStatus();
    } else {
        alert("Password Salah! Pastikan penulisan huruf besar/kecil sudah sesuai.");
    }
}

// Fungsi Memuat Data Status Terkini
function loadCurrentStatus() {
    try {
        let serverData = JSON.parse(localStorage.getItem("mc_server_status")) || {
            status: "ONLINE",
            players: "0/50",
            motd: "Selamat datang di server!"
        };

        document.getElementById("status-select").value = serverData.status;
        document.getElementById("player-count").value = serverData.players;
        document.getElementById("motd-text").value = serverData.motd;
    } catch (e) {
        console.error("Gagal membaca status dari penyimpanan:", e);
    }
}

// Fungsi Menyimpan Data Status
function saveStatus() {
    let statusVal = document.getElementById("status-select").value;
    let playersVal = document.getElementById("player-count").value;
    let motdVal = document.getElementById("motd-text").value;

    let serverData = {
        status: statusVal,
        players: playersVal,
        motd: motdVal
    };

    try {
        localStorage.setItem("mc_server_status", JSON.stringify(serverData));
        alert("✅ Status server berhasil disimpan!");
    } catch (e) {
        alert("Gagal menyimpan data status!");
    }
}

// Fungsi Logout Admin
function logoutAdmin() {
    document.getElementById("admin-pass").value = "";
    
    // Reset tipe password ke hidden kembali
    const passInput = document.getElementById("admin-pass");
    const eyeBtn = document.getElementById("eye-btn");
    passInput.type = "password";
    if (eyeBtn) eyeBtn.innerText = "👁️";

    document.getElementById("login-section").style.display = "block";
    document.getElementById("control-section").style.display = "none";
}
