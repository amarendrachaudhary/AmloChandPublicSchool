document.addEventListener("DOMContentLoaded", function() {
  const dropdown = document.querySelector(".nav-item.dropdown");

  dropdown.addEventListener("mouseenter", function() {
    const toggle = this.querySelector(".dropdown-toggle");
    const menu = this.querySelector(".dropdown-menu");
    const bsDropdown = new bootstrap.Dropdown(toggle);
    bsDropdown.show();
  });

  dropdown.addEventListener("mouseleave", function() {
    const toggle = this.querySelector(".dropdown-toggle");
    const bsDropdown = bootstrap.Dropdown.getInstance(toggle);
    bsDropdown.hide();
  });
});
