// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ArcQuestHubV1_1 {
    error NotOwner();
    error NotAdmin();
    error ContractPaused();
    error AlreadyCheckedInToday();
    error InvalidAddress();

    struct BuilderStats {
        uint256 totalCheckIns;
        uint256 totalXp;
        uint256 currentStreak;
        uint256 bestStreak;
        uint256 lastCheckInDay;
        uint256 builderScore;
        bool registered;
    }

    address public immutable owner;
    address public defaultAdmin;

    string public projectName;
    string public projectUrl;
    string public githubUrl;

    bool public paused;

    uint256 public constant DAILY_CHECK_IN_XP = 10;
    uint256 public constant CHECK_IN_SCORE_BONUS = 15;
    uint256 public constant STREAK_SCORE_BONUS = 25;

    mapping(address => BuilderStats) private builderStats;
    address[] private builders;

    event ProjectMetadataUpdated(
        string projectName,
        string projectUrl,
        string githubUrl
    );

    event DefaultAdminUpdated(
        address indexed previousAdmin,
        address indexed newAdmin
    );

    event ContractPausedEvent(address indexed admin);
    event ContractUnpausedEvent(address indexed admin);

    event BuilderRegistered(address indexed builder);

    event DailyCheckInCompleted(
        address indexed builder,
        uint256 indexed day,
        uint256 totalCheckIns,
        uint256 totalXp,
        uint256 currentStreak,
        uint256 builderScore
    );

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier onlyAdmin() {
        if (msg.sender != owner && msg.sender != defaultAdmin) revert NotAdmin();
        _;
    }

    modifier whenNotPaused() {
        if (paused) revert ContractPaused();
        _;
    }

    constructor(
        address initialAdmin,
        string memory initialProjectName,
        string memory initialProjectUrl,
        string memory initialGithubUrl
    ) {
        if (initialAdmin == address(0)) revert InvalidAddress();

        owner = msg.sender;
        defaultAdmin = initialAdmin;

        projectName = initialProjectName;
        projectUrl = initialProjectUrl;
        githubUrl = initialGithubUrl;

        emit DefaultAdminUpdated(address(0), initialAdmin);
        emit ProjectMetadataUpdated(
            initialProjectName,
            initialProjectUrl,
            initialGithubUrl
        );
    }

    function checkIn() external whenNotPaused {
        uint256 currentDay = block.timestamp / 1 days;

        BuilderStats storage stats = builderStats[msg.sender];

        if (stats.lastCheckInDay == currentDay) {
            revert AlreadyCheckedInToday();
        }

        if (!stats.registered) {
            stats.registered = true;
            builders.push(msg.sender);
            emit BuilderRegistered(msg.sender);
        }

        if (stats.lastCheckInDay + 1 == currentDay) {
            stats.currentStreak += 1;
        } else {
            stats.currentStreak = 1;
        }

        if (stats.currentStreak > stats.bestStreak) {
            stats.bestStreak = stats.currentStreak;
        }

        stats.totalCheckIns += 1;
        stats.totalXp += DAILY_CHECK_IN_XP;
        stats.lastCheckInDay = currentDay;

        stats.builderScore =
            stats.totalXp +
            (stats.totalCheckIns * CHECK_IN_SCORE_BONUS) +
            (stats.currentStreak * STREAK_SCORE_BONUS);

        emit DailyCheckInCompleted(
            msg.sender,
            currentDay,
            stats.totalCheckIns,
            stats.totalXp,
            stats.currentStreak,
            stats.builderScore
        );
    }

    function updateProjectMetadata(
        string calldata newProjectName,
        string calldata newProjectUrl,
        string calldata newGithubUrl
    ) external onlyAdmin {
        projectName = newProjectName;
        projectUrl = newProjectUrl;
        githubUrl = newGithubUrl;

        emit ProjectMetadataUpdated(
            newProjectName,
            newProjectUrl,
            newGithubUrl
        );
    }

    function updateDefaultAdmin(address newAdmin) external onlyOwner {
        if (newAdmin == address(0)) revert InvalidAddress();

        address previousAdmin = defaultAdmin;
        defaultAdmin = newAdmin;

        emit DefaultAdminUpdated(previousAdmin, newAdmin);
    }

    function pause() external onlyAdmin {
        paused = true;
        emit ContractPausedEvent(msg.sender);
    }

    function unpause() external onlyAdmin {
        paused = false;
        emit ContractUnpausedEvent(msg.sender);
    }

    function getMyStats()
        external
        view
        returns (
            uint256 totalCheckIns,
            uint256 totalXp,
            uint256 currentStreak,
            uint256 bestStreak,
            uint256 lastCheckInDay,
            uint256 builderScore,
            bool registered
        )
    {
        BuilderStats memory stats = builderStats[msg.sender];

        return (
            stats.totalCheckIns,
            stats.totalXp,
            stats.currentStreak,
            stats.bestStreak,
            stats.lastCheckInDay,
            stats.builderScore,
            stats.registered
        );
    }

    function getStats(address builder)
        external
        view
        returns (
            uint256 totalCheckIns,
            uint256 totalXp,
            uint256 currentStreak,
            uint256 bestStreak,
            uint256 lastCheckInDay,
            uint256 builderScore,
            bool registered
        )
    {
        BuilderStats memory stats = builderStats[builder];

        return (
            stats.totalCheckIns,
            stats.totalXp,
            stats.currentStreak,
            stats.bestStreak,
            stats.lastCheckInDay,
            stats.builderScore,
            stats.registered
        );
    }

    function hasCheckedInToday(address builder) external view returns (bool) {
        uint256 currentDay = block.timestamp / 1 days;
        return builderStats[builder].lastCheckInDay == currentDay;
    }

    function getBuilderCount() external view returns (uint256) {
        return builders.length;
    }

    function getBuilderAt(uint256 index) external view returns (address) {
        return builders[index];
    }
}