const API_KEY = "e28d32543064b0ea4378929602b7fd88";
const BASE_URL = "https://api.themoviedb.org/3";

/* -------------------- TRANSLATIONS -------------------- */

const translations = {
    en: {
        headerTitle: "your own personal movie-teller",
        description: "describe the movie and get a recommendation",
        placeholderResults: "placeholder",
        footerText: "Movie Teller is a lightweight and add-free movie recommendation app created by Serhet Gokdemir. ",
        footerLink: "See my personal web site.",
        genre: "Genre:",
        yearMaxSelect: "Year Max):",
        yearMinSelect: "Year (Min):",
        ratingMax: "Rating (Max):",
        ratingMin: "Rating (Min)",
        country: "Country:",
        reset: "Reset",
        get: "FIND!"
    },
    tr: {
        headerTitle: "your own personal movie-teller",
        description: "filmi tarif et, oneriyi al",
        placeholderResults: "placeholder",
        footerText: "Movie Teller, Serhet Gokdemir tarafindan olusturulmus hafif ve reklamsiz bir film oneri uygulamasidir. ",
        footerLink: "Kisisel web sitemi gor.",
        genre: "Tur:",
        yearMaxSelect : "Yil (Max):",
        yearMinSelect: "Yil (Min):",
        ratingMax: "Puan (Max):",
        ratingMin: "Puan (Min):",
        country: "Ulke:",
        reset: "Sifirla",
        get: "BUL!"
    }
};


/* -------------------- LANGUAGE SET -------------------- */

function setLanguage(lang) {
    const t = translations[lang];

    document.getElementById("header-title").textContent = t.headerTitle;
    document.getElementById("description").textContent = t.description;
    document.getElementById("footer-text").textContent = t.footerText;
    document.getElementById("footer-link").textContent = t.footerLink;
    document.getElementById("reset").textContent = t.reset;
    document.getElementById("get").textContent = t.get;


    document.querySelector('label[for="genre"]').textContent = t.genre;
    document.querySelector('label[for="year-max-select"]').textContent = t.yearMaxSelect;
    document.querySelector('label[for="year-min-select"]').textContent = t.yearMinSelect;
    document.querySelector('label[for="rating-max"]').textContent = t.ratingMax;
    document.querySelector('label[for="rating-min"]').textContent = t.ratingMin;
    document.querySelector('label[for="country"]').textContent = t.country;
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

// Any seçeneği
const emptyMax = document.createElement("option");
emptyMax.value = "";
emptyMax.textContent = "Any";
yearMaxSelect.appendChild(emptyMax);

for (let y = 2025; y >= 1900; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearMaxSelect.appendChild(opt);
}

const yearMinSelect = document.getElementById("year-min-select");
const emptyMin = document.createElement("option");
emptyMin.value = "";
emptyMin.textContent = "Any";
yearMinSelect.appendChild(emptyMin);

for (let y = 1900; y <= 2025; y++) {
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

ratingMax.placeholder = "Any";

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

ratingMin.placeholder = "Any";

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

    const emptyOpt = document.createElement("option");
    emptyOpt.value = "";
    emptyOpt.textContent = "Any";
    genreSelect.appendChild(emptyOpt);

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

    const randomPage = Math.floor(Math.random() * 10) + 1;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${randomPage}`;

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
        renderMovie(movie);a
    } else {
        document.getElementById("results").innerHTML = "<p>No movie found.</p>";
    }
});

async function loadCountries() {
    const res = await fetch(`${BASE_URL}/configuration/countries?api_key=${API_KEY}`);
    const countries = await res.json();

    const countrySelect = document.getElementById("country-select");

    const emptyOpt = document.createElement("option");
    emptyOpt.value = "";
    emptyOpt.textContent = "Any";
    countrySelect.appendChild(emptyOpt);

    countries.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.iso_3166_1;
        opt.textContent = c.english_name;
        countrySelect.appendChild(opt);
    });
}
loadCountries();
