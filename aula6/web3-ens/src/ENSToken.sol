// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "solady/tokens/ERC20.sol";
import {Ownable} from "solady/auth/Ownable.sol";

contract ENSToken is ERC20, Ownable {
    string[] public mints;

    constructor() {
        _initializeOwner(msg.sender);
    }

    function name() public pure override returns (string memory) {
        return "ENS Token";
    }

    function symbol() public pure override returns (string memory) {
        return "ENS";
    }

    function mint(string calldata message) external {
        if (balanceOf(msg.sender) > 0) {
            revert("You already have Tokens");
        }

        mints.push(message);
        _mint(msg.sender, 100 * 1e18);
    }

    function getMints() external view returns (string[] memory) {
        return mints;
    }

    mapping(string nickname => address owner) ensNames;
    uint256 NAME_COST = 0.000001 ether;
    event NewName(address owner, string nickname);

    function createName(string calldata nickname) external payable {
        if (msg.value < NAME_COST) {
            revert("Insufficient Balance");
        }

        ensNames[nickname] = msg.sender;

        emit NewName(msg.sender, nickname);
    }

    function transfer(
        string calldata to,
        uint256 amount
    ) public returns (bool) {
        if (ensNames[to] == address(0x0)) {
            revert("The nickname not exist!");
        }
        return transfer(ensNames[to], amount);
    }
}
