// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Ethermail {
    uint256 public constant MESSAGE_COST = 0.0001 ether;

    event NewInbox(address indexed sender, string content);

    Mail[] public inbox;

    struct Mail {
        address sender;
        string content;
    }

    function send(string calldata _content) external payable {
        if (msg.value < MESSAGE_COST) {
            revert("Insufficient balance to send message.");
        }

        inbox.push(Mail({sender: msg.sender, content: _content}));

        emit NewInbox(msg.sender, _content);
    }

    function getInbox() external view returns (Mail[] memory) {
        return inbox;
    }
}
