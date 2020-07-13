// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract test{
    string public name;
    constructor() public {
        name = 'pd';
    }
    function setName(string memory n) public{
        name = n;
    }
    function show() public view returns (string memory){
        return name;
    }
}