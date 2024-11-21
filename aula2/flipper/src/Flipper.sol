// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Flipper {
    bool state;

    constructor(bool initial_state) {
        state = initial_state;
    }

    function flip() external {
        state = !state;
    }

    function getState() external view returns (bool) {
        return state;
    }


    function novaFn() external returns (uint32) {
        return 3;
    }
}
