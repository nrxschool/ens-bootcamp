// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {Flipper} from "../src/Flipper.sol";

contract Deploy is Script {
    Flipper public flipper;


    function run() public {
        // ESTÁ SENDO EXECUTADO ON CHAIN

        vm.startBroadcast(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80);
        flipper = new Flipper(false);

        console.log("Flipper address: ", address(flipper));
        vm.stopBroadcast();
    }
}
