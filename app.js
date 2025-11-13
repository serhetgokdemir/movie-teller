/* -------------------- TRANSLATIONS -------------------- */

const translations = {
    en: {
        headerTitle: "your own personal movie-teller",
        description: "describe the movie and get a recommendation",
        placeholderResults: "placeholder",
        footerText: "Movie Teller is a lightweight, add-free movie recommendation app created by Serhet Gokdemir. ",
        footerLink: "See my personal web site."
    },
    tr: {
        headerTitle: "your own personal movie-teller",
        description: "filmi tarif et, öneriyi al",
        placeholderResults: "placeholder",
        footerText: "Movie Teller, Serhet Gokdemir tarafindan olusturulmus hafif ve reklamsiz bir film oneri uygulamasidir. ",
        footerLink: "Kisisel web sitemi gor."
    }
};


/* -------------------- LANGUAGE SET -------------------- */

function setLanguage(lang) {
    document.getElementById("header-title").textContent = translations[lang].headerTitle;
    document.getElementById("description").firstChild.textContent = translations[lang].description + " ";
    document.getElementById("placeholder-results").textContent = translations[lang].placeholderResults;
    document.getElementById("footer-text").textContent = translations[lang].footerText;
    document.getElementById("footer-link").textContent = translations[lang].footerLink;
}


/* -------------------- CUSTOM DROPDOWN -------------------- */

const selected = document.getElementById("lang-selected");
const options = document.getElementById("lang-options");

selected.addEventListener("click", () => {
    options.style.display = (options.style.display === "block") ? "none" : "block";
});

options.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        const value = option.getAttribute("data-value");
        const text = option.textContent;

        selected.textContent = text;
        options.style.display = "none";

        setLanguage(value);
    });
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
        options.style.display = "none";
    }
});

/* -------------------- YEAR SELECT -------------------- */

const yearMaxSelect = document.getElementById("year-max-select");

for (let y = 2026; y >= 1900; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearMaxSelect.appendChild(opt);
}

const yearMinSelect = document.getElementById("year-min-select");

for (let y = 2026; y >= 1900; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearMinSelect.appendChild(opt);
}

/* -------------------- ON-OFF FOR FILTERING --------------------*/

/* GENRE */
const useGenre = document.getElementById("genre-toggle");
const genreInput = document.getElementById("genre-input");

useGenre.addEventListener("change", () => {
    if (useGenre.checked) {
        genreInput.disabled = false;
    } else {
        genreInput.disabled = true;
    }
});

/* YEAR-MAX */
const useYearMax = document.getElementById("year-max-toggle");
useYearMax.addEventListener("change", () => {
    if (useYearMax.checked) {
        yearMaxSelect.disabled = false;
    } else {
        yearMaxSelect.disabled = true;
    }
});

/* YEAR-MIN */
const useYearMin = document.getElementById("year-min-toggle");
useYearMin.addEventListener("change", () => {
    if (useYearMin.checked) {
        yearMinSelect.disabled = false;
    } else {
        yearMinSelect.disabled = true;
    }
});

/* RATING-MAX */
const ratingMax = document.getElementById("rating-max");
const useRatingMax = document.getElementById("rating-max-toggle");

useRatingMax.addEventListener("change", () => {
    if (useRatingMax.checked) {
        ratingMax.disabled = false;
    } else {
        ratingMax.disabled = true;
    }
});

/* RATING-MIN */
const ratingMin = document.getElementById("rating-min");
const useRatingMin = document.getElementById("rating-min-toggle");

useRatingMin.addEventListener("change", () => {
    if (useRatingMin.checked) {
        ratingMin.disabled = false;
    } else {
        ratingMin.disabled = true;
    }
});

/* COUNTRY */
const country = document.getElementById("country");
const useCountry = document.getElementById("country-toggle");

useCountry.addEventListener("change", () => {
    if (useCountry.checked) {
        country.disabled = false;
    } else {
        country.disabled = true;
    }
});

/* -------------------- RESET --------------------*/
const allInputs = document.querySelectorAll(
    "#describe-movie input, #describe-movie select"
);
const allToggles = document.querySelectorAll("#describe-movie .switch input");

const reset = document.getElementById("reset");

reset.addEventListener("click", () => {

    allInputs.forEach(el => {
        el.value = "";
        el.disabled = false;
    });

    allToggles.forEach(t => {
        t.checked = true;
    });
});


