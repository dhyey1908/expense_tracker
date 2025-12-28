-- Create database
CREATE DATABASE IF NOT EXISTS expense_tracker;

-- Use the database
USE expense_tracker;

-- users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- categories table
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- expenses table
CREATE TABLE expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  amount INT NOT NULL CHECK (amount >= 0),
  date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_category_id (category_id),
  INDEX idx_date (date),
  INDEX idx_user_date (user_id, date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample users
INSERT INTO users (name, email, status) VALUES
('Amit Sharma', 'amit.sharma@example.com', 'active'),
('Priya Patel', 'priya.patel@example.com', 'active'),
('Rahul Verma', 'rahul.verma@example.com', 'active'),
('Neha Singh', 'neha.singh@example.com', 'active'),
('Rohit Mehta', 'rohit.mehta@example.com', 'active');

-- Insert sample categories
INSERT INTO categories (name) VALUES
('Food & Dining'),
('Transportation'),
('Shopping'),
('Entertainment'),
('Bills & Utilities'),
('Healthcare'),
('Education'),
('Travel'),
('Personal Care'),
('Others');

-- Insert sample expenses
INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES
-- October 2025
(1, 1, 150, '2025-10-05', 'Groceries'),
(2, 2, 80,  '2025-10-10', 'Transport'),
(3, 4, 120, '2025-10-18', 'Entertainment'),

-- November 2025
(1, 5, 350, '2025-11-03', 'Electricity bill'),
(2, 1, 200, '2025-11-12', 'Dining'),
(4, 7, 600, '2025-11-20', 'Education'),

-- December 2025
(1, 1, 180, '2025-12-02', 'Groceries'),
(3, 8, 1500,'2025-12-08', 'Travel'),
(4, 3, 450, '2025-12-15', 'Shopping'),
(2, 4, 160, '2025-12-18', 'Movie'),
(3, 1, 220, '2025-12-22', 'Dinner'),
(1, 2, 90,  '2025-12-25', 'Taxi');
