SELECT o.id
FROM orders o
LEFT JOIN order_items i ON i.order_id = o.id
GROUP BY o.id, o.subtotal_cents, o.tax_cents, o.total_cents
HAVING o.subtotal_cents != COALESCE(SUM(i.quantity * i.unit_price_cents), 0)
    OR o.total_cents != o.subtotal_cents + o.tax_cents;
