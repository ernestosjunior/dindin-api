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

create table if not exists registers(
  id serial primary key not null,
  user_id integer  references users(id) on delete cascade,
  type integer not null,
  value integer not null,
  date timestamp not null,
  category text not null,
  description text,
  created_at timestamp default now(),
  updated_at timestamp default now()
)
