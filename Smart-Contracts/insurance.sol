pragma solidity >=0.4.22 <0.7.0;

contract insurance{
    
    address owner;
    
    
    struct citizen{
        bool uniqueId;
        string name;
        uint amount;
    }
    
    mapping(bytes32 => citizen) public citizenMapping;
    
    mapping(address=>bool) public doctorMapping;
    
    
    constructor() public{
        owner=msg.sender;
    }
    
    
    modifier onlyOwner(){
        require(owner == msg.sender);
        _;
    }
    
    function setDoctor(address _address) public onlyOwner{
        require(!doctorMapping[_address]);
        doctorMapping[_address]=true;
    }
    
    function setCitizen(string memory name,uint amount) public onlyOwner returns (bytes32){
        
        bytes32 uid=(sha256(abi.encode(msg.sender,now)));
        
        require(!citizenMapping[uid].uniqueId);
        
        citizenMapping[uid].uniqueId=true;
        citizenMapping[uid].name=name;
        citizenMapping[uid].amount=amount;
        
        return uid;

    }
    
    function claimAmount(bytes32 uid,uint requiredAmount) public returns (string memory) {
        
        require(doctorMapping[msg.sender]);
        require(citizenMapping[uid].amount >= requiredAmount);
        citizenMapping[uid].amount-=requiredAmount;
        
        return ('Amount Claimed!!');
        
    }
    
    
    
    
    
    
}