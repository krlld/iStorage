for (let form of document.querySelectorAll("[name='table']"))
    form.addEventListener("submit", (event) => {
        $.ajax({
            url: document.activeElement.getAttribute("formaction"),
            method: "post",
            dataType: "json",
            data: {
                id: form.id.value,
                categoryId: form.categoryId.value,
                name: form.name.value,
                price: form.price.value,
                src: form.src.value,
                description: form.description.value,
            },
            success: (data) => {
                if (document.activeElement.getAttribute("formaction") === "/catalog/delete")
                    document.getElementById(`${data.id}`).remove();
                if (document.activeElement.getAttribute("formaction") === "/catalog/update")
                    document.querySelector(`[id='${data.id}'] img`).src = data.src;
            },
        });
        event.preventDefault();
    });
