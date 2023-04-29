for (let form of document.querySelectorAll("[name='table']")) {
    form.addEventListener("submit", (event) => {
        $.ajax({
            url: document.activeElement.getAttribute("formaction"),
            method: "post",
            dataType: "json",
            data: { id: form.id.value, name: form.name.value },
            success: (data) => {
                if (document.activeElement.getAttribute("formaction") === "/categories/delete")
                    document.getElementById(`${data.id}`).remove();
            },
        });
        event.preventDefault();
    });
}
