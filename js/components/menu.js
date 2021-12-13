const dropdownButton = document.querySelector(".menu_bar");
const menuContent = document.querySelector(".nav-menu");

dropdownButton.addEventListener("click", () => {
    menuContent.classList.add("show");
});
menuContent.addEventListener('click', () => {
    menuContent.classList.remove("show");
})