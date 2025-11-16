const API_KEY = TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

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
const genreSelect = document.getElementById("genre-select");

useGenre.addEventListener("change", () => {
    genreSelect.disabled = !useGenre.checked;
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
const useCountry = document.getElementById("country-toggle");
const countrySelect = document.getElementById("country-select");
useCountry.addEventListener("change", () => {
    countrySelect.disabled = !useCountry.checked;
});


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

/* -------------------- RESULTS SECTION --------------------*/
function renderMovie(movie) {
    const titleEl = document.getElementById("result-title");
    const metaEl = document.getElementById("result-meta");
    const overviewEl = document.getElementById("result-overview");

    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "?";
    const popularity = movie.popularity ? movie.popularity.toFixed(1) : "?";

    titleEl.textContent = `${movie.title} (${movie.release_date?.slice(0,4) || "?"})`;

    metaEl.textContent =
        `Rating: ${rating} | Popularity: ${popularity}`;

    overviewEl.textContent = movie.overview || "No description available.";
}


async function testTMDB() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();

        console.log("TMDb bağlantı başarılı.");
        console.log(data.results.slice(0, 5));
    } catch (err) {
        console.error("TMDb bağlantı hatası:", err);
    }
}

testTMDB();

async function loadGenres() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`);
    const data = await res.json();

    const genreSelect = document.getElementById("genre-select");

    data.genres.forEach(genre => {
        const opt = document.createElement("option");
        opt.value = genre.id;
        opt.textContent = genre.name;
        genreSelect.appendChild(opt);
    });
}

loadGenres();

const findBtn = document.getElementById("get");
const genreToggle = document.getElementById("genre-toggle");

findBtn.addEventListener("click", async () => {

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

    /* GENRE */
    if (genreToggle.checked && genreSelect.value !== "") {
        url += `&with_genres=${genreSelect.value}`;
    }

    /* YEAR MIN */
    if (useYearMin.checked && yearMinSelect.value !== "") {
        url += `&primary_release_date.gte=${yearMinSelect.value}-01-01`;
    }

    /* YEAR MAX */
    if (useYearMax.checked && yearMaxSelect.value !== "") {
        url += `&primary_release_date.lte=${yearMaxSelect.value}-12-31`;
    }

    /* RATING MIN */
    if (useRatingMin.checked && ratingMin.value !== "") {
        url += `&vote_average.gte=${ratingMin.value}`;
    }

    /* RATING MAX */
    if (useRatingMax.checked && ratingMax.value !== "") {
        url += `&vote_average.lte=${ratingMax.value}`;
    }

    /* ---- COUNTRY ----*/
    if (useCountry.checked && countrySelect.value !== "") {
        url += `&with_origin_country=${countrySelect.value}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const movie = data.results[randomIndex];
        renderMovie(movie);
    } else {
        document.getElementById("results").innerHTML = "<p>No movie found.</p>";
    }
});

async function loadCountries() {
    const res = await fetch(`${BASE_URL}/configuration/countries?api_key=${API_KEY}`);
    const countries = await res.json();


    countries.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.iso_3166_1;
        opt.textContent = c.english_name;
        countrySelect.appendChild(opt);
    });
}
loadCountries();
