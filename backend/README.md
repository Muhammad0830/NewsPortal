this is backend. and this uses node.js, (express) and mysql

this project is used for news portal website

after cloning the project from github, you need to install the dependencies by running the command
# npm install 

after that, you need to create a .env file in the root directory of the project and add the following lines to it

# PORT = 3001

# DB_HOST = localhost
# DB_USER = root
# DB_PASSWORD = your_password
# DB_NAME = news_portal

# JWT_SECRET_CODE = 'your_super_secret_code'

# NODE_ENV = development
# ACCESS_TOKEN_SECRET = 'your_super_secret_code'
# REFRESH_TOKEN_SECRET = 'your_super_secret_code'
# ACCESS_TOKEN_EXPIRES_IN = '15m'
# REFRESH_TOKEN_EXPIRES_IN = '7d'

and for the mysql database, you need to create a database named news_portal and a user named root with password your_super_secret_code

then create tables for the database by running the command

# create table news (id int primary key auto_increment, title JSON, description JSON, image varchar(255), category varchar(255), status ENUM("Published", "Unpublished"), redirectLink varchar(255), slug varchar(255), contents JSON, created_at datetime default current_timestamp);

# create table contents (id int primary key auto_increment, newsId int not null, type varchar(255) not null, content JSON, `order` int not null, foreign key (newsId) references news(id) on delete cascade on update cascade);

# create table categories (id int primary key auto_increment, name varchar(255), description varchar(255), color varchar(255), category varchar(255));

# create table users (id bigint unsigned not null auto_increment primray key, email varchar(255) not null unique, password_hash varchar(255) not null, name varchar(255), role ENUM("admin", "user") not null, created_at datetime default current_timestamp);

# create table refresh_tokens (id bigint unsigned not null auto_increment primray key, user_id bigint unsigned not null, token varchar(1000) not null, expires_at datetime not null, created_at datetime default current_timestamp, foreign key (user_id) references users(id) on delete cascade);

notice that create at least one admin role user to access the admin side of the website
to craete use postman or vsCode .rest files or similar tools to register the admin (since the admins cannot register themselves they can just sign in) user only can both register and signin

after that, you need to run the command
# npm run dev

make sure youre in the backend folder

go to the frontend/README.md for more frontend related information
