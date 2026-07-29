document.addEventListener("DOMContentLoaded", () => {
    const viewsElement = document.getElementById("page-views");

    if (!viewsElement) return;

    const path = viewsElement.dataset.path;

    fetch(`https://api.groznet.com/views?path=${encodeURIComponent(path)}`)
        .then(response => response.json())
        .then(data => {
            viewsElement.textContent = data.views ?? 0;
        })
        .catch(() => {
            viewsElement.textContent = 0;
        });
});