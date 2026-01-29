DELETE FROM blog_posts;
DELETE FROM cities;
DELETE FROM users;

INSERT INTO users (id, email, password_hash, name, role) VALUES
('ADMIN_UUID', 'admin@example.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'Admin User', 'admin'); -- Password: admin123

INSERT INTO cities (id, name, country, population, description, landmarks) VALUES
('CITY1_UUID', 'Tokyo', 'Japan', 37400000, 'Capital of Japan, known for its blend of tradition and technology.', '["Shibuya Crossing", "Tokyo Tower", "Senso-ji Temple", "Imperial Palace"]'),
('CITY2_UUID', 'Paris', 'France', 11000000, 'City of light, famous for art, fashion, and culture.', '["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Arc de Triomphe"]'),
('CITY3_UUID', 'New York', 'USA', 18800000, 'The city that never sleeps. Major global hub for finance and culture.', '["Statue of Liberty", "Times Square", "Central Park", "Empire State Building"]'),
('CITY4_UUID', 'London', 'UK', 9000000, 'Historic capital with world-class museums and diverse neighborhoods.', '["Big Ben", "Tower of London", "British Museum", "Buckingham Palace"]'),
('CITY5_UUID', 'Sydney', 'Australia', 5300000, 'Harbor city known for its opera house and outdoor lifestyle.', '["Sydney Opera House", "Harbour Bridge", "Bondi Beach", "Royal Botanic Gardens"]');

INSERT INTO blog_posts (id, title, slug, content, author_id, author_name, created_at) VALUES
('BLOG1_UUID', 'Welcome to the Blog', 'welcome-to-the-blog', 'This is the first blog post on our City Info Website.', 'ADMIN_UUID', 'Admin User', UTC_TIMESTAMP()),
('BLOG2_UUID', 'Exploring Paris', 'exploring-paris', 'A detailed look at the beautiful city of Paris.', 'ADMIN_UUID', 'Admin User', UTC_TIMESTAMP());
