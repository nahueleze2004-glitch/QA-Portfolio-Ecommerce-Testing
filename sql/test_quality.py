"""Validate each data-quality query against clean and deliberately inconsistent data."""
import pathlib
import sqlite3
import unittest

ROOT = pathlib.Path(__file__).resolve().parent


class DataQualityTests(unittest.TestCase):
    def setUp(self):
        self.db = sqlite3.connect(':memory:')
        self.addCleanup(self.db.close)
        self.db.executescript((ROOT / 'seed.sql').read_text())

    def detects(self, query_name, mutation, expected_id):
        query = (ROOT / 'checks' / query_name).read_text()
        self.assertEqual(self.db.execute(query).fetchall(), [], 'Clean data must not trigger an alert')
        self.db.execute(mutation)
        self.assertEqual(self.db.execute(query).fetchall(), [(expected_id,)], 'The affected record must be identified')

    def test_SQL_01_orphan_customer(self):
        self.detects('SQL-01-orphan-customers.sql', 'UPDATE orders SET customer_id=999 WHERE id=100', 100)

    def test_SQL_02_orphan_product(self):
        self.detects('SQL-02-orphan-products.sql', 'UPDATE order_items SET product_id=999 WHERE order_id=100', 100)

    def test_SQL_03_invalid_quantity(self):
        self.detects('SQL-03-invalid-quantity.sql', 'UPDATE order_items SET quantity=0 WHERE order_id=100', 100)

    def test_SQL_04_inconsistent_total(self):
        self.detects('SQL-04-order-totals.sql', 'UPDATE orders SET total_cents=1 WHERE id=100', 100)

    def test_SQL_05_payment_mismatch(self):
        self.detects('SQL-05-payment-reconciliation.sql', 'UPDATE payments SET amount_cents=100 WHERE order_id=100', 100)

    def test_SQL_06_negative_stock(self):
        self.detects('SQL-06-negative-stock.sql', 'UPDATE products SET stock=-1 WHERE id=1', 1)


if __name__ == '__main__':
    unittest.main(verbosity=2)
