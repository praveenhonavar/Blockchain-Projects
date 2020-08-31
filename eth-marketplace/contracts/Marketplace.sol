pragma solidity >=0.4.22 < 0.7.0;

contract Marketplace{
    
    string sellerName;
    uint uniqueId = 0;
    uint  public amount;
    
    // mapping(address=>string) public sellerMapping;
   
    struct Books{
        address payable sellerAddress;
        string bookName;
        uint price;
        
    }

    event bookAdded(
        uint uniqueId,
        string bookName,
        uint price,
        address payable sellerAddress
    );

    event bookPurchased(
        uint uniqueId,
        address buyer,
        address seller
    );

    mapping(uint => Books) public bookMapping;

    function sell(string memory _bookName,uint _price)public returns (uint){
        uniqueId ++;
        bookMapping[uniqueId].sellerAddress = msg.sender;
        bookMapping[uniqueId].price = _price;
        bookMapping[uniqueId].bookName = _bookName;
        emit bookAdded(uniqueId,_bookName,_price,msg.sender);
        return uniqueId;
    }

    function buy(uint _uniqueId) public payable{
        Books memory book = bookMapping[_uniqueId];
        // address payable _seller = book.sellerAddress;
        require(book.sellerAddress != msg.sender);
        require(msg.value >= book.price);
        book.sellerAddress.transfer(msg.value);
        emit bookPurchased(_uniqueId,msg.sender,book.sellerAddress);
    }
}