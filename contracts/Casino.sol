// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Simple Casino DApp
 * @dev 一个简单的去中心化赌场智能合约，支持猜大小游戏
 */
contract Casino {
    // 游戏结果事件
    event GameResult(
        address indexed player,
        uint256 betAmount,
        uint256 diceRoll,
        bool won,
        uint256 payout
    );

    // 玩家历史记录
    struct Game {
        uint256 betAmount;
        uint256 diceRoll;
        bool won;
        uint256 timestamp;
    }

    mapping(address => Game[]) public playerHistory;

    /**
     * @dev 猜大小游戏：玩家下注，掷骰子1-6
     *      玩家选择猜小(1-3)或猜大(4-6)
     *      猜对了获得2倍下注金额
     */
    function playGuess(bool guessBig) public payable {
        require(msg.value > 0, "Bet amount must be greater than 0");
        require(address(this).balance >= msg.value * 2, "Casino doesn't have enough balance");

        // 生成随机数 1-6
        uint256 diceRoll = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, block.prevrandao))
        ) % 6 + 1;

        bool won = false;
        uint256 payout = 0;

        // 判断输赢
        if ((guessBig && diceRoll >= 4) || (!guessBig && diceRoll <= 3)) {
            won = true;
            payout = msg.value * 2;
            // 转钱给玩家
            (bool success, ) = msg.sender.call{value: payout}("");
            require(success, "Transfer failed");
        }

        // 记录游戏历史
        playerHistory[msg.sender].push(Game({
            betAmount: msg.value,
            diceRoll: diceRoll,
            won: won,
            timestamp: block.timestamp
        }));

        emit GameResult(msg.sender, msg.value, diceRoll, won, payout);
    }

    /**
     * @dev 获取玩家游戏历史
     */
    function getPlayerHistory(address player) public view returns (Game[] memory) {
        return playerHistory[player];
    }

    /**
     * @dev 获取赌场合约余额
     */
    function getCasinoBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // 允许合约接收ETH
    receive() external payable {}
}
