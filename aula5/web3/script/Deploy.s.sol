

pragma solidity ^0.8.13;


import "forge-std/console2.sol";
import "forge-std/Script.sol";

import {Ethermail} from "../src/Ethermail.sol";

contract Deploy is Script {

    Ethermail ethermail;

    function run() public {
        console.log("Deploying Ethermail contract...");

        ethermail = new Ethermail();

        console.log("Ethermail contract deployed at address: ", address(ethermail));
    }

}