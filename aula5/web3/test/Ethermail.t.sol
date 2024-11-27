// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Ethermail} from "../src/Ethermail.sol";

contract EthermailTest is Test {
    Ethermail public ethermail;
    uint256 public constant MESSAGE_COST = 0.0001 ether;



    function setUp() public {
        ethermail = new Ethermail();
        vm.deal(address(this), 1 ether);
    }

    function testSendMessage() public {
        string memory message = "Hello, Ethermail!";

        // Send a message
        ethermail.send{value: MESSAGE_COST}(message);

        // Check the inbox
        (address sender, string memory content) = ethermail.inbox(0);
        assertEq(sender, address(this));
        assertEq(content, message);
    }

    function testInsufficientBalance() public {
        string memory message = "This should fail!";

        // Attempt to send a message without enough ether
        vm.expectRevert("Insufficient balance to send message.");

        ethermail.send{value: 0}(message);
    }

    function testInboxLength() public {
        string memory message1 = "First message";
        string memory message2 = "Second message";

        ethermail.send{value: MESSAGE_COST}(message1);
        ethermail.send{value: MESSAGE_COST}(message2);

        // Check the inbox length
        assertEq(ethermail.getInbox().length, 2);
    }
}
