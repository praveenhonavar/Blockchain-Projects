pragma solidity >=0.4.22 <0.7.0;

contract Marketplace{
    
    string sellerName;
    uint uniqueId = 0;
    
    // mapping(address=>string) public sellerMapping;
   
    struct sellBook{
        address payable sellerAddres;
        uint price;
        string bookName;
    }
    
    mapping(uint => sellBook) public bookMapping;
    

    function sell(string memory bookName , uint price) public returns (uint){
        
        // bytes32 uniqueId = sha256(abi.encode(msg.sender,bookName));
        
        uniqueId+=1;
    
        bookMapping[uniqueId].sellerAddres=msg.sender;
        bookMapping[uniqueId].price= price;
        bookMapping[uniqueId].bookName=bookName;
        
        return uniqueId;
    
    }
    
    function buy(uint uniqueId) public payable {
        sellBook memory book = bookMapping[uniqueId];
        uint amount = book.price;
        address payable sellerAddres =book.sellerAddres;
        
        address(sellerAddres).transfer(msg.value);
        
        
    }
    
}    
    
    
    