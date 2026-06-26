// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CheckIn {
    struct UserStats {
        uint256 totalCheckIns;
        uint256 lastCheckInDay;
    }

    mapping(address => UserStats) private userStats;

    event CheckedIn(
        address indexed user,
        uint256 indexed day,
        uint256 totalCheckIns
    );

    function checkIn() external {
        uint256 currentDay = block.timestamp / 1 days;

        require(
            userStats[msg.sender].lastCheckInDay < currentDay,
            "Already checked in today"
        );

        userStats[msg.sender].totalCheckIns += 1;
        userStats[msg.sender].lastCheckInDay = currentDay;

        emit CheckedIn(
            msg.sender,
            currentDay,
            userStats[msg.sender].totalCheckIns
        );
    }

    function getMyStats() external view returns (
        uint256 totalCheckIns,
        uint256 lastCheckInDay
    ) {
        UserStats memory stats = userStats[msg.sender];

        return (
            stats.totalCheckIns,
            stats.lastCheckInDay
        );
    }

    function getStats(address user) external view returns (
        uint256 totalCheckIns,
        uint256 lastCheckInDay
    ) {
        UserStats memory stats = userStats[user];

        return (
            stats.totalCheckIns,
            stats.lastCheckInDay
        );
    }
}