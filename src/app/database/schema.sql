create database dindin_api

create table if not exists users(
  id serial primary key not null,
  first_name text not null,
  last_name text,
  email text unique not null,
  password text not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
)
