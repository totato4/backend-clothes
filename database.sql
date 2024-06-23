create TABLE aperson(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255)
);

create TABLE apost(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);

create table clothes (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	title VARCHAR(300) NOT NULL,
	discount VARCHAR(50),
	human_c VARCHAR(300) NOT NULL,
	size_c VARCHAR(50) NOT NULL,
	clothes_c VARCHAR(300) NOT NULL,
	price VARCHAR(50) NOT NULL,
	rating VARCHAR(50) NOT NULL,
	brand VARCHAR(50) NOT NULL,
	image_url VARCHAR(50) NOT NULL,
	color VARCHAR(50) NOT NULL
);