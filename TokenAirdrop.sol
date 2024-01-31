// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract TokenAirdrop {
    address public owner;
    IERC20 public token;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    event Airdrop(address indexed recipient, uint256 amount);

    constructor(address _token) {
        owner = msg.sender;
        token = IERC20(_token);
    }

    function setToken(address _newToken) external onlyOwner {
        token = IERC20(_newToken);
    }

    function setAirdropQuantity(uint256 _newQuantity) external onlyOwner {
        require(_newQuantity > 0, "Invalid quantity");
    }

    function airdrop(address[] calldata _recipients, uint256[] calldata _amounts) external onlyOwner {
        require(_recipients.length == _amounts.length, "Invalid input lengths");

        for (uint256 i = 0; i < _recipients.length; i++) {
            address recipient = _recipients[i];
            uint256 amount = _amounts[i];

            require(recipient != address(0), "Invalid recipient address");
            require(amount > 0, "Invalid amount");

            bool success = token.transfer(recipient, amount);
            require(success, "Token transfer failed");

            emit Airdrop(recipient, amount);
        }
    }
}
