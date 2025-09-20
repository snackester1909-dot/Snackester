const cartBtn = document.getElementById('cart-btn');
const cartPanel = document.getElementById('cart-panel');
const closeCart = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout');
const orderForm = document.getElementById('order-form');

let cart = [];

function updateCart() {
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItemsList.appendChild(li);
  });
  cartTotal.textContent = total;
  cartCount.textContent = cart.length;
}

document.querySelectorAll('.add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    cart.push({ name, price });
    updateCart();
    alert(`${name} added to cart!`);
  });
});

cartBtn.addEventListener('click', () => {
  cartPanel.classList.add('open');
});

closeCart.addEventListener('click', () => {
  cartPanel.classList.remove('open');
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Checkout successful! (Demo)');
  cart = [];
  updateCart();
  cartPanel.classList.remove('open');
});

orderForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Order placed successfully! We will contact you soon.');
  orderForm.reset();
});
