SELECT o.id
FROM orders o
LEFT JOIN payments p ON p.order_id = o.id AND p.status = 'captured'
WHERE o.status = 'paid'
GROUP BY o.id, o.total_cents
HAVING COALESCE(SUM(p.amount_cents), 0) != o.total_cents;
