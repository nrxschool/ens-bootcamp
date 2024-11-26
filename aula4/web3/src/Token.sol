// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "solady/tokens/ERC20.sol";
import {Ownable} from "solady/auth/Ownable.sol";

contract Token is ERC20, Ownable {
    constructor() {
        _initializeOwner(msg.sender);
    }

    function name() public pure override returns (string memory) {
        return "ENS Token";
    }

    function symbol() public pure override returns (string memory) {
        return "ENS";
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
