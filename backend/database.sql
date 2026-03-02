-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER NOT NULL,
    course VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO students (name, email, age, course) VALUES
('John Doe', 'john.doe@example.com', 20, 'Computer Science'),
('Jane Smith', 'jane.smith@example.com', 22, 'Mathematics'),
('Bob Johnson', 'bob.johnson@example.com', 21, 'Physics');

