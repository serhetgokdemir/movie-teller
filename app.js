/* -------------------- TRANSLATIONS -------------------- */

const translations = {
    en: {
        headerTitle: "your own personal movie-teller",
        description: "describe the movie and get a recommendation",
        placeholderDescribe: "placeholder",
        placeholderResults: "placeholder",
        footerText: "Movie Teller is a lightweight, add-free movie recommendation app created by Serhet Gokdemir. ",
        footerLink: "See my personal web site."
    },
    tr: {
        headerTitle: "your own personal movie-teller",
        description: "filmi tarif et, öneriyi al",
        placeholderDescribe: "placeholder",
        placeholderResults: "placeholder",
        footerText: "Movie Teller, Serhet Gokdemir tarafindan olusturulmus hafif ve reklamsiz bir film oneri uygulamasidir. ",
        footerLink: "Kisisel web sitemi gor."
    }
};


/* -------------------- LANGUAGE SET -------------------- */

function setLanguage(lang) {
    document.getElementById("header-title").textContent = translations[lang].headerTitle;
    document.getElementById("description").firstChild.textContent = translations[lang].description + " ";
    document.getElementById("placeholder-describe").textContent = translations[lang].placeholderDescribe;
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