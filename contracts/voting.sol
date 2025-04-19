//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint256 id;
        string name;
        string sign;
        uint256 voteCount;
    }
    Candidate[] public candidates;
    mapping(address => bool) voters;
    address public owner = msg.sender;
    uint256 public endTime;
    uint256 public duration;
    bool start;
    address[] public allVoters;

    modifier onlyOwner() {
        require(owner == msg.sender, "Only Admin have permission this action");
        _;
    }

    function addCandidate(string memory name, string memory sign)public onlyOwner{
        candidates.push(Candidate(candidates.length, name, sign, 0));
    }

    function candidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    function deleteCandidate(uint256 id) public onlyOwner {
        require(id < candidates.length);
        for (uint256 i = id; i < candidates.length - 1; i++) {
            candidates[i] = candidates[i + 1];
            candidates[i].id = i;
        }
        candidates.pop();
    }

    function startVoting(uint256 End_Time) public onlyOwner {
        start = true;
        duration = End_Time;
        endTime = End_Time * 1 minutes + block.timestamp;
    }

    function voteCandidate(uint256 id) public {
        require(start, "Vote hasn't started yet");
        require(endTime >= block.timestamp, "The voting has closed!");
        require(!voters[msg.sender], "You've already vote someone");
        candidates[id].voteCount += 1;
        voters[msg.sender] = true;
        allVoters.push(msg.sender);
    }

    function resetVoteCount() public onlyOwner {
        for (uint256 i = 0; i < candidates.length; i++) {
            candidates[i].voteCount = 0;
        }
    }

    function resetAddress() public onlyOwner {
        for (uint256 i = 0; i < allVoters.length; i++) {
            voters[allVoters[i]] = false;
        }
        delete allVoters;
    }

    function rmvAllCandidates() public onlyOwner {
        delete candidates;
    }

    function endVote() public onlyOwner {
        start = false;
        endTime = 0;
    }
}
