SELECT order_id
FROM order_items
WHERE quantity IS NULL OR quantity <= 0 OR quantity != CAST(quantity AS INTEGER);
