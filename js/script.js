const translations = {
    ru: {
        navHome: "Главная",
        navCatalog: "Каталог",
        navAbout: "О нас",
        navContacts: "Контакты",
        cartTitle: "Корзина",
        heroTitle: "Всё для ваших любимых питомцев",
        heroDesc: "Качественные корма, игрушки и аксессуары по доступным ценам.",
        heroBtn: "Перейти к товарам",
        catalogTitle: "Каталог товаров",
        searchPlaceholder: "Поиск по товарам...",
        catAll: "Все товары",
        catCats: "Кошки",
        catDogs: "Собаки",
        catBirds: "Птицы",
        catFish: "Рыбки",
        catLabel: "Категория",
        noResults: "Товары не найдены :(",
        aboutTitle: "Почему выбирают нас",
        feat1Title: "Быстрая доставка",
        feat1Desc: "Доставим заказ в течение дня по всему городу.",
        feat2Title: "Гарантия качества",
        feat2Desc: "Только проверенные бренды и свежие корма.",
        feat3Title: "Низкие цены",
        feat3Desc: "Приятные скидки постоянным покупателям.",
        contactsTitle: "Связаться с нами",
        namePlaceholder: "Ваше имя",
        emailPlaceholder: "Ваш Email",
        msgPlaceholder: "Сообщение",
        sendBtn: "Отправить",
        speakBtn: "Озвучить",
        buyBtn: "Купить",
        cartHeader: "Ваша корзина",
        cartTotal: "Итого:",
        clearCart: "Очистить корзину",
        emptyCart: "Корзина пуста",
        // Товары
        prod1Title: "Сухой корм для кошек",
        prod2Title: "Игрушка косточка для собак",
        prod3Title: "Клетка для попугая",
        prod4Title: "Аквариум 20 литров",
        prod5Title: "Когтеточка столбик",
        prod6Title: "Поводок-рулетка",
        desc1: "Полнорационный сухой корм премиум класса для взрослых кошек всех пород.",
        desc2: "Прочная виниловая игрушка в виде косточки для собак мелких и средних пород.",
        desc3: "Просторная металлизированная клетка с жердочками и кормушкой для попугаев.",
        desc4: "Стеклянный прямоугольный аквариум объёмом 20 литров с подсветкой.",
        desc5: "Устойчивый столбик-когтеточка с джутовой обмоткой.",
        desc6: "Надёжный поводок-рулетка длиною 5 метров для прогулок."
    },
    en: {
        navHome: "Home",
        navCatalog: "Catalog",
        navAbout: "About Us",
        navContacts: "Contacts",
        cartTitle: "Cart",
        heroTitle: "Everything for your beloved pets",
        heroDesc: "Quality food, toys and accessories at affordable prices.",
        heroBtn: "Browse Products",
        catalogTitle: "Product Catalog",
        searchPlaceholder: "Search products...",
        catAll: "All Products",
        catCats: "Cats",
        catDogs: "Dogs",
        catBirds: "Birds",
        catFish: "Fish",
        catLabel: "Category",
        noResults: "No products found :(",
        aboutTitle: "Why Choose Us",
        feat1Title: "Fast Delivery",
        feat1Desc: "We deliver orders within the day across the entire city.",
        feat2Title: "Quality Guarantee",
        feat2Desc: "Only trusted brands and fresh pet food.",
        feat3Title: "Low Prices",
        feat3Desc: "Great discounts for returning customers.",
        contactsTitle: "Contact Us",
        namePlaceholder: "Your Name",
        emailPlaceholder: "Your Email",
        msgPlaceholder: "Message",
        sendBtn: "Send",
        speakBtn: "Listen",
        buyBtn: "Buy",
        cartHeader: "Your Shopping Cart",
        cartTotal: "Total:",
        clearCart: "Clear Cart",
        emptyCart: "Cart is empty",
        // Products
        prod1Title: "Dry cat food",
        prod2Title: "Dog bone toy",
        prod3Title: "Bird cage",
        prod4Title: "Aquarium 20 liters",
        prod5Title: "Scratch post",
        prod6Title: "Retractable leash",
        desc1: "Premium full-feed dry food for adult cats of all breeds.",
        desc2: "Durable vinyl bone toy for small and medium dogs.",
        desc3: "Spacious metal cage with perches for parrots.",
        desc4: "Glass rectangular aquarium of 20 liters with lighting.",
        desc5: "Sturdy scratching post with jute wrapping.",
        desc6: "Reliable 5-meter retractable leash for walks."
    }
};

let currentLang = localStorage.getItem('siteLang') || 'ru';
let cart = JSON.parse(localStorage.getItem('siteCart')) || [];

const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('.category-btn');
const cards = document.querySelectorAll('.card');
const noResults = document.getElementById('noResults');
const langToggleBtn = document.getElementById('langToggleBtn');

let activeCategory = 'all';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('siteLang', lang);
    langToggleBtn.textContent = lang === 'ru' ? 'EN' : 'RU';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}

langToggleBtn.addEventListener('click', () => {
    setLanguage(currentLang === 'ru' ? 'en' : 'ru');
});

function filterProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach(card => {
        const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch = cardTitle.includes(searchText);
        const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);

        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

searchInput.addEventListener('input', filterProducts);

categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        activeCategory = this.dataset.category;
        filterProducts();
    });
});

// Модальное окно и описания
const productModal = document.getElementById('productModal');
const closeProductModal = document.getElementById('closeProductModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const screenReaderBtn = document.getElementById('screenReaderBtn');
const modalBuyBtn = document.getElementById('modalBuyBtn');

let currentActiveCardData = null;

cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('buy-btn')) return;

        const num = index + 1;
        currentActiveCardData = {
            id: card.dataset.id,
            title: translations[currentLang][`prod${num}Title`],
            category: card.querySelector('.cat-name').textContent,
            price: card.dataset.price,
            imgSrc: card.querySelector('img').src,
            description: translations[currentLang][`desc${num}`]
        };

        modalImg.src = currentActiveCardData.imgSrc;
        modalTitle.textContent = currentActiveCardData.title;
        modalCategory.textContent = `${translations[currentLang].catLabel}: ${currentActiveCardData.category}`;
        modalPrice.textContent = `${currentActiveCardData.price} руб.`;
        modalDescription.textContent = currentActiveCardData.description;

        productModal.classList.add('open');
    });
});

closeProductModal.addEventListener('click', () => {
    productModal.classList.remove('open');
    window.speechSynthesis.cancel();
});

screenReaderBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const textToRead = `${modalTitle.textContent}. ${modalCategory.textContent}. Цена: ${modalPrice.textContent}. Описание: ${modalDescription.textContent}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = currentLang === 'ru' ? 'ru-RU' : 'en-US';
        window.speechSynthesis.speak(utterance);
    }
});

// Корзина
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartModal = document.getElementById('closeCartModal');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartCount = document.getElementById('cartCount');
const clearCartBtn = document.getElementById('clearCartBtn');

function updateCartUI() {
    localStorage.setItem('siteCart', JSON.stringify(cart));
    cartCount.textContent = cart.reduce((sum, item) => sum + item.count, 0);

    cartItemsList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = `<p>${translations[currentLang].emptyCart}</p>`;
    } else {
        cart.forEach(item => {
            total += item.price * item.count;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div>
                    <strong>${item.title}</strong><br>
                    ${item.price} руб. x ${item.count}
                </div>
                <div>
                    <button onclick="changeCount(${item.id}, 1)">+</button>
                    <button onclick="changeCount(${item.id}, -1)">-</button>
                </div>
            `;
            cartItemsList.appendChild(div);
        });
    }
    cartTotalPrice.textContent = total;
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.count += 1;
    } else {
        cart.push({ ...product, count: 1 });
    }
    updateCartUI();
}

window.changeCount = function (id, delta) {
    const item = cart.find(i => i.id == id);
    if (item) {
        item.count += delta;
        if (item.count <= 0) {
            cart = cart.filter(i => i.id != id);
        }
    }
    updateCartUI();
};

document.querySelectorAll('.buy-btn').forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = e.target.closest('.card');
        const num = index + 1;
        addToCart({
            id: card.dataset.id,
            title: translations[currentLang][`prod${num}Title`],
            price: Number(card.dataset.price)
        });
    });
});

modalBuyBtn.addEventListener('click', () => {
    if (currentActiveCardData) {
        addToCart({
            id: currentActiveCardData.id,
            title: currentActiveCardData.title,
            price: Number(currentActiveCardData.price)
        });
        productModal.classList.remove('open');
    }
});

cartBtn.addEventListener('click', () => cartModal.classList.add('open'));
closeCartModal.addEventListener('click', () => cartModal.classList.remove('open'));
clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCartUI();
});

window.addEventListener('click', (e) => {
    if (e.target === productModal) productModal.classList.remove('open');
    if (e.target === cartModal) cartModal.classList.remove('open');
});

// Анимация при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));

// Кнопка наверх
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Слайдер
const sliderTrack = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentSlide = 0;

function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

setLanguage(currentLang);
updateCartUI();

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы и переход на 404

        const formData = new FormData(contactForm);

        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            alert(currentLang === 'ru' ? 'Спасибо! Ваше сообщение отправлено.' : 'Thank you! Your message has been sent.');
            contactForm.reset(); // Очищаем поля формы
        })
        .catch((error) => {
            alert(currentLang === 'ru' ? 'Ошибка при отправке сообщения.' : 'Error sending message.');
            console.error('Netlify Form Error:', error);
        });
    });
}