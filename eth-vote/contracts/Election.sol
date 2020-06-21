pragma solidity ^0.5.0;

contract Election {
    uint public candidateCount =0;
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    mapping(uint => Candidate) public candidates;
    constructor() public {
        addCandidate('A'); 
        addCandidate('B');
    }
    function addCandidate(string memory name) private{
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount,name,0);
    }
}