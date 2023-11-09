document.addEventListener("DOMContentLoaded", function () {
    const fontSizeSelect = document.getElementById("font-size-select");
    const textColorSelect = document.getElementById("text-color-select");
    const backgroundColorSelect = document.getElementById("background-color-select");

    fontSizeSelect.addEventListener("change", function () {
        document.body.style.fontSize = fontSizeSelect.value;
    });

    textColorSelect.addEventListener("change", function () {
        document.body.style.color = textColorSelect.value;
    });

    backgroundColorSelect.addEventListener("change", function () {
        document.body.style.backgroundColor = backgroundColorSelect.value;
    });
});
