# teste com Pytest


def test_list_item_multiply():
    my_list = [1, 2, 3]
    assert [item * 3 for item in my_list] == [3, 6, 9]
