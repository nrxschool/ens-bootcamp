"""
Flipper class
"""


class Flipper:
    def __init__(self, initial_state: bool) -> None:
        self.state: bool = initial_state

    def flip(self):
        self.state = not self.state
