// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CRUD {
    struct Pessoa {
        uint256 id;
        string nome;
        uint8 idade;
    }

    // storage
    mapping(uint256 => Pessoa) public pessoas;
    uint256 private counter;

    function getCounter() public view returns (uint256) {
        return counter;
    }

    // Create
    function createPessoa(
        string memory _nome,
        uint8 _idade
    ) internal returns (uint256) {
        counter++;
        pessoas[counter] = Pessoa(counter, _nome, _idade);
        return counter;
    }

    // External function to call the internal createPessoa function
    function createPessoaExternal(
        string memory _nome,
        uint8 _idade
    ) external returns (uint256) {
        return createPessoa(_nome, _idade);
    }

    // Read
    function readPessoa(uint256 _id) external view returns (Pessoa memory) {
        return pessoas[_id];
    }

    // PURE
    function isEven(uint256 _number) public pure returns (bool) {
        return _number % 2 == 0;
    }

    // Update
    function updatePessoa(
        uint256 _id,
        string memory _nome,
        uint8 _idade
    ) public {
        pessoas[_id].nome = _nome;
        pessoas[_id].idade = _idade;

        revert("mesmo assim deu erro");
    }

    // Delete
    function deletePessoa(uint256 _id) public {
        pessoas[_id] = Pessoa({id: _id, nome: "", idade: 0});
    }
}

contract CRUD2 {
    CRUD crud;

    constructor(address _crud) {
        crud = CRUD(_crud);
    }

    function callCRUD() external {
        bytes4 fn = bytes4(keccak256(bytes("readPessoal(uint256)")));
        bytes memory payload = abi.encodeWithSelector(fn, 90);

        (bool ok, bytes memory data) = address(crud).call(payload);
        if (!ok) {
            assembly {
                revert(add(data, 32), mload(data))
            }
        }
    }
}

contract ERC1155 {
    // erc20
    // | address  | uint256  |
    // | 0xalice  |  10      |
    // | 0xbob    |  190     |
    mapping(address => uint256) token1;
    // erc20
    // | address  | uint256  |
    // | 0xalice  |  10      |
    // | 0xbob    |  190     |
    mapping(address => uint256) token2;
    // erc20
    // | address  | uint256  |
    // | 0xalice  |  10      |
    // | 0xbob    |  190     |
    mapping(address => uint256) token3;

    // erc721
    // | address  | uint256  |
    // | 0xalice  |  0       |
    // | 0xbob    |  [2, 1]  |
    mapping(address => uint256[]) nft1;
    // erc721
    // | address  | uint256  |
    // | 0xalice  |  0       |
    // | 0xbob    |  [2, 1]  |
    mapping(address => uint256[]) nft2;
}
