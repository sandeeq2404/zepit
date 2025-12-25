const API_BASE = "http://127.0.0.1:8000";

let cart = [];

/* -------------------- MENU (Customer) -------------------- */

async function loadMenu() {
    const res = await fetch(`${API_BASE}/menu`);
    const menuItems = await res.json();

    const menuContainer = document.getElementById("menu-container");
    if (!menuContainer) return;

    menuContainer.innerHTML = "";

    menuItems.forEach(item => {
        if (!item.is_available) return;

        const div = document.createElement("div");
        div.className = "menu-item";

        div.innerHTML = `
            <span>${item.name} - ₹${item.price}</span>
            <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">Add</button>
        `;

        menuContainer.appendChild(div);
    });
}

function addToCart(id, name, price) {
    cart.push({ id, name, price, qty: 1 });
    alert(`${name} added to cart`);
}

async function placeOrder() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    const orderData = {
        items: cart
    };

    await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    });

    alert("Order placed successfully!");
    cart = [];
}

const orderBtn = document.getElementById("place-order-btn");
if (orderBtn) {
    orderBtn.addEventListener("click", placeOrder);
}

/* -------------------- KITCHEN -------------------- */

async function loadOrders() {
    const res = await fetch(`${API_BASE}/orders`);
    const orders = await res.json();

    const ordersContainer = document.getElementById("orders-container");
    if (!ordersContainer) return;

    ordersContainer.innerHTML = "";

    orders.forEach(order => {
        const div = document.createElement("div");
        div.className = "order-card";

        div.innerHTML = `
            <div>
                <strong>Order #${order.id}</strong><br>
                Status: ${order.status}<br>
                Items: ${JSON.stringify(order.items)}
            </div>
        `;

        ordersContainer.appendChild(div);
    });
}

/* -------------------- INIT -------------------- */

loadMenu();
loadOrders();
setInterval(loadOrders, 5000);
