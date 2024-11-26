// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {Flipper} from "../src/Flipper.sol";

contract FlipperTest is Test {
    Flipper public flipper;

    function setUp() public {
        flipper = new Flipper(false);
    }

    function testInitialStateFlipper() public {
        assertEq(flipper.getState(), false);
    }

    function testNovaFn() public {
        uint32 result = flipper.novaFn();
        assertEq(result, 3);
    }
}
