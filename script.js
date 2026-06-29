const DEFAULT_DATA = [
    { cat: 'edelweis', name: "Leontopodium Alpinum", price: "Rp 1.150.000", img: "https://flower-meanings.com/wp-content/uploads/2019/09/Edelweiss-meaning-819x1024.jpg" },
    { cat: 'edelweis', name: "Leucogenes Grandiceps", price: "Rp 1.150.000", img: "https://bungafloristmalang.com/wp-content/uploads/2022/12/Leucogenes-Grandiceps.jpg"},
    { cat: 'edelweis', name: "Anaphalis Javanica", price: "Rp 1.150.000", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyoknMpcQqyhS35TxhMeJFxgkkvc536isXxQ&s"},
    { cat: 'edelweis', name: "Anaphalis Margaritacea", price: "Rp 1.150.000", img: "https://upload.wikimedia.org/wikipedia/commons/3/32/Anapahlis_margaritacea.jpg"},
    { cat: 'mawar', name: "Eternal Red Rose Dome", price: "Rp 450.000", img: "https://assets.eflorist.com/site/EF-11476/assets/products/CZM_/sku8560083.jpg?impolicy=hero"},
    { cat: 'mawar', name: "Red Romance Bouquet", price: "Rp 450.000", img: "https://images.unsplash.com/photo-1548094967-e25a127d1f6d?w=400" },
    { cat: 'mawar', name: "White Velvet Rose", price: "Rp 480.000", img: "https://alluraflorist.id/wp-content/uploads/2024/04/bunga-mawar-putih-melambangkan-apa-ya.png" },
    { cat: 'tulip', name: "Tulip Triumph", price: "Rp 650.000", img: "https://www.jamiesonbrothers.com/media/catalog/product/p/p/pp_image_guide__0142_230328gbo026_tulipa_triumph_mix_2.jpg" },
    { cat: 'tulip', name: "Tulip Lily-Flowered", price: "Rp 650.000", img: "https://www.biogarten.ch/ABG/Produktbilder/Pflanzen/Zwiebeln/Blumenzwiebeln%20-%20Herbst/Tulpe%20Ballerina/21782/image-thumb__21782__default_width_1_1/4983g-tulpe-ballerina-orange-lilienbluetig-andermatt-biogarten.31889412.webp"},
    { cat: 'tulip', name: "Tulip Greigii", price: "Rp 650.000", img:  "https://www.tulipworld.com/Shared/Images/Product/Pinocchio-Tulip/39153-pinocchio.jpg"},
    { cat: 'kering', name: "Lavender", price: "Rp 250.000", img: "https://statik.tempo.co/data/2024/01/20/id_1272924/1272924_720.jpg" },
    { cat: 'kering', name: "Baby's Breath", price: "Rp 250.000", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkyt3eVi9JmC1jW-o7BiBiNxqISC_jn_ujrQ&s"},
    { cat: 'kering', name: "Amaranth Bulat", price: "Rp 250.000", img: "https://gardeningsg.nparks.gov.sg/images/Plants/globeamaranth%20(2)_victorialim.jpg"},
    { cat: 'kering', name: "Cantel", price: "Rp 250.000", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5UP6ZbYRheaKec8rj1rx9PP_ZEHIjvkEIOA&s"},
    { cat: 'mawar', name: "Pink Blush Roses", price: "Rp 420.000", img: "https://florberkeley.com/cdn/shop/files/IMG_7448.heic?v=1701394291&width=1946" },
];

// Memuat database utama dari LocalStorage
let DATA = JSON.parse(localStorage.getItem("outerbloom_products")) || DEFAULT_DATA;
let CART = JSON.parse(localStorage.getItem("outerbloom_cart")) || [];

// Memuat database user terdaftar (Default: kelompok7)
let USERS = JSON.parse(localStorage.getItem("outerbloom_registered_users")) || [
    { username: "kelompok7", pass: "123" }
];

window.onload = function() {
    const isLoggedIn = localStorage.getItem("outerbloom_login");
    const savedUser = localStorage.getItem("outerbloom_user");
    const savedRole = localStorage.getItem("outerbloom_role");
    
    if (isLoggedIn === "true" && savedUser && savedRole) {
        showWebsite(savedUser, savedRole);
    }
    updateCartBadge();
}

/* --- SISTEM FORM SWITCHER AUTH --- */
function switchAuthForm(formType) {
    document.getElementById('boxLogin').classList.add('hidden');
    document.getElementById('boxRegister').classList.add('hidden');
    document.getElementById('boxForgot').classList.add('hidden');

    if(formType === 'login') {
        document.getElementById('boxLogin').classList.remove('hidden');
    } else if(formType === 'register') {
        document.getElementById('boxRegister').classList.remove('hidden');
    } else if(formType === 'forgot') {
        document.getElementById('boxForgot').classList.remove('hidden');
    }
    // Reset error text
    document.getElementById('loginErr').innerText = "";
    document.getElementById('regErr').innerText = "";
    document.getElementById('forgotErr').innerText = "";
}

/* --- ENGINE SIGN-UP REGISTER --- */
function handleRegister() {
    const u = document.getElementById('regUser').value.trim();
    const p = document.getElementById('regPass').value;
    const pc = document.getElementById('regPassConfirm').value;

    if (!u || !p) {
        document.getElementById('regErr').innerText = "Kolom tidak boleh kosong!";
        return;
    }
    if (p !== pc) {
        document.getElementById('regErr').innerText = "Konfirmasi password tidak cocok!";
        return;
    }

    // Cek apakah username bawaan admin atau user lama sudah ada
    const isExist = USERS.some(user => user.username.toLowerCase() === u.toLowerCase()) || u === "admin7";
    if (isExist) {
        document.getElementById('regErr').innerText = "Username sudah digunakan!";
        return;
    }

    // Simpan ke database array & LocalStorage
    USERS.push({ username: u, pass: p });
    localStorage.setItem("outerbloom_registered_users", JSON.stringify(USERS));

    alert("Pendaftaran Akun Berhasil! Silakan masuk.");
    
    // Bersihkan form & kembali ke login
    document.getElementById('regUser').value = "";
    document.getElementById('regPass').value = "";
    document.getElementById('regPassConfirm').value = "";
    switchAuthForm('login');
}

/* --- ENGINE FORGOT PASSWORD --- */
function handleForgotPassword() {
    const u = document.getElementById('forgotUser').value.trim();
    const np = document.getElementById('forgotNewPass').value;

    if(!u || !np) {
        document.getElementById('forgotErr').innerText = "Kolom tidak boleh kosong!";
        return;
    }
    if(u === "admin7") {
        document.getElementById('forgotErr').innerText = "Gagal. Akun Admin Utama dilindungi sistem!";
        return;
    }

    // Cari user di database lokal
    const userIndex = USERS.findIndex(user => user.username.toLowerCase() === u.toLowerCase());

    if (userIndex !== -1) {
        // Update password baru
        USERS[userIndex].pass = np;
        localStorage.setItem("outerbloom_registered_users", JSON.stringify(USERS));
        
        alert("Password berhasil diperbarui! Silakan mencoba login kembali.");
        document.getElementById('forgotUser').value = "";
        document.getElementById('forgotNewPass').value = "";
        switchAuthForm('login');
    } else {
        document.getElementById('forgotErr').innerText = "Username tidak ditemukan di sistem!";
    }
}

/* --- ENGINE LOGIN VERIFICATION --- */
function handleLogin() {
    const u = document.getElementById('userInput').value.trim();
    const p = document.getElementById('passInput').value;
    let role = "";

    // 1. Verifikasi Master Admin
    if (u === "admin7" && p === "admin123") {
        role = "admin";
    } else {
        // 2. Verifikasi Data User Dinamis dari Array Database
        const validUser = USERS.find(user => user.username === u && user.pass === p);
        if (validUser) {
            role = "user";
        }
    }

    if (role !== "") {
        localStorage.setItem("outerbloom_login", "true");
        localStorage.setItem("outerbloom_user", u);
        localStorage.setItem("outerbloom_role", role);
        
        showWebsite(u, role);
        
        document.getElementById('userInput').value = "";
        document.getElementById('passInput').value = "";
        document.getElementById('loginErr').innerText = "";
    } else {
        document.getElementById('loginErr').innerText = "Username atau Password Salah!";
    }
}

function showWebsite(username, role) {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('mainWebsite').classList.remove('hidden');
    document.getElementById('userGreet').innerText = "Selamat datang, " + username + "!";
    
    const badgeContainer = document.getElementById('userRoleContainer');
    const adminPanel = document.getElementById('adminPanel');

    if (role === "admin") {
        badgeContainer.innerHTML = `<span class="role-badge admin"><i class="fa fa-user-shield"></i> Terautentikasi: Admin</span>`;
        adminPanel.classList.remove('hidden');
    } else {
        badgeContainer.innerHTML = `<span class="role-badge"><i class="fa fa-user"></i> Terautentikasi: Pelanggan</span>`;
        adminPanel.classList.add('hidden');
    }

    renderProducts(DATA);
}

function handleLogout() {
    localStorage.removeItem("outerbloom_login");
    localStorage.removeItem("outerbloom_user");
    localStorage.removeItem("outerbloom_role");
    
    document.getElementById('mainWebsite').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    switchAuthForm('login');
    closeNav();
}

function openProductModal() {
    document.getElementById('productModal').style.display = 'flex';
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
    document.getElementById('addProductForm').reset();
}

function saveNewProduct(e) {
    e.preventDefault();

    const name = document.getElementById('prodName').value;
    const price = document.getElementById('prodPrice').value;
    const cat = document.getElementById('prodCat').value;
    const img = document.getElementById('prodImg').value;

    const newProduct = { cat, name, price, img };
    DATA.unshift(newProduct);

    localStorage.setItem("outerbloom_products", JSON.stringify(DATA));

    renderProducts(DATA);
    closeProductModal();
    alert("Produk baru berhasil ditambahkan!");
}

function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = "";
    items.forEach(i => {
        const pesan = encodeURIComponent(`Halo Outerbloom, saya ingin pesan ${i.name} (${i.price})`);
        grid.innerHTML += `
            <div class="card">
                <div class="badge">BEST SELLER</div>
                <img src="${i.img}">
                <div class="card-body">
                    <h3>${i.name}</h3>
                    <p class="price">${i.price}</p>
                    <div class="btn-group">
                        <button class="btn-add-cart" onclick="addToCart('${i.name}', '${i.price}', '${i.img}')" title="Tambah ke keranjang">
                            <i class="fa fa-cart-plus"></i>
                        </button>
                        <button class="btn-order" onclick="window.open('https://wa.me/6282253492479?text=${pesan}')">
                            <i class="fab fa-whatsapp"></i> BELI LANGSUNG
                        </button>
                    </div>
                </div>
            </div>`;
    });
}

function addToCart(name, price, img) {
    const existingItem = CART.find(item => item.name === name);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        CART.push({ name, price, img, qty: 1 });
    }
    saveCart();
    alert(`${name} ditambahkan ke keranjang belanja.`);
}

function saveCart() {
    localStorage.setItem("outerbloom_cart", JSON.stringify(CART));
    updateCartBadge();
}

function updateCartBadge() {
    const totalQty = CART.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cartBadgeCount').innerText = totalQty;
}

function openCartModal() {
    document.getElementById('cartModal').style.display = 'flex';
    renderCartItems();
    closeNav();
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

function parsePrice(priceStr) {
    return parseInt(priceStr.replace(/[^0-9]/g, ''));
}

function formatRupiah(num) {
    return 'Rp ' + num.toLocaleString('id-ID');
}

function changeQty(index, delta) {
    CART[index].qty += delta;
    if (CART[index].qty <= 0) {
        CART.splice(index, 1);
    }
    saveCart();
    renderCartItems();
}

function removeCartItem(index) {
    CART.splice(index, 1);
    saveCart();
    renderCartItems();
}

function renderCartItems() {
    const listContainer = document.getElementById('cartItemsList');
    const totalContainer = document.getElementById('cartTotalPriceValue');
    listContainer.innerHTML = "";

    if (CART.length === 0) {
        listContainer.innerHTML = "<p style='text-align:center; color:#888; padding:20px 0;'>Keranjang Anda masih kosong.</p>";
        totalContainer.innerText = "Rp 0";
        return;
    }

    let grandTotal = 0;

    CART.forEach((item, index) => {
        const numericPrice = parsePrice(item.price);
        const subtotal = numericPrice * item.qty;
        grandTotal += subtotal;

        listContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div class="cart-item-info">
                    <h5>${item.name}</h5>
                    <p>${item.price} x ${item.qty}</p>
                </div>
                <div class="cart-qty-ctrl">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                    <i class="fa fa-trash-alt" style="color:#ff4757; margin-left:10px; cursor:pointer;" onclick="removeCartItem(${index})"></i>
                </div>
            </div>
        `;
    });

    totalContainer.innerText = formatRupiah(grandTotal);
}

function checkoutWhatsApp() {
    if (CART.length === 0) {
        alert("Keranjang belanja kosong!");
        return;
    }

    let textMessage = "Halo Outerbloom, saya ingin memesan daftar rangkaian bunga berikut:\n\n";
    let grandTotal = 0;

    CART.forEach((item, index) => {
        const numericPrice = parsePrice(item.price);
        const subtotal = numericPrice * item.qty;
        grandTotal += subtotal;
        
        textMessage += `${index + 1}. *${item.name}*\n`;
        textMessage += `   Jumlah: ${item.qty} pcs\n`;
        textMessage += `   Harga: ${item.price} (Subtotal: ${formatRupiah(subtotal)})\n\n`;
    });

    textMessage += `----------------------------------\n`;
    textMessage += `*TOTAL TAGIHAN:* ${formatRupiah(grandTotal)}\n\n`;
    textMessage += `Mohon konfirmasi pesanan dan instruksi pembayaran selanjutnya.`;

    const encodedMsg = encodeURIComponent(textMessage);
    window.open(`https://wa.me/6282253492479?text=${encodedMsg}`);
}

function searchFlower() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = DATA.filter(item => item.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

function filterData(cat, btn = null) {
    if(btn) {
        document.querySelectorAll('.cat-tag').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
    }
    const filtered = cat === 'all' ? DATA : DATA.filter(d => d.cat === cat);
    renderProducts(filtered);
    closeNav();
}

function openNav() { document.getElementById("sidebar").style.width = "300px"; }
function closeNav() { document.getElementById("sidebar").style.width = "0"; }
function toggleSub() {
    const m = document.getElementById("subBunga");
    m.style.display = (m.style.display === "block") ? "none" : "block";
}
function scrollToId(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    closeNav();
}