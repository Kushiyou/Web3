//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

error OnlyOwner(address addr);

contract CustomError {
    address immutable _owner;
    constructor() {
        _owner = msg.sender;
    }

    function test () public view {
        //require(msg.sender == _owner,'your is not owner');
        if(msg.sender != _owner){
           revert OnlyOwner(msg.sender);
        }
    }
}