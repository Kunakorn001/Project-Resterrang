/**
* Template Name: Yummy
* Template URL: https://bootstrapmade.com/yummy-bootstrap-restaurant-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  console.log("main.js loaded");

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Cart functionality
   */
  const cart = [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCountSpan = document.getElementById('cart-count');
  const checkoutButton = document.querySelector('#cartModal .btn-primary'); // Select the Checkout button
  const cartTotalContainer = document.getElementById('cart-total');

  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountSpan.innerText = totalItems;
    if (totalItems > 0) {
      cartCountSpan.classList.remove('d-none'); // Show the badge
    } else {
      cartCountSpan.classList.add('d-none'); // Hide the badge
    }
  }

  function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalContainer.innerText = '';
      return;
    }

    const ul = document.createElement('ul');
    ul.classList.add('list-group');
    let totalPrice = 0;
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      li.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price}</span>
        <div>
          <button class="btn btn-sm btn-secondary" onclick="decreaseQuantity(${index})">-</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="btn btn-sm btn-secondary" onclick="increaseQuantity(${index})">+</button>
        </div>
      `;
      ul.appendChild(li);
      totalPrice += parseFloat(item.price.replace('$', '')) * item.quantity;
    });
    cartItemsContainer.appendChild(ul);
    cartTotalContainer.innerText = `Total: $${totalPrice.toFixed(2)}`;
    updateCartCount(); // Update count when modal is updated
  }

  window.increaseQuantity = function(index) {
    cart[index].quantity++;
    updateCartModal();
  }

  window.decreaseQuantity = function(index) {
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
    }
    updateCartModal();
  }

  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const menuItem = event.target.closest('.menu-item');
      const name = menuItem.querySelector('h4').innerText;
      const price = menuItem.querySelector('.price').innerText;
      
      const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
      const confirmModalBody = document.getElementById('confirmModalBody');
      confirmModalBody.innerHTML = `Add <strong>${name}</strong> to cart for <strong>${price}</strong>?`;
      
      const confirmBtn = document.getElementById('confirmAddToCart');
      
      const addAndClose = () => {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({ name, price, quantity: 1 });
        }
        updateCartModal();
        updateCartCount();
        console.log('Item added to cart');
        confirmModal.hide();
        confirmBtn.removeEventListener('click', addAndClose);
      };

      confirmBtn.addEventListener('click', addAndClose, { once: true });

      confirmModal.show();

    });
  });

  const cartModal = document.getElementById('cartModal');
  if (cartModal) {
    cartModal.addEventListener('show.bs.modal', () => {
      updateCartModal();
    });
  }

  // Checkout button functionality
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (cart.length > 0) {
        alert('คุณทำรายการสั่งซื้อสำเร็จ'); // Your order has been placed successfully
        cart.length = 0; // Clear the cart
        updateCartModal(); // Update modal to show empty cart
        updateCartCount(); // Update cart count to 0
        // Optionally, close the modal here
        const modalInstance = bootstrap.Modal.getInstance(cartModal);
        if (modalInstance) {
          modalInstance.hide();
        }
      } else {
        alert('Your cart is empty. Please add items before checking out.');
      }
    });
  }

  updateCartCount(); // Initialize cart count on page load

  // Food Detail Modal Logic
  const detailButtons = document.querySelectorAll('.details-btn');
  const foodDetailModal = new bootstrap.Modal(document.getElementById('foodDetailModal'));
  const foodDetailModalBody = document.getElementById('foodDetailModalBody');
  const foodDetailModalLabel = document.getElementById('foodDetailModalLabel');

  detailButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const menuItem = event.target.closest('.menu-item');
      const name = menuItem.querySelector('h4').innerText;
      const ingredients = menuItem.dataset.ingredients;
      const taste = menuItem.dataset.taste;

      foodDetailModalLabel.innerText = name;
      foodDetailModalBody.innerHTML = `
        <p><strong>ส่วนประกอบ:</strong> ${ingredients}</p>
        <p><strong>รสชาติ:</strong> ${taste}</p>
      `;

      foodDetailModal.show();
    });
  });

  /**
   * Activate menu tab based on URL hash.
   */
  function activateMenuTab() {
    const hash = window.location.hash;
    if (hash) {
      const tabTrigger = document.querySelector(`.nav-tabs a[data-bs-target="${hash}"]`);
      if (tabTrigger) {
        // Use Bootstrap's Tab constructor to show the tab
        const tab = new bootstrap.Tab(tabTrigger);
        tab.show();
        
        // Scroll to the menu section
        const menuSection = document.querySelector('#menu');
        if (menuSection) {
          setTimeout(() => {
            let scrollMarginTop = getComputedStyle(menuSection).scrollMarginTop;
            window.scrollTo({
              top: menuSection.offsetTop - parseInt(scrollMarginTop),
              behavior: 'smooth'
            });
          }, 300); // A small delay to allow tab to be shown
        }
      }
    }
  }
  window.addEventListener('load', activateMenuTab);
  window.addEventListener('hashchange', activateMenuTab);

})();