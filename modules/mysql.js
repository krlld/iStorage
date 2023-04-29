// mysql
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "sys",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

connection.query(
    `create table if not exists Categories
(
    id int not null auto_increment,
    name varchar(255) not null,
    primary key (id)
);`
);

connection.query(
    `create table if not exists Catalog
(
    id int not null auto_increment,
    categoryId int not null,
    name varchar(255) not null,
    price decimal(65, 2) not null,
    src varchar(255),
    description varchar(255),
    primary key (id),
    foreign key (categoryId) references Categories (id) on delete cascade on update cascade
);`
);

connection.query(
    `create table if not exists Inventory 
(
    id int not null auto_increment,
    catalogId int not null,
    count int not null,
    orderDate datetime default current_timestamp(),
    primary key (id),
    foreign key (catalogId) references Catalog (id) on delete cascade on update cascade
);`
);

// connection.query(`drop trigger if exists invent;
//                 create trigger invent after insert on Catalog
//                 for each row
//                 insert into Inventory (catalogId, count) values (new.id, 0);
// `);

connection.query(
    `create table if not exists Roles 
(
    id int not null auto_increment,
    role varchar(255) not null,
    primary key (id)
);`
);

connection.query(
    `create table if not exists Users 
(
    id int not null auto_increment,
    login varchar(255) not null,
    hashPassword varchar(255) not null,
    roleId int not null,
    unique (login),
    primary key (id),
    foreign key (roleId) references Roles (id) on delete cascade on update cascade
);`
);

module.exports = connection;
