const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });

    const links = mobileMenu.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });

    });

}