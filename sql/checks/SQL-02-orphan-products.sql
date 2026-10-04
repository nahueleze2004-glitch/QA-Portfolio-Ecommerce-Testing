SELECT i.order_id
FROM order_items i
LEFT JOIN products p ON p.id = i.product_id
WHERE p.id IS NULL;
