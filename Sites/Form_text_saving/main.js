textarea = document.getElementById("area");
textarea.value = sessionStorage.getItem('textarea');
textarea.addEventListener('input', () => {
    sessionStorage.setItem('textarea', textarea.value);
})