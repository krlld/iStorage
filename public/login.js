const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    $.ajax({
        url: document.activeElement.getAttribute("formaction"),
        method: "post",
        dataType: "json",
        data: {
            login: form.login.value,
            password: form.password.value,
        },
        success: (data) => {
            if (data.message) {
                const alert = `<div class="alert alert-warning alert-dismissible mb-1" role="alert">
                                <div>${data.message}</div>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
                document.body.insertAdjacentHTML("afterbegin", alert);
            }
            if (data.url) {
                window.location.href = data.url;
            }
        },
    });
    event.preventDefault();
});
