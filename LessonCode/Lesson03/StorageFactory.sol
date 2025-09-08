//SPDX-License-Identifier:MIT
pragma solidity 0.8.30;

import './SimpleStorage.sol';

contract StorageFactory {
    SimpleStorage[] public simpleStoragesArray;

    function createSimpleStorageContract () public {
        SimpleStorage simpleStorages = new SimpleStorage();
        simpleStoragesArray.push(simpleStorages);
    }

    function sfStore(uint256 simpleStoragesArrayIndex, uint256  simpleStorageNum) public  {
        SimpleStorage simpleStorage = simpleStoragesArray[simpleStoragesArrayIndex];
        simpleStorage.store(simpleStorageNum);
    }

    function sfGet(uint256 simpleStoragesArrayIndex) public view returns(uint256) {
        SimpleStorage simpleStorage = simpleStoragesArray[simpleStoragesArrayIndex];
        return simpleStorage.retrieve();
    }
}