// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Counter {
    // mapping
    // array
    // struct

    struct Pessoa {
        string nome;
        uint8 idade;
    }

    // Tabela de endereços e saldos
    // | address | uint256  |
    // | 0x123   |  100     |
    // | 0x124   |  100     |
    // | 0x125   |  100     |
    mapping(address => uint256) balance;
    address[] holders;

    function add100Tokens(address user) external {
        balance[user] = 100;
        holders.push(user);
    }

    function removeUser(address user) external {
        for (uint256 i = 0; i < holders.length; i++) {
            if (holders[i] == user) {
                holders[i] = holders[holders.length - 1];

                holders.pop();

                // user3
                // [user1, user2, user3, user4]
                // 0    ,   1   ,   2   ,   3
                // [user1, user2, user3, user4]
                // [user1, user2, user4, user4].pop()
                // [user1, user2, user4]
                break;
            }
        }
        balance[user] = 0;
    }

    function balanceOf(address user) external view returns (uint256) {
        return balance[user];
    }

    function holdersLen() external view returns (uint256) {
        return holders.length;
    }

    /*
    /// javascript
    let object = {
        address: number
    }

    /// python
    dict = {
        "address": number
    }

    /// rust

    HashMap::set("address", u256);
    */
}
