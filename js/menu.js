// Seleccionar todos los enlaces del menú
const menuItems = document.querySelectorAll('nav ul li a');

// Función para eliminar la clase 'active' de todos los enlaces
function removeActiveClass() {
  menuItems.forEach(item => {
    item.classList.remove('active');
  });
}

// Añadir el evento de clic a cada enlace del menú
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    removeActiveClass();  // Elimina la clase 'active' de todos los enlaces
    item.classList.add('active');  // Añade la clase 'active' al enlace clickeado
  });
});
