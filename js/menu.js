window.onload = function() {
  var currentLocation = window.location.pathname;
  var menuItems = document.querySelectorAll("#menu a");

  menuItems.forEach(function(item) {
    // Compara el href con la ruta actual
    if (currentLocation.includes(item.getAttribute('href'))) {
      item.classList.add("active");
    }
  });
}
