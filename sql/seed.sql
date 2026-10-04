CREATE TABLE customers (id INTEGER PRIMARY KEY, email TEXT NOT NULL);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, stock INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, subtotal_cents INTEGER,
  tax_cents INTEGER, total_cents INTEGER, status TEXT);
CREATE TABLE order_items (order_id INTEGER, product_id INTEGER, quantity INTEGER, unit_price_cents INTEGER);
CREATE TABLE payments (id INTEGER PRIMARY KEY, order_id INTEGER, amount_cents INTEGER, status TEXT);

INSERT INTO customers VALUES (1, 'buyer-a@example.test'), (2, 'buyer-b@example.test');
INSERT INTO products VALUES (1, 'Backpack', 3), (2, 'Bike light', 0);
INSERT INTO orders VALUES (100, 1, 5998, 480, 6478, 'paid'), (101, 2, 999, 80, 1079, 'pending');
INSERT INTO order_items VALUES (100, 1, 2, 2999), (101, 2, 1, 999);
INSERT INTO payments VALUES (1, 100, 6478, 'captured');
