//SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;
import './myLibrary.sol';
contract FundMe {
    //给unint 添加library方法之类的，类似继承
    using MyLibrary for uint256;
    //至此uint256这个类型可以使用add方法
    function fundMeAdd () payable public {
        msg.value.add();
        //msg.value这个会变成add方法里面的第一个参数
        //若在add('第二个参数')，则在library中定义的add方法中设置接受的第二个形参
    }
}