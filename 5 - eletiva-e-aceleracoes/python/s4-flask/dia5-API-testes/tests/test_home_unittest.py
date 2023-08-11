import unittest
from app import app


class TestHome(unittest.TestCase):
    def setUp(self):
        test_app = app.test_client()
        self.response = test_app.get("/")

    def test_status_response(self):
        self.assertEqual(self.response.status_code, 200)
