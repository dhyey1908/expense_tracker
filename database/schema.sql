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
(1, 1, 150, '2025-10-01', 'Grocery shopping'),
(1, 2, 50, '2025-10-01', 'Taxi fare'),
(1, 1, 200, '2025-10-05', 'Restaurant dinner'),
(1, 3, 500, '2025-10-10', 'New shoes'),
(1, 1, 100, '2025-10-15', 'Lunch with friends'),
(1, 2, 75, '2025-10-20', 'Uber rides'),
(1, 4, 120, '2025-10-25', 'Movie tickets'),

-- November 2025
(1, 1, 180, '2025-11-01', 'Weekly groceries'),
(1, 5, 350, '2025-11-05', 'Electricity bill'),
(1, 1, 220, '2025-11-10', 'Family dinner'),
(1, 2, 60, '2025-11-15', 'Gas refill'),
(1, 3, 800, '2025-11-20', 'Black Friday shopping'),

-- December 2025
(1, 1, 160, '2025-12-01', 'Grocery shopping'),
(1, 2, 45, '2025-12-01', 'Taxi'),
(1, 1, 250, '2025-12-05', 'Christmas dinner prep'),
(1, 4, 200, '2025-12-10', 'Concert tickets'),
(1, 3, 600, '2025-12-15', 'Holiday gifts'),
(1, 1, 190, '2025-12-20', 'Party supplies'),
(1, 1, 300, '2025-12-20', 'More party supplies'),

INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES
-- October 2025
(2, 1, 120, '2025-10-02', 'Breakfast meeting'),
(2, 6, 300, '2025-10-08', 'Doctor visit'),
(2, 1, 180, '2025-10-12', 'Lunch buffet'),
(2, 7, 450, '2025-10-18', 'Online course'),
(2, 1, 90, '2025-10-22', 'Coffee shop'),

-- November 2025
(2, 2, 85, '2025-11-03', 'Metro card'),
(2, 1, 210, '2025-11-08', 'Dinner party'),
(2, 3, 550, '2025-11-12', 'New laptop accessories'),
(2, 1, 140, '2025-11-18', 'Brunch'),
(2, 5, 280, '2025-11-25', 'Internet bill'),

-- December 2025
(2, 1, 165, '2025-12-02', 'Takeout orders'),
(2, 2, 95, '2025-12-07', 'Car maintenance'),
(2, 1, 230, '2025-12-12', 'Restaurant'),
(2, 4, 175, '2025-12-17', 'Theater show'),
(2, 3, 720, '2025-12-22', 'New phone'),
(2, 1, 200, '2025-12-22', 'Holiday dinner'),

INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES
-- October 2025
(3, 8, 1500, '2025-10-05', 'Weekend trip'),
(3, 1, 200, '2025-10-10', 'Hotel dining'),
(3, 2, 100, '2025-10-15', 'Car rental'),
(3, 1, 150, '2025-10-20', 'Fast food'),
(3, 4, 90, '2025-10-25', 'Gaming'),

-- November 2025
(3, 1, 220, '2025-11-01', 'Groceries'),
(3, 3, 900, '2025-11-06', 'Electronics'),
(3, 1, 180, '2025-11-11', 'Dining out'),
(3, 5, 420, '2025-11-16', 'Phone bill'),
(3, 2, 110, '2025-11-21', 'Gas'),

-- December 2025
(3, 1, 190, '2025-12-03', 'Restaurant'),
(3, 8, 2000, '2025-12-08', 'Vacation booking'),
(3, 1, 240, '2025-12-13', 'Fine dining'),
(3, 3, 650, '2025-12-18', 'Clothing'),
(3, 4, 150, '2025-12-23', 'Entertainment'),
(3, 1, 400, '2025-12-23', 'Year-end party');

INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES
-- October 2025
(4, 1, 135, '2025-10-03', 'Weekly groceries'),
(4, 7, 600, '2025-10-12', 'University fees'),
(4, 2, 40, '2025-10-18', 'Bus pass'),
(4, 1, 110, '2025-10-24', 'Dinner with family'),

-- November 2025
(4, 1, 145, '2025-11-05', 'Groceries'),
(4, 9, 200, '2025-11-10', 'Salon visit'),
(4, 3, 350, '2025-11-15', 'New clothes'),
(4, 6, 180, '2025-11-22', 'Medical checkup'),

-- December 2025
(4, 1, 155, '2025-12-04', 'Grocery shopping'),
(4, 4, 100, '2025-12-11', 'Music concert'),
(4, 3, 480, '2025-12-19', 'Christmas shopping'),
(4, 1, 170, '2025-12-25', 'Christmas feast');

INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES
-- October 2025
(5, 5, 400, '2025-10-01', 'Rent payment'),
(5, 1, 125, '2025-10-06', 'Groceries'),
(5, 2, 80, '2025-10-14', 'Gas'),
(5, 4, 65, '2025-10-21', 'Movie night'),

-- November 2025
(5, 5, 400, '2025-11-01', 'Rent payment'),
(5, 1, 130, '2025-11-07', 'Weekly shopping'),
(5, 3, 280, '2025-11-14', 'New headphones'),
(5, 2, 75, '2025-11-20', 'Car fuel'),

-- December 2025
(5, 5, 400, '2025-12-01', 'Rent payment'),
(5, 1, 140, '2025-12-06', 'Groceries'),
(5, 3, 550, '2025-12-16', 'Gaming console'),
(5, 4, 120, '2025-12-24', 'Christmas party');

-- ============================================
-- Useful Queries for Testing
-- ============================================

-- View all expenses with user and category names
-- SELECT 
--   e.id, 
--   u.name as user_name, 
--   c.name as category_name, 
--   e.amount, 
--   e.date, 
--   e.description
-- FROM expenses e
-- JOIN users u ON e.user_id = u.id
-- JOIN categories c ON e.category_id = c.id
-- ORDER BY e.date DESC;

-- Total expenses per user
-- SELECT 
--   u.name, 
--   COUNT(e.id) as expense_count, 
--   SUM(e.amount) as total_amount
-- FROM users u
-- LEFT JOIN expenses e ON u.id = e.user_id
-- GROUP BY u.id, u.name;

-- Total expenses per category
-- SELECT 
--   c.name, 
--   COUNT(e.id) as expense_count, 
--   SUM(e.amount) as total_amount
-- FROM categories c
-- LEFT JOIN expenses e ON c.id = e.category_id
-- GROUP BY c.id, c.name
-- ORDER BY total_amount DESC;
