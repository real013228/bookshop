function highlightMenuItem(item) {
    item.classList.add('menu__link--active');
}

// Функция для снятия подсветки активного пункта меню при уходе мыши
function unhighlightMenuItem(item) {
    item.classList.remove('menu__link--active');
}