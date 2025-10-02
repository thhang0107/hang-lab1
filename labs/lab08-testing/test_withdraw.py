import pytest
from withdraw_module import verify_pin, withdraw  # giả sử code withdraw_module.py bạn viết ở Lab 07

# Test verify_pin
def test_verify_pin_correct():
    assert verify_pin("123456789", "1234") == True

def test_verify_pin_wrong():
    assert verify_pin("123456789", "0000") == False

# Test withdraw
def test_withdraw_success(monkeypatch):
    def mock_query(card_no, amount): return "OK"
    monkeypatch.setattr("withdraw_module.withdraw", mock_query)
    assert withdraw("123456789", 100) == "OK"

def test_withdraw_insufficient(monkeypatch):
    def mock_query(card_no, amount): raise Exception("Insufficient funds")
    monkeypatch.setattr("withdraw_module.withdraw", mock_query)
    with pytest.raises(Exception):
        withdraw("123456789", 1000)
