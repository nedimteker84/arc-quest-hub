// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract BuilderPassportNFT {
    error NotOwner();
    error ContractPaused();
    error AlreadyMinted();
    error InvalidAddress();
    error TokenDoesNotExist();
    error NotTokenOwner();

    string public name = "Arc Builder Passport";
    string public symbol = "ABP";

    address public immutable owner;
    address public defaultAdmin;
    bool public paused;

    uint256 public totalSupply;

    mapping(uint256 => address) private tokenOwners;
    mapping(address => uint256) private walletTokenId;
    mapping(address => bool) public hasMinted;
    mapping(uint256 => string) private tokenUris;
    mapping(address => uint256) public mintedAt;

    event PassportMinted(
        address indexed builder,
        uint256 indexed tokenId,
        string tokenUri
    );

    event TokenUriUpdated(
        uint256 indexed tokenId,
        string tokenUri
    );

    event Paused(address indexed admin);
    event Unpaused(address indexed admin);

    modifier onlyAdmin() {
        if (msg.sender != owner && msg.sender != defaultAdmin) {
            revert NotOwner();
        }
        _;
    }

    modifier whenNotPaused() {
        if (paused) revert ContractPaused();
        _;
    }

    constructor(address initialAdmin) {
        if (initialAdmin == address(0)) revert InvalidAddress();

        owner = msg.sender;
        defaultAdmin = initialAdmin;
    }

    function mintPassport(string calldata tokenUri)
        external
        whenNotPaused
        returns (uint256)
    {
        if (hasMinted[msg.sender]) revert AlreadyMinted();

        totalSupply += 1;

        uint256 tokenId = totalSupply;

        tokenOwners[tokenId] = msg.sender;
        walletTokenId[msg.sender] = tokenId;
        hasMinted[msg.sender] = true;
        tokenUris[tokenId] = tokenUri;
        mintedAt[msg.sender] = block.timestamp;

        emit PassportMinted(msg.sender, tokenId, tokenUri);

        return tokenId;
    }

    function updateTokenUri(uint256 tokenId, string calldata tokenUri)
        external
        whenNotPaused
    {
        address tokenOwner = tokenOwners[tokenId];

        if (tokenOwner == address(0)) revert TokenDoesNotExist();
        if (tokenOwner != msg.sender) revert NotTokenOwner();

        tokenUris[tokenId] = tokenUri;

        emit TokenUriUpdated(tokenId, tokenUri);
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        address tokenOwner = tokenOwners[tokenId];

        if (tokenOwner == address(0)) revert TokenDoesNotExist();

        return tokenOwner;
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        if (tokenOwners[tokenId] == address(0)) revert TokenDoesNotExist();

        return tokenUris[tokenId];
    }

    function tokenIdOf(address builder) external view returns (uint256) {
        return walletTokenId[builder];
    }

    function pause() external onlyAdmin {
        paused = true;

        emit Paused(msg.sender);
    }

    function unpause() external onlyAdmin {
        paused = false;

        emit Unpaused(msg.sender);
    }

    function updateDefaultAdmin(address newAdmin) external onlyAdmin {
        if (newAdmin == address(0)) revert InvalidAddress();

        defaultAdmin = newAdmin;
    }
}