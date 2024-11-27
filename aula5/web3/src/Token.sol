// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "solady/tokens/ERC20.sol";
import {Ownable} from "solady/auth/Ownable.sol";

contract Token is ERC20, Ownable {
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
}
