module.exports.transfers = (data) => {
    for (row of data) {
        if (row.count < 0) {
            row.action = "Выбытие";
            row.count *= -1;
        } else {
            row.action = "Поступление";
        }
        row.orderDate = String(row.orderDate).substring(4, 15);
    }

    return data;
};

module.exports.abc = (data) => {
    let generalSum = 0;
    for (let row of data) {
        generalSum += row.sum;
    }
    for (let i = 0; i < data.length; ++i) {
        if (i === 0) {
            data[i].percent = Number(((data[i].sum * 100) / generalSum).toFixed(2));
            data[i].agregatePercent = data[i].percent;
        } else {
            data[i].percent = Number(((data[i].sum * 100) / generalSum).toFixed(2));
            data[i].agregatePercent = data[i].percent + data[i - 1].agregatePercent;
        }
        if (data[i].agregatePercent - data[i].percent < 80) {
            data[i].group = "A";
        } else if (data[i].agregatePercent - data[i].percent < 95) {
            data[i].group = "B";
        } else {
            data[i].group = "C";
        }
    }

    return data;
};
