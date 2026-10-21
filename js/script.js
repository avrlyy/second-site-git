// Элементы
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('.category-btn');
const cards = document.querySelectorAll('.card');
const noResults = document.getElementById('noResults');

let activeCategory = 'all'; // Храним выбранную категорию

// Главная функция фильтрации (проверяет и текст, и категорию)
function filterProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach(card => {
        const cardTitle = card.textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        // Проверяем совпадает ли текст И категория
        const matchesSearch = cardTitle.includes(searchText);
        const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);

        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Показываем надпись, если ничего не нашли
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// 1. Событие для живого поиска
searchInput.addEventListener('input', filterProducts);

// 2. События для кнопок категорий
categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Переключаем активную кнопку
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Запоминаем категорию и фильтруем
        activeCategory = this.dataset.category;
        filterProducts();
    });
});