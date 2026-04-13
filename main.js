// ==========================================
// 1. API ФАСАД (Готовий до переходу на бекенд)
// ==========================================
const API = {
    get: (key, def) => {
        try {
            const d = localStorage.getItem(key);
            return d ? JSON.parse(d) : def;
        } catch (e) { return def; }
    },
    set: (key, val) => localStorage.setItem(key, JSON.stringify(val))
};

// ==========================================
// 2. БАЗОВІ ДАНІ ТА ЛОКАЛІЗАЦІЯ
// ==========================================
const i18n = {
    uk: { m1: "Головна", m2: "Каталог", m4: "Контакти", m_order: "Замовити", m_atelier: "Ексклюзив", cart_title: "Кошик", cart_subtotal: "Підсумок:", cart_checkout: "Оформити замовлення", cart_empty: "Ваш кошик порожній", in_stock: "В наявності", out_stock: "Немає", pre_order: "Під замовлення", login: "Увійти", register: "Зареєструватися", login_mob_title: "КАБІНЕТ", theme_mob: "Змінити тему", fav_title: "Улюблене", fav_empty: "Список порожній", btn_buy: "Купити", similar: "Також рекомендуємо", desc_title: "Опис виробу", search_ph: "Пошук...", pd_nav_specs: "Характеристики", pd_nav_review: "Залишити відгук", pd_nav_all: "Усе про товар", pd_nav_photo: "Фото", pd_nav_ask: "Задати питання" },
    en: { m1: "Home", m2: "Catalog", m4: "Contacts", m_order: "Order", m_atelier: "Exclusive", cart_title: "Cart", cart_subtotal: "Subtotal:", cart_checkout: "Checkout", cart_empty: "Your cart is empty", in_stock: "In stock", out_stock: "N/A", pre_order: "Pre-order", login: "Log in", register: "Register", login_mob_title: "PROFILE", theme_mob: "Change Theme", fav_title: "Favorites", fav_empty: "List is empty", btn_buy: "Buy", similar: "You might also like", desc_title: "Description", search_ph: "Search...", pd_nav_specs: "Specs", pd_nav_review: "Leave Review", pd_nav_all: "About Product", pd_nav_photo: "Photos", pd_nav_ask: "Ask a Question" },
    ru: { m1: "Главная", m2: "Каталог", m4: "Контакты", m_order: "Заказать", m_atelier: "Эксклюзив", cart_title: "Корзина", cart_subtotal: "Итого:", cart_checkout: "Оформить заказ", cart_empty: "Ваша корзина пуста", in_stock: "В наличии", out_stock: "Нет", pre_order: "Под заказ", login: "Войти", register: "Регистрация", login_mob_title: "КАБИНЕТ", theme_mob: "Сменить тему", fav_title: "Избранное", fav_empty: "Список пуст", btn_buy: "Купить", similar: "Также рекомендуем", desc_title: "Описание изделия", search_ph: "Поиск...", pd_nav_specs: "Характеристики", pd_nav_review: "Оставить отзыв", pd_nav_all: "Всё о товаре", pd_nav_photo: "Фото", pd_nav_ask: "Задать вопрос" },
    bg: { m1: "Начало", m2: "Каталог", m4: "Контакти", m_order: "Поръчай", m_atelier: "Ексклузив", cart_title: "Количка", cart_subtotal: "Общо:", cart_checkout: "Оформи поръчка", cart_empty: "Вашата количка е празна", in_stock: "В наличност", out_stock: "Изчерпано", pre_order: "По поръчка", login: "Вход", register: "Регистрация", login_mob_title: "ПРОФИЛ", theme_mob: "Смяна на тема", fav_title: "Любими", fav_empty: "Списъкът е празен", btn_buy: "Купи", similar: "Препоръчваме също", desc_title: "Описание", search_ph: "Търсене...", pd_nav_specs: "Характеристики", pd_nav_review: "Остави отзив", pd_nav_all: "За продукта", pd_nav_photo: "Снимки", pd_nav_ask: "Задай въпрос" }
};
const flags = { uk: "ua", en: "gb", ru: "ru", bg: "bg" };

const sunSVG = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
const moonSVG = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`;
const formatterPrice = new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH', maximumFractionDigits: 0 });

// ==========================================
// 3. ГЕНЕРАТОР ДЕМО-ДАНИХ (v5)
// ==========================================

// --- ДАНІ ДЛЯ СТОРІНКИ "ЕКСКЛЮЗИВ" ---
    const demoExclusiveProcess = [
        { id: 1, title: 'Ескіз', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800', desc: 'Створення унікального дизайну на папері.' },
        { id: 2, title: '3D Модель', img: 'https://images.unsplash.com/photo-1603561591411-071c4f75393c?q=80&w=800', desc: 'Побудова точної комп\'ютерної моделі виробу.' },
        { id: 3, title: 'Готовий виріб', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800', desc: 'Втілення вашої мрії у дорогоцінному металі.' }
    ];

    const demoExclusiveMaterials = [
        { id: 'gold', label: 'Є своє золото', selected: true },
        { id: 'stones', label: 'Є своє каміння', selected: false },
        { id: 'none', label: 'Немає матеріалів', selected: false }
    ];

    API.set('bv_exclusive_process', demoExclusiveProcess);
    API.set('bv_exclusive_materials', demoExclusiveMaterials);
    // -------------------------------------

if (!API.get('bv_demo_installed_v5')) {
    const demoCats = [
        { id: 'rings', name: 'Каблучки', subcategories: [{id: 'engagement', name: 'Для заручин'}, {id: 'wedding', name: 'Обручки'}] },
        { id: 'earrings', name: 'Сережки', subcategories: [{id: 'studs', name: 'Пусети'}] },
        { id: 'chains', name: 'Ланцюжки', subcategories: [] },
        { id: 'bracelets', name: 'Браслети', subcategories: [] },
        { id: 'crosses', name: 'Хрестики', subcategories: [] }
    ];

    const baseProducts = [
        { id: '53471-l-02-1', name: 'Золота каблучка з екодіамантами', variant: 'Золото 585', category: 'rings', price: 12500, img: 'https://zolotiyvik.ua/media/catalog/product/cache/7d867076b0c31e5e4acf36489cc1e4f1/1/1/110812310101zolotoe-kolco-s-fianitami-110812310101_1_.webp', desc: 'Вишукана каблучка з екодіамантами.' },
        { id: '1117yh', name: 'Золота каблучка з екодіамантом', variant: 'Золото 585', category: 'rings', price: 9800, img: 'https://zolotiyvik.ua/media/catalog/product/cache/7d867076b0c31e5e4acf36489cc1e4f1/1/1/110812310101zolotoe-kolco-s-fianitami-110812310101_1_.webp', desc: 'Класична золота каблучка.' }
    ];

    const demoProducts = [];
    baseProducts.forEach((bp, index) => {
        for(let j=1; j<=3; j++) {
            let isSale = Math.random() > 0.7;
            demoProducts.push({
                id: `${bp.id}_${j}`, name: bp.name, variant: bp.variant, category: bp.category, subcategory: '',
                price: isSale ? Math.round(bp.price * 0.8) : bp.price, discount: isSale ? bp.price : '', 
                status: Math.random() > 0.9 ? 'out-stock' : 'in-stock', badge: isSale ? 'sale' : (Math.random() > 0.8 ? 'new' : 'none'),
                isSpecial: Math.random() > 0.7, isWeekly: Math.random() > 0.7, featured: Math.random() > 0.5, img: bp.img, desc: bp.desc
            });
        }
    });

    const demoCollage = {
        template: 'grid-6',
        items: [
            { catId: 'rings', title: 'Каблучки', img: 'https://zolotiyvik.ua/media/catalog/product/cache/7d867076b0c31e5e4acf36489cc1e4f1/1/1/110812310101zolotoe-kolco-s-fianitami-110812310101_1_.webp' },
            { catId: 'earrings', title: 'Сережки', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800' }
        ]
    };

    const demoSettings = {
        heroBg: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1920',
        phone: '+38 063 45 40 901', tgLink: 'https://t.me/bv_jewelry_izmail', instLink: 'https://instagram.com/bv_jewelry',
        addr1: 'м. Ізмаїл, вул. Торгова, 68', map1: 'https://share.google/R7G0tiXeqXrx98Uhi',
        addr2: 'м. Ізмаїл, вул. Покровська, 57', map2: 'https://share.google/4fE0MoAJwCdCr4igT'
    };

    const demoBanners = [
        { id: 1, img: 'https://zolotiyvik.ua/media/cmsadvanced/grid/resized/1920/870/1769078629.jpg', link: 'catalog.html#sale' }
    ];

    API.set('bv_categories_tree', demoCats);
    API.set('bv_products', demoProducts);
    API.set('bv_collage_config', demoCollage);
    API.set('bv_settings', demoSettings);
    API.set('bv_banners', demoBanners);
    API.set('bv_demo_installed_v5', true); 
}

let categoriesTree = API.get('bv_categories_tree', []);
let products = API.get('bv_products', []);
let dbServices = API.get('bv_services_data', []);

function getCategoryIconSVG(catId) {
    const id = catId.toLowerCase();
    if (id.includes('ring')) return `<circle cx="12" cy="15" r="5"/><path d="M12 10l-2-3h4l-2 3z"/>`; 
    if (id.includes('earring')) return `<circle cx="12" cy="16" r="3"/><path d="M12 4v9"/><path d="M9 4h6"/>`; 
    if (id.includes('chain') || id.includes('neck')) return `<circle cx="8" cy="12" r="3"/><circle cx="16" cy="12" r="3"/><path d="M11 12h2"/>`; 
    if (id.includes('bracelet')) return `<ellipse cx="12" cy="12" rx="7" ry="3"/><path d="M5 12v2c0 2 3 3 7 3s7-1 7-3v-2"/>`; 
    if (id.includes('cross')) return `<path d="M12 4v16"/><path d="M8 9h8"/>`; 
    return `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/>`; 
}

// ==========================================
// 4. ГЛОБАЛЬНІ ФУНКЦІЇ ІНТЕРФЕЙСУ
// ==========================================
window.toggleMenu = function() {
    const burger = document.getElementById('burger');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    if(burger) burger.classList.toggle('open');
    if(sideMenu) sideMenu.classList.toggle('active');
    if(overlay) overlay.classList.toggle('active');
    document.body.style.overflow = (sideMenu && sideMenu.classList.contains('active')) ? 'hidden' : 'auto';
    
    const searchBox = document.getElementById('mobSearchContainer');
    if(searchBox && !searchBox.classList.contains('hidden')) window.toggleMobileSearch(true);
};

window.toggleAccordion = function(listId, arrowId) {
    const list = document.getElementById(listId);
    const arrow = document.getElementById(arrowId);
    if (!list) return;

    const isOpening = !list.classList.contains('open');

    if (isOpening) {
        const isTopLevel = list.classList.contains('mob-accordion-list');
        const openLists = isTopLevel ? document.querySelectorAll('.mob-accordion-list.open') : list.closest('.mob-accordion-list').querySelectorAll('.mob-nested-list.open');

        openLists.forEach(openList => {
            if (openList !== list) {
                openList.classList.remove('open');
                const title = openList.previousElementSibling;
                if (title && title.getAttribute('onclick')) {
                    const match = title.getAttribute('onclick').match(/'([^']+)',\s*'([^']+)'/);
                    if (match && match[2]) {
                        const oldArrow = document.getElementById(match[2]);
                        if (oldArrow) oldArrow.style.transform = 'rotate(0deg)';
                    }
                }
            }
        });
    }

    list.classList.toggle('open');
    if (arrow) arrow.style.transform = list.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
};

window.toggleTheme = function() {
    const html = document.documentElement;
    const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    API.set('bv_theme', newTheme);
    
    const svg = newTheme === 'light' ? sunSVG : moonSVG;
    const icon = document.getElementById('themeIcon');
    const iconMob = document.getElementById('themeIconMob');
    
    if(icon) icon.innerHTML = svg;
    if(iconMob) iconMob.innerHTML = svg;
};

window.changeLang = function(lang) {
    const currentFlag = document.getElementById('currentFlag');
    const currentLangLabel = document.getElementById('currentLangLabel');
    const currentFlagMob = document.getElementById('currentFlagMob');
    const currentLangLabelMob = document.getElementById('currentLangLabelMob');

    const displayLang = lang === 'uk' ? 'UA' : lang.toUpperCase();

    if(currentFlag) currentFlag.src = `https://flagcdn.com/${flags[lang]}.svg`;
    if(currentLangLabel) currentLangLabel.innerText = displayLang;
    if(currentFlagMob) currentFlagMob.src = `https://flagcdn.com/${flags[lang]}.svg`;
    if(currentLangLabelMob) currentLangLabelMob.innerText = displayLang;
    
    document.querySelectorAll('[data-i18n]').forEach(el => el.innerHTML = i18n[lang][el.dataset.i18n] || el.innerHTML);
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.placeholder = i18n[lang][el.dataset.i18nPlaceholder] || el.placeholder);
    API.set('bv_lang', lang);
    
    window.renderCart();
    window.renderFavDrawer();
    
    if(document.getElementById('specialGrid') && typeof renderHomeSections === 'function') renderHomeSections();
    if(typeof window.renderCatalogBatch === 'function') window.renderCatalogBatch(); 
    if(document.getElementById('productContainer') && typeof renderProductPage === 'function') renderProductPage();
    
    const mobLangList = document.getElementById('mobLangList');
    if(mobLangList && mobLangList.classList.contains('open')) window.toggleAccordion('mobLangList', 'mobLangArrow');
};

// ==========================================
// 4.5. ГЛОБАЛЬНА ГЕНЕРАЦІЯ ЕЛЕМЕНТІВ (Telegram, Наверх, Нижнє меню)
// ==========================================
window.injectGlobalUI = function() {
    // 1. Кнопка Telegram
    if (!document.getElementById('globalContactBtn')) {
        document.body.insertAdjacentHTML('beforeend', `
            <a href="https://t.me/bv_jewelry_izmail" target="_blank" id="globalContactBtn" class="floating-contact-btn tg-link" aria-label="Telegram">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.37-.48 1.02-.73 4-1.74 6.67-2.88 8.01-3.41 3.81-1.52 4.6-1.78 5.12-1.79.11 0 .37.03.54.17.14.12.18.28.2.4.02.07.02.15.02.24z"/></svg>
            </a>
        `);
    }

    // 2. Кнопка Наверх
    if (!document.getElementById('scrollToTopBtn')) {
        document.body.insertAdjacentHTML('beforeend', `
            <button id="scrollToTopBtn" onclick="window.scrollTo({top:0, behavior:'smooth'})" aria-label="Вверх" class="fixed bottom-[165px] right-4 z-[4800] w-12 h-12 bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--gold-muted)] rounded-full flex items-center justify-center text-[var(--gold-muted)] shadow-[0_5px_20px_rgba(0,0,0,0.3)] opacity-0 translate-y-4 pointer-events-none transition-all duration-400 md:bottom-10 md:right-10 hover:bg-[var(--gold-muted)] hover:text-[var(--bg-body)]">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
            </button>
        `);
    }
};

// ==========================================
// 5. КОШИК ТА УЛЮБЛЕНЕ (Drawers)
// ==========================================
window.toggleCart = function() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (!drawer || !overlay) return;

    if (!drawer.classList.contains('active')) {
        drawer.classList.add('active'); overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        drawer.classList.remove('active'); overlay.classList.remove('active');
        if (!document.getElementById('sideMenu')?.classList.contains('active')) document.body.style.overflow = '';
    }
};

window.addToCart = function(id, title, variant, price, img) {
    let cart = API.get('bv_cart', []);
    const existing = cart.find(item => item.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, title, variant, price, img, qty: 1 });
    API.set('bv_cart', cart);
    window.renderCart();
    if (!document.getElementById('cartDrawer').classList.contains('active')) window.toggleCart();
};

window.removeFromCart = function(id) {
    let cart = API.get('bv_cart', []);
    cart = cart.filter(item => item.id !== id);
    API.set('bv_cart', cart);
    window.renderCart();
};

window.renderCart = function() {
    let cart = API.get('bv_cart', []);
    const cartBody = document.getElementById('cartBody');
    const cartBadges = document.querySelectorAll('.cart-badge:not(.fav-badge)');
    const subtotalVal = document.querySelector('.cart-subtotal-val');
    let total = 0, totalQty = 0;
    
    if(!cartBody) return;
    cartBody.innerHTML = '';

    if (cart.length === 0) {
        const lang = API.get('bv_lang', 'uk');
        cartBody.innerHTML = `<div class="cart-empty-msg text-center text-[var(--text-muted)] mt-10">${i18n[lang].cart_empty}</div>`;
        if(subtotalVal) subtotalVal.innerText = formatterPrice.format(0);
        cartBadges.forEach(b => b.innerText = '0');
        return;
    }

    cart.forEach(item => {
        total += item.price * item.qty;
        totalQty += item.qty;
        cartBody.insertAdjacentHTML('beforeend', `
            <div class="cart-item flex gap-4 p-3 rounded-xl mb-3 relative">
                <img src="${item.img}" class="w-20 h-20 object-cover rounded-lg border border-white/10">
                <div class="flex-grow flex flex-col justify-center">
                    <span class="text-sm font-semibold uppercase tracking-wide leading-tight">${item.title}</span>
                    <span class="text-xs text-[var(--text-muted)] mt-1">${item.variant}</span>
                    <span class="text-sm font-bold text-[var(--gold-muted)] mt-2">${formatterPrice.format(item.price)} <span class="text-[10px] text-gray-400 font-normal">x${item.qty}</span></span>
                </div>
                <button class="cart-item-remove absolute top-3 right-3" onclick="removeFromCart('${item.id}')">
                    <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        `);
    });
    if(subtotalVal) subtotalVal.innerText = formatterPrice.format(total);
    cartBadges.forEach(b => b.innerText = totalQty);
};

window.toggleFavDrawer = function() {
    const drawer = document.getElementById('favDrawer');
    const overlay = document.getElementById('favOverlay');
    if (!drawer) return;

    if (!drawer.classList.contains('active')) {
        window.renderFavDrawer();
        drawer.classList.add('active'); 
        if(overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        drawer.classList.remove('active'); 
        if(overlay) overlay.classList.remove('active');
        if (!document.getElementById('sideMenu')?.classList.contains('active')) document.body.style.overflow = '';
    }
};

window.toggleFav = function(id) {
    let favs = API.get('bv_favs', []);
    const idx = favs.indexOf(id);
    if(idx > -1) favs.splice(idx, 1); else favs.push(id);
    API.set('bv_favs', favs);
    
    document.querySelectorAll(`.fav-btn-inline[data-id="${id}"]`).forEach(btn => {
        if(favs.includes(id)) {
            btn.classList.add('text-red-500');
            btn.classList.remove('text-gray-400', 'text-gray-500');
            if(btn.id === 'pd-fav-btn' || btn.id === 'pd-fav-btn-mob' || btn.id === 'pd-fav-btn-desktop-img') {
                btn.classList.add('border-red-500');
                btn.classList.remove('border-[var(--gold-muted)]', 'border-white/20');
            }
            btn.querySelector('svg').setAttribute('fill', 'currentColor');
        } else {
            btn.classList.remove('text-red-500', 'border-red-500');
            btn.classList.add('text-gray-400');
            if(btn.id === 'pd-fav-btn' || btn.id === 'pd-fav-btn-mob' || btn.id === 'pd-fav-btn-desktop-img') {
                btn.classList.add('border-white/20');
                btn.classList.remove('text-gray-400', 'border-[var(--gold-muted)]');
            }
            btn.querySelector('svg').setAttribute('fill', 'none');
        }
    });
    window.renderFavDrawer();
};

window.renderFavDrawer = function() {
    let favsIds = API.get('bv_favs', []);
    const allProducts = API.get('bv_products', []);
    const favBody = document.getElementById('favBody');
    const favBadges = document.querySelectorAll('.fav-badge');
    
    favBadges.forEach(b => b.innerText = favsIds.length);
    if(!favBody) return;

    if (favsIds.length === 0) {
        const lang = API.get('bv_lang', 'uk');
        favBody.innerHTML = `<div class="text-center text-[var(--text-muted)] mt-10" data-i18n="fav_empty">${i18n[lang].fav_empty || "Список порожній"}</div>`;
        return;
    }

    const favProducts = allProducts.filter(p => favsIds.includes(p.id));
    favBody.innerHTML = favProducts.map(prod => `
        <div class="cart-item flex gap-4 p-3 rounded-xl mb-3 relative hover:opacity-80 transition cursor-pointer" onclick="location.href='product.html?id=${prod.id}'">
            <img src="${prod.img}" class="w-16 h-16 object-cover rounded-lg border border-white/10">
            <div class="flex-grow flex flex-col justify-center">
                <span class="text-xs font-semibold uppercase tracking-wide line-clamp-1">${prod.name}</span>
                <span class="text-[10px] text-[var(--text-muted)] mt-1">${prod.variant}</span>
                <span class="text-sm font-bold text-[var(--gold-muted)] mt-1">${formatterPrice.format(prod.discount || prod.price)}</span>
            </div>
            <button class="cart-item-remove absolute top-3 right-3" onclick="event.stopPropagation(); toggleFav('${prod.id}')" title="Видалити">
                <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
        </div>
    `).join('');
};

// ==========================================
// 6. ГЛОБАЛЬНИЙ РЕНДЕР КАРТКИ ТОВАРУ
// ==========================================
window.renderProductCard = function(prod) {
    const lang = API.get('bv_lang', 'uk');
    const isOutOfStock = prod.status === 'out-stock';
    const isPreOrder = prod.status === 'pre-order';
    const isFav = API.get('bv_favs', []).includes(prod.id);
    
    let badgesHtml = '<div class="absolute top-4 left-4 flex flex-col gap-1 z-10">';
    if (isOutOfStock) badgesHtml += `<div class="bg-red-500/90 text-white text-[9px] px-2 py-1 rounded uppercase tracking-widest font-bold backdrop-blur-sm shadow-md">Sold Out</div>`;
    else if (isPreOrder) badgesHtml += `<div class="bg-gray-500/90 text-white text-[9px] px-2 py-1 rounded uppercase tracking-widest font-bold backdrop-blur-sm shadow-md">Під замовлення</div>`;

    if(prod.badge === 'new') badgesHtml += '<div class="bg-blue-500/90 text-white text-[9px] px-2 py-1 rounded uppercase tracking-widest font-bold backdrop-blur-sm shadow-md">Новинка</div>';
    if(prod.badge === 'exclusive') badgesHtml += '<div class="bg-purple-500/90 text-white text-[9px] px-2 py-1 rounded uppercase tracking-widest font-bold backdrop-blur-sm shadow-md">Ексклюзив</div>';
    if(prod.badge === 'sale') badgesHtml += '<div class="bg-rose-500/90 text-white text-[9px] px-2 py-1 rounded uppercase tracking-widest font-bold backdrop-blur-sm shadow-md">Sale</div>';
    badgesHtml += '</div>';

    let priceHtml = `<span class="text-[14px] md:text-[16px] font-bold text-[var(--gold-muted)]">${formatterPrice.format(prod.price)}</span>`;
    if (prod.discount && Number(prod.discount) > 0) {
        priceHtml = `<span class="text-[14px] md:text-[16px] font-bold text-[var(--success)]">${formatterPrice.format(prod.price)}</span><span class="text-[10px] md:text-[12px] text-[var(--text-muted)] line-through ml-2">${formatterPrice.format(prod.discount)}</span>`;
    }

    return `
        <div class="product-card group relative bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col">
            ${badgesHtml}
            
            <a href="product.html?id=${prod.id}" class="relative w-full aspect-square overflow-hidden bg-black block">
                <img src="${prod.img}" class="product-img opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" loading="lazy">
            </a>
            
            <div class="p-3 md:p-4 flex flex-col gap-1 flex-grow">
                <a href="product.html?id=${prod.id}" class="text-[9px] md:text-[10px] uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--gold-muted)] transition">${prod.variant}</a>
                <a href="product.html?id=${prod.id}" class="text-[12px] md:text-[14px] font-medium text-[var(--text-main)] leading-snug hover:text-[var(--gold-muted)] transition line-clamp-2 mt-1">${prod.name}</a>
                <div class="mt-3 mb-1 flex items-center">${priceHtml}</div>
            </div>

            <div class="px-3 md:px-4 py-3 border-t border-white/5 flex justify-between items-center mt-auto">
                ${!isOutOfStock ? `
                <button onclick="addToCart('${prod.id}', '${prod.name}', '${prod.variant}', ${prod.price}, '${prod.img}')" class="flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[var(--text-main)] hover:text-[var(--gold-muted)] transition group/btn">
                    <span>${i18n[lang].btn_buy}</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="transition-transform group-hover/btn:translate-x-1"><path d="M12 4v16m8-8H4"/></svg>
                </button>
                ` : `<span class="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500">${i18n[lang].out_stock}</span>`}
                
                <button class="fav-btn-inline ${isFav ? 'text-red-500' : 'text-gray-400 hover:text-white'} transition" data-id="${prod.id}" onclick="toggleFav('${prod.id}')" title="Улюблене">
                    <svg width="18" height="18" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            </div>
        </div>
    `;
};

// ==========================================
// 8. ДИНАМІЧНА ГЕНЕРАЦІЯ МЕНЮ 
// ==========================================
function generateMenus() {
    const megaCol1 = document.querySelector('.mega-col-1');
    const megaMenu = document.querySelector('.mega-menu');
    const sideMenu = document.getElementById('sideMenu');
    
    // --- Mega Menu (Desktop) ---
    if(megaCol1) {
        megaCol1.innerHTML = '';
        if(megaMenu) megaMenu.querySelectorAll('.mega-col-2').forEach(col => col.remove());
        const megaCol3 = document.querySelector('.mega-col-3');

        categoriesTree.forEach((cat, index) => {
            const isActive = index === 0 ? 'active' : ''; 
            const svgIcon = getCategoryIconSVG(cat.id);
            megaCol1.innerHTML += `<div class="mega-cat-item ${isActive}" data-target="mc-${cat.id}"><svg class="mega-cat-icon" viewBox="0 0 24 24">${svgIcon}</svg><span>${cat.name}</span></div>`;

            let subLinksHtml = '';
            if (cat.subcategories && cat.subcategories.length > 0) {
                cat.subcategories.forEach(sub => { subLinksHtml += `<a href="catalog.html#${sub.id}" class="sub-cat-link">${sub.name}</a>`; });
            }
            subLinksHtml += `<a href="catalog.html#${cat.id}" class="view-all-link mt-auto pt-4">Усі товари →</a>`;

            if(megaMenu && megaCol3) {
                const newCol2 = document.createElement('div');
                newCol2.className = `mega-col-2 ${isActive}`;
                newCol2.id = `mc-${cat.id}`;
                newCol2.innerHTML = subLinksHtml;
                megaMenu.insertBefore(newCol2, megaCol3);
            }
        });

        megaCol1.innerHTML += `<a href="exclusive.html" class="mega-atelier-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7-7-7M5 12h14"/></svg><span data-i18n="m_atelier">Ексклюзив</span></a>`;
        
        document.querySelectorAll('.mega-cat-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                document.querySelectorAll('.mega-cat-item').forEach(i => i.classList.remove('active'));
                document.querySelectorAll('.mega-col-2').forEach(p => p.classList.remove('active'));
                item.classList.add('active');
                
                const targetId = item.getAttribute('data-target').replace('mc-', '');
                const targetCol = document.getElementById('mc-' + targetId);
                if(targetCol) targetCol.classList.add('active');
                
                if(megaCol3) {
                    const featured = products.filter(p => p.category === targetId && p.featured === true).slice(0, 2);
                    if (featured.length === 0) {
                        megaCol3.innerHTML = `<div class="text-gray-500 text-sm text-center opacity-50 p-10 border border-dashed border-white/10 rounded-xl">Тут будуть показані популярні товари цієї категорії</div>`;
                    } else if (featured.length === 1) {
                        const f = featured[0];
                        megaCol3.innerHTML = `<a href="product.html?id=${f.id}" class="preview-card"><div class="preview-img-wrap"><img src="${f.img}"></div><div class="preview-info"><span class="preview-title mt-2">${f.name}</span><span class="price-current">${formatterPrice.format(f.price)}</span></div></a>`;
                    } else {
                        const f1 = featured[0]; const f2 = featured[1];
                        megaCol3.innerHTML = `
                            <a href="catalog.html#${f1.category}" class="preview-card" style="perspective: 1000px;">
                                <div class="preview-img-wrap" style="transform-style: preserve-3d; transition: transform 0.6s;">
                                    <img src="${f1.img}" class="absolute inset-0 w-full h-full object-cover z-10" style="backface-visibility: hidden;">
                                    <img src="${f2.img}" class="absolute inset-0 w-full h-full object-cover" style="transform: rotateY(180deg); backface-visibility: hidden;">
                                </div>
                                <div class="preview-info"><span class="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mt-2">Популярне</span><span class="preview-title">${f1.name} / ${f2.name}</span></div>
                            </a>
                        `;
                        const card = megaCol3.querySelector('.preview-card');
                        const wrap = card.querySelector('.preview-img-wrap');
                        card.onmouseenter = () => wrap.style.transform = 'rotateY(180deg)';
                        card.onmouseleave = () => wrap.style.transform = 'rotateY(0deg)';
                    }
                }
            });
        });
        const firstCat = document.querySelector('.mega-cat-item');
        if(firstCat) firstCat.dispatchEvent(new Event('mouseenter'));
    }

    // --- Side Menu (Mobile) ---
    if(sideMenu) {
        let mobCatHtml = '';
        categoriesTree.forEach(cat => {
            let mobSubLinksHtml = '';
            if (cat.subcategories && cat.subcategories.length > 0) {
                cat.subcategories.forEach(sub => { mobSubLinksHtml += `<a href="catalog.html#${sub.id}" class="sub-cat-link" onclick="window.toggleMenu()">${sub.name}</a>`; });
            }
            mobSubLinksHtml += `<a href="catalog.html#${cat.id}" class="sub-cat-link mt-2" style="color: var(--gold-muted); font-weight: 500;" onclick="window.toggleMenu()">Усі товари →</a>`;
            mobCatHtml += `<div class="mob-nested-wrap"><div class="mob-nested-title" onclick="window.toggleAccordion('mob-sub-${cat.id}', 'mob-arrow-${cat.id}')"><div class="flex items-center gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="opacity-70">${getCategoryIconSVG(cat.id)}</svg> <span>${cat.name}</span></div><svg id="mob-arrow-${cat.id}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="transition-transform duration-300"><path d="M6 9l6 6 6-6"/></svg></div><div class="mob-nested-list" id="mob-sub-${cat.id}"><div class="mob-sub-links">${mobSubLinksHtml}</div></div></div>`;
        });

        const savedLang = API.get('bv_lang', 'uk');
        const displayLang = savedLang === 'uk' ? 'UA' : savedLang.toUpperCase();
        
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const currentThemeIcon = currentTheme === 'light' ? sunSVG : moonSVG;

        sideMenu.innerHTML = `
            <div class="sidebar-top-logo mb-8 border-b border-[var(--border)] pb-8 pt-6 text-center flex flex-col items-center">
                <a href="index.html" class="flex flex-col items-center justify-center gap-1">
                    <span class="text-4xl font-serif text-[var(--gold-muted)] leading-none">BV</span>
                    <span class="text-[10px] tracking-[0.4em] text-[var(--text-main)] uppercase font-light pl-1">jewelry</span>
                </a>
                <p class="text-[9px] text-[var(--text-muted)] mt-4 uppercase tracking-[0.2em]">Вишуканість у деталях</p>
            </div>

            <a href="index.html" data-i18n="m1" class="mob-menu-title" onclick="window.toggleMenu()">Головна</a>
            <a href="exclusive.html" class="mob-atelier-link" onclick="window.toggleMenu()"><span data-i18n="m_atelier">Ексклюзив</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            
            <a href="services.html" class="mob-menu-title" onclick="window.toggleMenu()"><span>Прайс</span></a>

            <div>
                <div class="mob-menu-title" onclick="window.toggleAccordion('mobCatList', 'mobCatArrow')"><span data-i18n="m2">Каталог</span><svg id="mobCatArrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-muted)" stroke-width="2" class="transition-transform duration-300"><path d="M6 9l6 6 6-6"/></svg></div>
                <div class="mob-accordion-list" id="mobCatList" style="gap: 0; padding-left: 0;">${mobCatHtml}</div>
            </div>
            <div>
                <div class="mob-menu-title" onclick="window.toggleAccordion('mobInfoList', 'mobInfoArrow')"><span>Бренд</span><svg id="mobInfoArrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-muted)" stroke-width="2" class="transition-transform duration-300"><path d="M6 9l6 6 6-6"/></svg></div>
                <div class="mob-accordion-list" id="mobInfoList" style="gap: 5px; padding-left: 20px;">
                    <a href="info.html?p=about" class="sub-cat-link py-2" onclick="window.toggleMenu()">Історія Atelier</a>
                    <a href="info.html?p=warranty" class="sub-cat-link py-2" onclick="window.toggleMenu()">Гарантія</a>
                    <a href="info.html?p=terms" class="sub-cat-link py-2" onclick="window.toggleMenu()">Умови</a>
                    <a href="info.html?p=reviews" class="sub-cat-link py-2" onclick="window.toggleMenu()">Відгуки</a>
                </div>
            </div>
            
            <a href="#footer" data-i18n="m4" class="mob-menu-title" onclick="window.toggleMenu()">Контакти</a>
            
            <div class="menu-divider"></div>
            
            <div class="mobile-settings-group pb-10">
                <div>
                    <div class="mob-menu-title" onclick="window.toggleAccordion('mobLangList', 'mobLangArrow')" style="font-size: 14px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="https://flagcdn.com/${flags[savedLang]}.svg" class="flag" id="currentFlagMob">
                            <span>МОВА:</span> 
                            <span id="currentLangLabelMob" style="font-weight: 600; color: var(--text-main);">${displayLang}</span>
                        </div>
                        <svg id="mobLangArrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-muted)" stroke-width="2" class="transition-transform duration-300"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                    <div class="mob-accordion-list" id="mobLangList" style="margin-top: 10px;">
                        <div class="dropdown-item" onclick="window.changeLang('uk')"><img src="https://flagcdn.com/ua.svg" class="flag"> UA</div>
                        <div class="dropdown-item" onclick="window.changeLang('en')"><img src="https://flagcdn.com/gb.svg" class="flag"> EN</div>
                        <div class="dropdown-item" onclick="window.changeLang('ru')"><img src="https://flagcdn.com/ru.svg" class="flag"> RU</div>
                        <div class="dropdown-item" onclick="window.changeLang('bg')"><img src="https://flagcdn.com/bg.svg" class="flag"> BG</div>
                    </div>
                </div>
                
                <div id="themeToggleMob" class="mobile-theme-toggle flex items-center gap-3 py-3 mt-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" onclick="window.toggleTheme()" style="font-size: 14px;">
                    <svg id="themeIconMob" viewBox="0 0 24 24" class="w-5 h-5 fill-none stroke-currentColor stroke-2 text-[var(--gold-muted)]">
                        ${currentThemeIcon}
                    </svg>
                    <span data-i18n="theme_mob">Змінити тему</span>
                </div>
            </div>
        `;
        document.querySelectorAll('[data-i18n]').forEach(el => el.innerHTML = i18n[savedLang][el.dataset.i18n] || el.innerHTML);
    }
}

// ==========================================
// 9. БЕЗКІНЧЕННА БІГУЧА СТРОКА ТА КАРУСЕЛІ
// ==========================================
function createInertiaScroll(containerSelector, trackSelector, speedAuto = 0) {
    const container = document.querySelector(containerSelector);
    const track = document.querySelector(trackSelector);
    if (!container || !track) return;

    let isDown = false; let startX; let startY; let currentX = 0; let velocity = 0; let rafId; let isHorizontalSwipe = false; 

    track.innerHTML += track.innerHTML;

    function getTrackWidth() { return track.scrollWidth / 2; }

    function animate() {
        if (!isDown) {
            currentX += velocity;
            velocity *= 0.95; 
            if (Math.abs(velocity) < 0.1 && speedAuto !== 0) currentX += speedAuto;
        }
        const halfWidth = getTrackWidth();
        if (currentX <= -halfWidth) currentX += halfWidth;
        if (currentX > 0) currentX -= halfWidth;

        track.style.transform = `translateX(${currentX}px)`;
        rafId = requestAnimationFrame(animate);
    }

    container.addEventListener('mousedown', (e) => { isDown = true; container.classList.add('active'); startX = e.pageX - currentX; velocity = 0; cancelAnimationFrame(rafId); });
    container.addEventListener('mouseleave', () => { isDown = false; container.classList.remove('active'); rafId = requestAnimationFrame(animate); });
    container.addEventListener('mouseup', () => { isDown = false; container.classList.remove('active'); rafId = requestAnimationFrame(animate); });
    container.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); const newX = e.pageX - startX; velocity = newX - currentX; currentX = newX; track.style.transform = `translateX(${currentX}px)`; });

    container.addEventListener('touchstart', (e) => { isDown = true; isHorizontalSwipe = false; container.classList.add('active'); startX = e.touches[0].pageX - currentX; startY = e.touches[0].pageY; velocity = 0; cancelAnimationFrame(rafId); }, {passive: true});
    container.addEventListener('touchend', () => { isDown = false; container.classList.remove('active'); rafId = requestAnimationFrame(animate); });
    container.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX; const y = e.touches[0].pageY;
        if (!isHorizontalSwipe) {
            if (Math.abs(y - startY) > Math.abs(x - (startX + currentX))) { isDown = false; return; }
            isHorizontalSwipe = true; 
        }
        const newX = x - startX; velocity = newX - currentX; currentX = newX;
        track.style.transform = `translateX(${currentX}px)`;
    }, {passive: true});

    container.addEventListener('wheel', (e) => { 
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); velocity = -e.deltaX * 0.5; }
    }, { passive: false });

    rafId = requestAnimationFrame(animate);
}

window.initMarqueeSim = function() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
    const categoriesHtml = categoriesTree.map(c => `<a href="catalog.html#${c.id}" class="marquee-item">${c.name}</a>`).join('');
    track.innerHTML = Array(15).fill(categoriesHtml).join('');
    createInertiaScroll('.marquee-wrapper', '#marqueeTrack', -0.5); 
};

window.initPromoCarouselSim = function() { createInertiaScroll('#promoCarouselContainer', '#specialGrid', 0); };
window.initWeeklyCarouselSim = function() { createInertiaScroll('#weeklyCarouselContainer', '#weeklyGrid', 0); };

// ==========================================
// 10. СЛАЙДЕР БАНЕРІВ
// ==========================================
window.initBannerSlider = function() {
    const banners = API.get('bv_banners', []);
    const container = document.getElementById('mainBannerContainer');
    if(!container || banners.length === 0) return;

    let html = '<div class="banner-track" id="bannerTrack">';
    banners.forEach(b => { html += `<div class="banner-slide"><a href="${b.link}"><img src="${b.img}" alt="Promo"></a></div>`; });
    html += '</div>';

    if(banners.length > 1) {
        html += `<button class="banner-arrow prev" onclick="moveBanner(-1)">&#10094;</button>`;
        html += `<button class="banner-arrow next" onclick="moveBanner(1)">&#10095;</button>`;
        html += `<div class="banner-dots">`;
        banners.forEach((_, i) => { html += `<span class="banner-dot ${i===0?'active':''}" onclick="goToBanner(${i})"></span>`; });
        html += `</div>`;
    }

    container.innerHTML = html;
    
    if(banners.length > 1) {
        window.currentBanner = 0; window.bannerCount = banners.length;
        window.bannerInterval = setInterval(() => moveBanner(1), 5000);
    }
};

window.moveBanner = function(dir) {
    if(typeof window.currentBanner === 'undefined') return;
    clearInterval(window.bannerInterval);
    let newIndex = window.currentBanner + dir;
    if(newIndex >= window.bannerCount) newIndex = 0;
    if(newIndex < 0) newIndex = window.bannerCount - 1;
    goToBanner(newIndex);
    window.bannerInterval = setInterval(() => moveBanner(1), 5000);
};

window.goToBanner = function(index) {
    const track = document.getElementById('bannerTrack');
    const dots = document.querySelectorAll('.banner-dot');
    if(!track) return;
    window.currentBanner = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    if(dots[index]) dots[index].classList.add('active');
};

// ==========================================
// 11. КОЛАЖ І ГОЛОВНА ТА СЕРВІСИ
// ==========================================
window.renderHomeCollage = function() {
    const collage = document.getElementById('art-collage');
    if (!collage) return;
    const config = API.get('bv_collage_config', { template: 'grid-6', items: [] });
    collage.innerHTML = ''; collage.className = 'art-collage ' + config.template;
    
    config.items.forEach((item, index) => {
        let gClass = 't-earrings'; 
        if(config.template === 'grid-6') {
            const classes = ['t-rings', 't-earrings', 't-bracelets', 't-neck', 't-wedding', 't-crosses'];
            gClass = classes[index % classes.length];
        } else if (config.template === 'grid-4') { gClass = 't-rings'; }
        
        collage.innerHTML += `<div class="collage-tile ${gClass}" onclick="location.href='catalog.html#${item.catId}'"><img src="${item.img}" alt="${item.title}"><div class="collage-label">${item.title}</div></div>`;
    });
    
    const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.1 });
    document.querySelectorAll('.collage-tile').forEach(el => observer.observe(el));
};

window.renderHomeSections = function() {
    if(document.getElementById('specialGrid')) document.getElementById('specialGrid').innerHTML = products.filter(p => p.isSpecial).slice(0, 8).map(window.renderProductCard).join('');
    if(document.getElementById('weeklyGrid')) document.getElementById('weeklyGrid').innerHTML = products.filter(p => p.isWeekly).slice(0, 8).map(window.renderProductCard).join('');
};

window.applyAdminSettings = function() {
    const settings = API.get('bv_settings', null);
    if (settings) {
        const heroBg = document.querySelector('.hero-img-bg');
        if (heroBg && settings.heroBg) heroBg.style.backgroundImage = `url('${settings.heroBg}')`;
        if (settings.phone) {
            document.querySelectorAll('.header-phone-link, .phone-num').forEach(link => { if(link) link.href = `tel:${settings.phone.replace(/\s+/g, '')}`; });
            document.querySelectorAll('.header-phone-text, .phone-num span').forEach(span => { if(span) span.innerText = settings.phone; });
        }
        if(settings.tgLink) document.querySelectorAll('.tg-link').forEach(link => link.href = settings.tgLink);
        if(settings.instLink) document.querySelectorAll('.inst-link').forEach(link => link.href = settings.instLink);
        if(settings.map1) { const link = document.querySelector('.addr-link-1'); if(link) link.href = settings.map1; }
        if(settings.addr1) { const txt = document.querySelector('.addr-text-1'); if(txt) txt.innerText = settings.addr1; }
        if(settings.map2) { const link = document.querySelector('.addr-link-2'); if(link) link.href = settings.map2; }
        if(settings.addr2) { const txt = document.querySelector('.addr-text-2'); if(txt) txt.innerText = settings.addr2; }
    }
};

window.renderServicesTable = function() {
    const tbody = document.getElementById('servicesPriceBody');
    if (!tbody) return;
    if (dbServices.length === 0) {
        tbody.innerHTML = `<tr><td colspan="2" class="text-center py-10 text-[var(--text-muted)]">Прайс порожній або завантажується з Адмін-панелі.</td></tr>`;
        return;
    }
    const html = dbServices.map(s => `
        <tr class="border-b border-[var(--border)] text-[var(--text-main)] hover:bg-[var(--gold-muted)] hover:bg-opacity-10 transition-colors">
            <td class="py-4 px-2 md:px-4 font-medium">${s.service_name}</td>
            <td class="py-4 px-2 md:px-4 text-right font-semibold text-[var(--gold-muted)]">${s.service_price.toLocaleString('uk-UA')} ₴</td>
        </tr>
    `).join('');
    tbody.innerHTML = html;
};

// ==========================================
// 11.5 СИСТЕМА КОРИСТУВАЧІВ ТА ПОШУК
// ==========================================

window.executeSearch = function(query) {
    if (!query || !query.trim()) return;
    window.location.href = `catalog.html?search=${encodeURIComponent(query.trim())}`;
};

window.toggleMobileSearch = function(forceClose = null) {
    const searchBox = document.getElementById('mobSearchContainer');
    if (!searchBox) return;
    if (forceClose === true) { searchBox.classList.add('hidden'); return; }
    if (forceClose === false) { searchBox.classList.remove('hidden'); }
    else { searchBox.classList.toggle('hidden'); }
    
    if (!searchBox.classList.contains('hidden')) {
        setTimeout(() => { const inp = document.getElementById('mobSearchOverlayInput'); if (inp) inp.focus(); }, 100);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const deskSearch = document.querySelector('.search-input.desktop-only .search-input') || document.querySelector('.desktop-only .search-input');
    if (deskSearch) { deskSearch.addEventListener('keypress', (e) => { if (e.key === 'Enter') window.executeSearch(e.target.value); }); }

    const overlayInput = document.getElementById('mobSearchOverlayInput');
    if (overlayInput) { overlayInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') window.executeSearch(e.target.value); }); }
});

let isRegisterMode = false;

window.openAuthModal = function() {
    if(document.getElementById('sideMenu') && document.getElementById('sideMenu').classList.contains('active')){ window.toggleMenu(); }

    const currentUser = API.get('bv_current_user', null);
    if (currentUser) {
        if (currentUser.role === 'admin') { sessionStorage.setItem('isAdminAuth', 'true'); window.location.href = 'admin.html'; 
        } else { window.location.href = 'profile.html'; }
        return; 
    }

    const modal = document.getElementById('authModal');
    if(!modal) return;
    modal.classList.remove('hidden'); setTimeout(() => modal.classList.remove('opacity-0'), 10);
    document.getElementById('authForm').classList.remove('hidden');
    isRegisterMode = false; updateAuthView();
};

window.closeAuthModal = function() {
    const modal = document.getElementById('authModal');
    if(modal) { modal.classList.add('opacity-0'); setTimeout(() => modal.classList.add('hidden'), 300); }
};

window.toggleAuthMode = function(e) {
    e.preventDefault(); isRegisterMode = !isRegisterMode; updateAuthView();
};

function updateAuthView() {
    document.getElementById('authTitle').innerText = isRegisterMode ? 'Створення акаунта' : 'Вхід у кабінет';
    document.getElementById('authSubmitBtn').innerText = isRegisterMode ? 'Зареєструватися' : 'Увійти';
    document.getElementById('authToggleLink').innerText = isRegisterMode ? 'Вже є акаунт? Увійти' : 'Зареєструватися';
}

document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    if(authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('authUser').value.trim();
            const pass = document.getElementById('authPass').value.trim();
            let users = API.get('bv_users', []);
            
            if (isRegisterMode) {
                if(users.find(u => u.username.toLowerCase() === user.toLowerCase())) { alert('Користувач з таким логіном вже існує!'); return; }
                const newUser = { username: user, password: pass, role: 'user', favs: [] };
                users.push(newUser); API.set('bv_users', users); API.set('bv_current_user', newUser); API.set('bv_favs', []); 
                window.location.href = 'profile.html';
            } else {
                const found = users.find(u => u.username.toLowerCase() === user.toLowerCase() && u.password === pass);
                if (found) {
                    API.set('bv_current_user', found); API.set('bv_favs', found.favs || []); 
                    if(found.role === 'admin') { sessionStorage.setItem('isAdminAuth', 'true'); window.location.href = 'admin.html'; } 
                    else { window.location.href = 'profile.html'; }
                } else { alert('Невірний логін або пароль!'); }
            }
        });
    }
});

window.logoutUser = function() {
    const currentUser = API.get('bv_current_user');
    if(currentUser) {
        let users = API.get('bv_users', []);
        const idx = users.findIndex(u => u.username === currentUser.username);
        if(idx !== -1) { users[idx].favs = API.get('bv_favs', []); API.set('bv_users', users); }
    }
    API.set('bv_current_user', null); API.set('bv_favs', []); 
    sessionStorage.removeItem('isAdminAuth');
    window.location.href = 'index.html'; 
};

// ==========================================
// 12. ГЛОБАЛЬНИЙ СТАРТ ТА СКРОЛ
// ==========================================
window.onload = () => { 
    if(typeof window.injectGlobalUI === 'function') window.injectGlobalUI();
    if(typeof generateMenus === 'function') generateMenus();
    if(typeof initBannerSlider === 'function') initBannerSlider();
    if(typeof renderHomeCollage === 'function') renderHomeCollage();
    
    if(document.getElementById('marqueeTrack') && typeof initMarqueeSim === 'function') initMarqueeSim();
    if(document.getElementById('specialGrid') && typeof initPromoCarouselSim === 'function') {
        renderHomeSections(); 
        setTimeout(initPromoCarouselSim, 100);
    }
    if(document.getElementById('weeklyGrid') && typeof initWeeklyCarouselSim === 'function') setTimeout(initWeeklyCarouselSim, 100);

    if(document.getElementById('productContainer') && typeof renderProductPage === 'function') { renderProductPage(); }

    const savedLang = API.get('bv_lang', 'uk');
    if(typeof window.changeLang === 'function') window.changeLang(savedLang);

    const savedTheme = API.get('bv_theme', 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = document.getElementById('themeIcon');
    const iconMob = document.getElementById('themeIconMob');
    const svg = savedTheme === 'light' ? sunSVG : moonSVG;
    if(icon) icon.innerHTML = svg;
    if(iconMob) iconMob.innerHTML = svg;

    const yearEl = document.getElementById('currentYear');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    if(typeof window.renderCart === 'function') window.renderCart(); 
    if(typeof window.renderFavDrawer === 'function') window.renderFavDrawer();
    if(typeof window.applyAdminSettings === 'function') window.applyAdminSettings(); 

    const burgerBtn = document.getElementById('burger');
    if(burgerBtn) { burgerBtn.onclick = function(e) { e.stopPropagation(); if(typeof window.toggleMenu === 'function') window.toggleMenu(); }; }
};

// ГЛОБАЛЬНИЙ ОБРОБНИК СКРОЛУ
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if(header) header.classList.toggle('scrolled', window.scrollY > 50);

    const topBtn = document.getElementById('scrollToTopBtn');
    const tgBtn = document.getElementById('globalContactBtn');

    if(window.scrollY > 400) { 
        if(topBtn) {
            topBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
            topBtn.classList.add('opacity-100', 'translate-y-0');
        }
        if(tgBtn) tgBtn.classList.add('lifted'); 
    } else {
        if(topBtn) {
            topBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
            topBtn.classList.remove('opacity-100', 'translate-y-0');
        }
        if(tgBtn) tgBtn.classList.remove('lifted'); 
    }
});

const overlay = document.getElementById('overlay');
const cartOverlay = document.getElementById('cartOverlay');
const favOverlay = document.getElementById('favOverlay');

if(overlay) overlay.onclick = () => { if(typeof window.toggleMenu === 'function') window.toggleMenu(); };
if(cartOverlay) cartOverlay.onclick = () => { if(typeof window.toggleCart === 'function') window.toggleCart(); };
if(favOverlay) favOverlay.onclick = () => { if(typeof window.toggleFavDrawer === 'function') window.toggleFavDrawer(); };