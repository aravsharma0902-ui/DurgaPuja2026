/* =====================================================
   DURGA PUJA 2026 — EVENTS DATA & INTERACTIONS
===================================================== */

"use strict";

const festivalEvents = [
    {
        id: "oct-02",
        date: "2026-10-02",
        day: "FRIDAY",
        number: "02",
        month: "OCT",
        title: "PRE-PUJA ACTIVITIES",
        subtitle: "Science, magic and fireless cooking",
        note: "Venue: Clubhouse and H-Tower Ground.",
        events: [
            ["10:00 AM", "Fun with Science Experiments and Being a Magician"],
            ["1:00 PM", "Fireless Cooking — Kids below 18, accompanied by an adult partner"],
            ["6:00 PM", "Fireless Cooking — Adults; an adult partner may accompany them"]
        ]
    },
    {
        id: "oct-03",
        date: "2026-10-03",
        day: "SATURDAY",
        number: "03",
        month: "OCT",
        title: "ARTS & CREATIVITY",
        subtitle: "Drawing, handicrafts and mehendi",
        note: "Venue: Clubhouse and H-Tower Ground.",
        events: [
            ["12:00 PM", "Article drop for Best Out of Waste and Handicraft"],
            ["3:00 PM", "Drawing and Painting Competition — All Categories"],
            ["3:00 PM", "Exhibition — Best Out of Waste and Handicraft"],
            ["6:30 PM", "Mehendi Competition"],
            ["7:00 PM", "Participants to collect Best Out of Waste and Handicraft items"]
        ]
    },
    {
        id: "oct-11",
        date: "2026-10-11",
        day: "SUNDAY",
        number: "11",
        month: "OCT",
        title: "COMMUNITY & SPORTS",
        subtitle: "Rangoli, fun games and sports awards",
        note: "Venue: Clubhouse and H-Tower Ground. The wording of the final weight-recording activity is retained as supplied.",
        events: [
            ["11:00 AM", "Rangoli Making and final weight recording for “Loose Big Win Bug”"],
            ["2:00 PM", "Sports Competition and Fun Games"],
            ["7:00 PM", "Award Distribution for Sports Activities"]
        ]
    },
    {
        id: "maha-saptami",
        date: "2026-10-17",
        day: "SATURDAY",
        number: "17",
        month: "OCT",
        title: "MAHA SAPTAMI",
        subtitle: "Day 01 — Pujo, Anjali and cultural celebrations",
        events: [
            ["8:30 AM", "Saptami Pujo / Sankalp"],
            ["9:00 AM", "Nabapatrika Snaan and Sthapana"],
            ["10:00 AM", "Saptami Anjali"],
            ["5:30 PM", "Sandhya Aarti with Dhunuchi Naach"],
            ["6:30 PM", "Cultural performances — Dance Space Got Talent, exclusive lucky draws for residents and more"]
        ]
    },
    {
        id: "maha-saptami-day-two",
        date: "2026-10-18",
        day: "SUNDAY",
        number: "18",
        month: "OCT",
        title: "MAHA SAPTAMI",
        subtitle: "Day 02 — Pujo continuation and cultural celebrations",
        events: [
            ["9:00 AM", "Saptami Pujo continuation"],
            ["10:00 AM", "Saptami Anjali"],
            ["10:30 AM", "Chandi Path"],
            ["6:00 PM", "Sandhya Aarti with Dhunuchi"],
            ["6:30 PM", "Cultural performances — Dance Space Got Talent, exclusive lucky draws for residents and more"]
        ]
    },
    {
        id: "maha-ashtami",
        date: "2026-10-19",
        day: "MONDAY",
        number: "19",
        month: "OCT",
        title: "MAHA ASHTAMI",
        subtitle: "Pushpanjali, Bhandara and Dandiya Night",
        events: [
            ["8:30 AM", "Maha Ashtami Pujo"],
            ["9:30 AM", "Maha Ashtami Pushpanjali"],
            ["10:30 AM", "Saptami Pujo Anjali — wording as supplied"],
            ["12:00 PM", "Bhandara organised by Team AOA"],
            ["TIME TO BE CONFIRMED", "Dandiya Night organised by Team AOA"]
        ]
    },
    {
        id: "maha-navami",
        date: "2026-10-20",
        day: "TUESDAY",
        number: "20",
        month: "OCT",
        title: "MAHA NAVAMI",
        subtitle: "Kumari Pujo, Ram Rath Yatra and Award Night",
        events: [
            ["9:00 AM", "Maha Navami Pujo"],
            ["10:30 AM", "Kumari Pujo"],
            ["12:30 PM", "Bhandara"],
            ["5:45 PM", "Ramayana Skit at Mandir"],
            ["6:00 PM", "Sandhya Aarti with Dhunuchi Naach"],
            ["6:05 PM", "Ram Rath Yatra"],
            ["6:45 PM", "Ravan Dahan organised by Team AOA"],
            ["7:00 PM", "Raj Tilak and Aarti at H-Tower Park, organised by Team AOA"],
            ["7:35 PM", "Cultural activities, kids' Fancy Dress, Award Night, exclusive lucky draws and more"]
        ]
    },
    {
        id: "maha-dashami",
        date: "2026-10-21",
        day: "WEDNESDAY",
        number: "21",
        month: "OCT",
        title: "MAHA DASHAMI",
        subtitle: "Sindoor Khela, Maa'er Boron and Bisorjon",
        events: [
            ["9:30 AM", "Dashami Pujo"],
            ["10:30 AM", "Pushpanjali"],
            ["11:30 AM", "Darpan Bisorjon"],
            ["11:45 AM", "Sindoor Khela and Maa'er Boron"],
            ["1:00 PM", "Society Parikrama and procession for Bisorjon"],
            ["3:30 PM", "Shantir Jol and sweet distribution"]
        ]
    }
];


/* -----------------------------------------------------
   DATE HELPERS
----------------------------------------------------- */

function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getEventStatus(eventDate) {
    const today = getLocalDateString();

    if (eventDate < today) {
        return "completed";
    }

    if (eventDate === today) {
        return "today";
    }

    return "upcoming";
}

function getStatusLabel(status) {
    if (status === "completed") return "COMPLETED";
    if (status === "today") return "TODAY";
    return "UPCOMING";
}


/* -----------------------------------------------------
   SAFE HTML TEXT
----------------------------------------------------- */

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}


/* -----------------------------------------------------
   RENDER EVENTS
----------------------------------------------------- */

const eventsContainer = document.getElementById("events-container");

function renderEvents() {
    if (!eventsContainer) return;

    eventsContainer.innerHTML = festivalEvents.map(event => {
        const status = getEventStatus(event.date);

        const eventRows = event.events.map(([time, description]) => `
            <li>
                <span class="event-time">${escapeHTML(time)}</span>
                <span class="event-description">${escapeHTML(description)}</span>
            </li>
        `).join("");

        const note = event.note
            ? `<p class="event-note">${escapeHTML(event.note)}</p>`
            : "";

        return `
            <article
                class="event-day"
                id="${escapeHTML(event.id)}"
                data-status="${status}"
            >
                <button
                    class="event-day-header"
                    type="button"
                    aria-expanded="false"
                    aria-controls="details-${escapeHTML(event.id)}"
                >
                    <span class="event-date-box">
                        <strong>${escapeHTML(event.number)}</strong>
                        <span>${escapeHTML(event.month)}</span>
                    </span>

                    <span class="event-day-info">
                        <span class="eyebrow">${escapeHTML(event.day)}</span>
                        <h3>${escapeHTML(event.title)}</h3>
                        <p>${escapeHTML(event.subtitle)}</p>
                    </span>

                    <span class="event-status ${status}">
                        ${getStatusLabel(status)}
                    </span>

                    <span class="event-chevron" aria-hidden="true">⌄</span>
                </button>

                <div
                    class="event-details"
                    id="details-${escapeHTML(event.id)}"
                    hidden
                >
                    <div class="event-details-inner">
                        <ul class="event-list">${eventRows}</ul>
                        ${note}
                    </div>
                </div>
            </article>
        `;
    }).join("");

    applyCurrentFilter();
}


/* -----------------------------------------------------
   EXPAND / COLLAPSE DAYS
----------------------------------------------------- */

if (eventsContainer) {
    eventsContainer.addEventListener("click", event => {
        const header = event.target.closest(".event-day-header");

        if (!header) return;

        const article = header.closest(".event-day");
        const details = article.querySelector(".event-details");

        const isExpanded = header.getAttribute("aria-expanded") === "true";

        header.setAttribute("aria-expanded", String(!isExpanded));
        details.hidden = isExpanded;
        article.classList.toggle("expanded", !isExpanded);
    });
}


/* -----------------------------------------------------
   COMPLETED / UPCOMING FILTERS
----------------------------------------------------- */

let currentFilter = "all";

function applyCurrentFilter() {
    if (!eventsContainer) return;

    const articles = eventsContainer.querySelectorAll(".event-day");
    let visibleCount = 0;

    articles.forEach(article => {
        const status = article.dataset.status;

        const matches =
            currentFilter === "all" ||
            (currentFilter === "completed" && status === "completed") ||
            (currentFilter === "upcoming" && status !== "completed");

        article.hidden = !matches;

        if (matches) visibleCount++;
    });

    const existingMessage = eventsContainer.querySelector(".no-events-message");

    if (existingMessage) {
        existingMessage.remove();
    }

    if (visibleCount === 0) {
        eventsContainer.insertAdjacentHTML(
            "beforeend",
            '<p class="no-events-message">No events match this filter.</p>'
        );
    }
}

const filterContainer = document.getElementById("schedule-filters");

if (filterContainer) {
    filterContainer.addEventListener("click", event => {
        const button = event.target.closest(".filter-button");

        if (!button) return;

        currentFilter = button.dataset.filter || "all";

        filterContainer.querySelectorAll(".filter-button").forEach(item => {
            const selected = item === button;
            item.classList.toggle("active", selected);
            item.setAttribute("aria-pressed", String(selected));
        });

        applyCurrentFilter();
    });

    filterContainer.querySelectorAll(".filter-button").forEach(button => {
        button.setAttribute(
            "aria-pressed",
            String(button.classList.contains("active"))
        );
    });
}


/* -----------------------------------------------------
   HOMEPAGE LINKS TO INDIVIDUAL FESTIVAL DAYS
----------------------------------------------------- */

function openLinkedFestivalDay() {
    const id = decodeURIComponent(window.location.hash.slice(1));

    if (!id) return;

    const target = document.getElementById(id);

    if (!target || !target.classList.contains("event-day")) return;

    const status = target.dataset.status;

    if (
        currentFilter === "completed" && status !== "completed" ||
        currentFilter === "upcoming" && status === "completed"
    ) {
        currentFilter = "all";

        if (filterContainer) {
            filterContainer.querySelectorAll(".filter-button").forEach(button => {
                const selected = button.dataset.filter === "all";
                button.classList.toggle("active", selected);
                button.setAttribute("aria-pressed", String(selected));
            });
        }

        applyCurrentFilter();
    }

    const header = target.querySelector(".event-day-header");
    const details = target.querySelector(".event-details");

    if (header && details && details.hidden) {
        header.setAttribute("aria-expanded", "true");
        details.hidden = false;
        target.classList.add("expanded");
    }

    requestAnimationFrame(() => {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}


/* -----------------------------------------------------
   START
----------------------------------------------------- */

renderEvents();

window.addEventListener("hashchange", openLinkedFestivalDay);

if (window.location.hash) {
    setTimeout(openLinkedFestivalDay, 100);
}
