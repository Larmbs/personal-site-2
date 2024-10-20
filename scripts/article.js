
/**
 * Loads markdown into an element with the markdown id
 * @param {string} markdown 
 */
function setMarkdown(markdown) {
    const marked_down_html = marked.parse(markdown);
    document.getElementById("markdown").innerHTML += marked_down_html;
    hljs.highlightAll();
    document.getElementById("markdown").style.setProperty("display", "block");
}
