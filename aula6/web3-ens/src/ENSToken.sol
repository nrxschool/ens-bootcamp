// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "solady/tokens/ERC20.sol";
import {Ownable} from "solady/auth/Ownable.sol";

contract ENSToken is ERC20, Ownable {
    mapping(string nickname => address owner) public ensNames;

    string[] ensNamesArray;
    string[] public mints;

    uint256 constant NAME_COST = 0.000001 ether;
    uint256 nicknamesCount;
    uint256 mintsCounter;

    event NewName(address owner, string nickname);


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

        mintsCounter++;
        mints.push(message);
        _mint(msg.sender, 100 * 1e18);
    }

    function getMints() external view returns (string[] memory) {
        return mints;
    }

    function createName(string calldata nickname) external payable {
        if (msg.value < NAME_COST) {
            revert InsufficientBalance();
        }

        nicknamesCount++;
        ensNamesArray.push(nickname);

        ensNames[nickname] = msg.sender;

        emit NewName(msg.sender, nickname);
    }

    function transfer(string calldata to, uint256 amount) public returns (bool) {
        if (ensNames[to] == address(0x0)) {
            revert("The nickname not exist!");
        }
        return transfer(ensNames[to], amount);
    }

    function withdraw() external {
        payable(owner()).transfer(address(this).balance);
    }
}
