//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract FallbackExample {
    uint256 public number;
    receive() external payable {
        number = 1;
    } 
    fallback() external payable { 
        number = 2;
    }
}