/**
 * Loads the main content of the page dynamically.
 * @param {string} page
 */
function setPageContent(page) {
  // Fetch the content of the page (assuming it's either HTML or text format)
  fetch(page)
    .then((response) => {
      // Check if the fetch was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // Return the page content as text
    })
    .then((pageContent) => {
      // Inject the content into the content frame
      document.getElementById("contentFrame").innerHTML = pageContent;

      // Optionally, you can highlight any code blocks if using syntax highlighting
      if (typeof hljs !== "undefined") {
        hljs.highlightAll(); // Highlights all code blocks in the new content
      }
    })
    .catch((error) => {
      console.error("There was an error loading the page:", error);
      document.getElementById("contentFrame").innerHTML =
        "<p>Sorry, the content could not be loaded.</p>";
    });
}

/**
 * Sets the pages title to what is specified
 * @param {string} title
 */
function setPageTitle(title) {
  document.title = title;
}

/**
 * Sets date time with a certain time
 * @param {Date | null} time
 */
function setDateTime(time) {
  const dateTimeStr = (time || new Date()).toLocaleString();
  setInnerHTML("#datetimeDisplay", dateTimeStr);
}

/**
 * Sets the inner html of any element that matches the selector to the value provided
 * @param {string} selector
 * @param {string} value
 */
function setInnerHTML(selector, value) {
  document.querySelectorAll(selector).forEach((elem) => {
    elem.innerHTML = value;
  });
}

/**
 * Sets the href attribute of any element that matches the selector to the value provided
 * @param {string} selector
 * @param {string} value
 */
function setHref(selector, value) {
  document.querySelectorAll(selector).forEach((elem) => {
    elem.href = value;
  });
}

/**
 * Dynamically loads a page into the content area.
 * @param {string} page - The page to load.
 */
function loadPage(page) {
  // Page main title
  const title = "Liam Israel's Site";

  // Page map from name to displayed content
  const pageMap = {
    home: ["Home", "content/home.html"],
    about: ["About", "content/about.html"],
    contact: ["Contact", "content/contact.html"],
    projects: ["Projects", "content/projects.html"],
    null: ["Null", "content/null.html"],
  };

  // Destructuring to get page_name and url, default to "home" if page is not found
  let [page_name, url] = pageMap[page] ?? pageMap["null"];

  // Set the page title
  setPageTitle(`${title} | ${page_name}`);

  // Set the page content by loading the URL into an iframe or any other mechanism
  setPageContent(url);
}

/**
 * Loads profile data from assets/profile.json
 */
async function setProfileInfo() {
  fetch("assets/profile.json")
    .then((text) => text.json())
    .then((json) => {
      setInnerHTML("#email", json.email);
      setHref("#email", `mailto: ${json.email}`);
      setHref("#github", json.github);
      setHref("#linkedin", json.linkedin);
      setHref("#site-repo", json.site_repo);
    });
}

/**
 * Enum over supported site themes
 */
const Themes = {
  Light: "light",
  Dark: "dark",
};

/**
 * Sets the theme for the application.
 * @param {string} theme - The theme to set, either "light" or "dark".
 */
function setTheme(theme) {
  // Remove existing theme classes
  document.body.classList.remove(Themes.Light, Themes.Dark);

  // Set the appropriate class for the chosen theme
  if (theme === Themes.Dark) {
    document.body.classList.add(Themes.Dark);
    document.getElementById("themeToggle").innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    document.body.classList.add(Themes.Light);
    document.getElementById("themeToggle").innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  // Save the chosen theme in localStorage
  localStorage.setItem("theme", theme);
}

/**
 * Loads site theme based on user preference
 */
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // Determine which theme to apply
  const themeToSet = savedTheme
    ? savedTheme
    : prefersDarkScheme
    ? Themes.Dark
    : Themes.Light;
  setTheme(themeToSet);
}

/**
 * Toggles site theme
 */
function toggleTheme() {
  const currentTheme = document.body.classList.contains(Themes.Dark)
    ? Themes.Dark
    : Themes.Light;
  const newTheme = currentTheme === Themes.Dark ? Themes.Light : Themes.Dark;
  setTheme(newTheme);
}

// Update mode on site load
loadTheme();

// Loading page content
const params = new URLSearchParams(window.location.search);
loadPage(params.get("page") ?? "home");

// Optionally update date and time display
setDateTime();

// Loads in profile info
setProfileInfo();
