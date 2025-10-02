CREATE DATABASE atm_demo;

USE atm_demo;

CREATE TABLE accounts (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  account_no VARCHAR(20) UNIQUE,
  balance DOUBLE
);

CREATE TABLE cards (
  card_no VARCHAR(20) PRIMARY KEY,
  pin_hash VARCHAR(64),
  status VARCHAR(10),
  account_id INT,
  FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE transactions (
  tx_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT,
  card_no VARCHAR(20),
  atm_id INT,
  tx_type VARCHAR(20),
  amount DOUBLE,
  balance_after DOUBLE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
