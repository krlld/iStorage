document.getElementById("form").addEventListener("submit", (event) => {
    const form = document.getElementById("form");
    $.ajax({
        url: "/accounts/checkLoginForUse",
        method: "post",
        dataType: "json",
        data: {
            login: form.login.value,
        },
        success: (data) => {
            if (data.isUse) {
                alert("Логин занят");
                return;
            }

            $.ajax({
                url: document.activeElement.getAttribute("formaction"),
                method: "post",
                dataType: "json",
                data: {
                    login: form.login.value,
                    password: form.password.value,
                    roleId: form.roleId.value,
                },
                success: (data) => {
                    window.location.href = data.url;
                },
            });
        },
    });
    event.preventDefault();
});

for (let form of document.querySelectorAll("[name='form']"))
    form.addEventListener("submit", (event) => {
        $.ajax({
            url: document.activeElement.getAttribute("formaction"),
            method: "post",
            dataType: "json",
            data: {
                id: form.id.value,
                login: form.login.value,
                roleId: form.roleId.value,
            },
            success: (data) => {
                document.getElementById(`form${data.id}`).remove();
            },
        });
        event.preventDefault();
    });
