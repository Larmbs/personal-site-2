/**
 * Loads pages main content based on other page
 * @param {string} page
 */
function setPageContent(page) {
  document.getElementById("contentFrame").src = page;
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
  };

  // Destructuring to get page_name and url, default to "home" if page is not found
  let [page_name, url] = pageMap[page] ?? pageMap["home"];

  // Set the page title
  setPageTitle(`${title} | ${page_name}`);

  // Set the page content by loading the URL into an iframe or any other mechanism
  setPageContent(url);

  // Optionally update date and time display
  setDateTime();

  // Loads in profile info
  setProfileInfo();
}

/**
 * Loads profile data from assets/profile.json
 */
async function setProfileInfo() {
  fetch("assets/profile.json")
    .then((text) => text.json())
    .then((json) => {
      setInnerHTML("site-name", json.site_name);
      setInnerHTML("name", json.name);
      setInnerHTML("email", json.email);

      setHref("email", `mailto: ${json.email}`);
      setHref("github", json.github);
      setHref("linkedin", json.linkedin);
      setHref("site-repo", json.site_repo);
    });
}

const params = new URLSearchParams(window.location.search);
loadPage(params.get("page") ?? "home");
