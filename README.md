# Gigapet Backend

## Table layouts

- Please **note in progress**

### users Table

`users`  
`id` => primary key int | increments and adds automatically.  
`username` => varchar(128) not nullable, unique  
`password` => varchar(255) not nullable  
`first_name` => varchar(128) not nullable | user first name  
`last_name` => varchar(128) not nullable | user last name

### childrens table

`childrens`  
`id` => primary key int | increments & adds auto.  
`first_name` => varchar(128) not nullable  
`last_name` => varchar(128) not nullable  
`users_id` => integer FK references users - id

### categories table

`categories`  
`id` => primary key int | increments & add auto.  
`name` => varchar(100) not null  
`users_id` => int FK references users - id

### foods table

`foods`
`id` => primary key int | increments & add auto.  
`name` => varchar(128) not nullable  
`users_id` => int FK references users - id  
`categories_id` => int FK references categories - id

### entries table

`entries`  
`id` => primary key int | increments & add auto.  
`date` => datetime(date) of some sort | time stamp? style? or chosen time?  
`foods_id` => int FK references food - id
