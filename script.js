// ===============================
// DURGA PUJA COUNTDOWN
// ===============================

// Fixed real-world target time
const pujaDate = new Date("2026-10-16T00:01:00+05:30").getTime();

function updateCountdown() {
    const now = Date.now();
    const distance = pujaDate - now;

    if (distance <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (distance / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
        (distance / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

// Start immediately
updateCountdown();

// Update every second
setInterval(updateCountdown, 1000);


// ===============================
// MOBILE MENU
// ===============================

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("open");
    });

    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            mobileMenu.classList.remove("open");
        });
    });
}
```javascript
/* =========================
   EVENTS SCROLL ANIMATION
========================= */

const eventItems = document.querySelectorAll(".event-item");

const eventObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.15
    }
);


eventItems.forEach(function(item) {
    eventObserver.observe(item);
});
```
