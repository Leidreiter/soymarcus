document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popupOverlay");
    const btnOpen = document.querySelectorAll(".popupOpen");
    const btnClose = document.getElementById("popupClose");

    btnOpen.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            popup.classList.add("active");
        });
    });

    btnClose.addEventListener("click", () => {
        popup.classList.remove("active");
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.remove("active");
        }
    });
});