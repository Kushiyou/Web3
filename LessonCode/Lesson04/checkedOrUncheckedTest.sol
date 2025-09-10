//SPDX-License-Identifier: MIT
pragma solidity ^  0.8.0;
//before 0.6version, need to safeMath

contract CheckTest {
    uint8 public number = 255;
    function add () public {
        number = number + 1 ;
        //unchecked {number = number + 1 ;} //no revert
    }
}