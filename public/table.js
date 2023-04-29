for (let form of document.querySelectorAll("[name='form']")) {
    form.addEventListener("submit", (event) => {
        $.ajax({
            url: "/inventory/getSum",
            method: "post",
            dataType: "json",
            data: { id: form.id.value },
            success: (sum) => {
                if (
                    document.activeElement.getAttribute("formaction") === "/inventory/minus" &&
                    Number(sum.sum) < Number(form.count.value)
                ) {
                    alert("Превышено количество");
                    document.getElementById(`input${form.id.value}`).value = "";
                    return;
                }
                $.ajax({
                    url: document.activeElement.getAttribute("formaction"),
                    method: "post",
                    dataType: "json",
                    data: { id: form.id.value, count: form.count.value },
                    success: (data) => {
                        if (
                            document.activeElement.getAttribute("formaction") === "/inventory/plus"
                        ) {
                            document.getElementById(`count${data.id}`).innerText =
                                Number(sum.sum) + Number(data.count);
                        }
                        if (
                            document.activeElement.getAttribute("formaction") === "/inventory/minus"
                        ) {
                            document.getElementById(`count${data.id}`).innerText =
                                Number(sum.sum) - Number(data.count);
                        }
                        document.getElementById(`input${data.id}`).value = "";
                    },
                });
            },
        });

        event.preventDefault();
    });
}
