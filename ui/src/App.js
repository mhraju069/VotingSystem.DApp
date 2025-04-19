import AddCandidate from './components/addCandidate'
import Candidates from './components/candidates';
import StartVote from './components/StartVote';
import Loder from './components/loder';
import showAlert from './components/alert';
import Others from './components/others';
import CountDown from './components/countDown';
import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import votingABI from './contract/Voting.json'


function App() {
  const contracts_address = "0xD4A69A92e4892f41543551122fA3e190d752D78E"
  const abi = votingABI.abi

  const [wallet, setWallet] = useState()
  const [shortAddr, setShortAddr] = useState()
  const [contract, setContract] = useState()
  const [showCandidates, setShowCandidates] = useState(true)
  const [showAddCandidate, setShowAddCandidate] = useState(false)
  const [startVote, setStartVote] = useState(false)
  const [showOthers, setShowOthers] = useState(false)
  const [isloading, setIsLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false)
  const [endTime, setEndTime] = useState(0);


  const init = async () => {

    if (!window.ethereum) {
      alert("please install metamask")
      return
    }
    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const account = await provider.send("eth_requestAccounts", [])
      setWallet(account[0])

      const shortAddrs = account[0].toString().slice(0, 7) + "...." + account[0].toString().slice(-6)
      setShortAddr(shortAddrs)

      const contracts = new ethers.Contract(contracts_address, abi, signer)
      setContract(contracts)
      setIsLoading(false);
      showAlert("Connected successfully as: " + shortAddrs, "success")

      const owner = await contracts.owner();
      setIsOwner(owner.toLowerCase() === account[0].toLowerCase());

      const endtime = await contracts.endTime()
      setEndTime(Number(endtime))
     
    } catch (err) {
      setIsLoading(false);
      showAlert(err.message, "error")

    }
  }









  const ShowCandidates = () => {
    if (!showCandidates) { setShowCandidates(true); setShowAddCandidate(false); setStartVote(false); setShowOthers(false) }
  }

  const showAddCandidates = () => {
    if (!showAddCandidate) { setShowAddCandidate(true); setShowCandidates(false); setStartVote(false); setShowOthers(false) }
  }
  const startVoting = () => {
    if (!startVote) { setStartVote(true); setShowAddCandidate(false); setShowCandidates(false); setShowOthers(false) }
  }
  const others = () => {
    if (!showOthers) { setShowOthers(true); setStartVote(false); setShowAddCandidate(false); setShowCandidates(false) }
  }


  return (
    <>
      {isloading && < Loder />}






      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 px-5">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">D.Voting System</a>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span type="button" className="nav-link" onClick={ShowCandidates} >Home</span>
              </li>
              <li className="nav-item">
                <span type="button" className="nav-link" onClick={showAddCandidates} >Add Candidate</span>
              </li>
              <li className="nav-item">
                <span type="button" className="nav-link" onClick={startVoting} >Start Voting</span>
              </li>
              <li className="nav-item">
                <span type="button" className="nav-link" onClick={others} >Others</span>
              </li>
            </ul>
            <span className="navbar-text">
              <div className="custom-tooltip-container">
                <button type="button" className="btn btn-light me-2" onClick={init}>{wallet ? "Connected" : "Connect Wallet"}</button>
                {wallet ? (<div className="custom-tooltip-content">
                  <span className="custom-tooltip-arrow"></span>
                  <p className="custom-tooltip-text">
                    You're connected with :{shortAddr}
                  </p>
                </div>) : ""}
              </div>
              <button type="button" className="btn btn-outline-info">Switch Wallet</button>
            </span>
          </div>
        </div>
      </nav>
      {startVote && <StartVote contract={contract} isOwner={isOwner} setEndTime={setEndTime} />}
      {showCandidates && <CountDown endTime={endTime} />}
      {showAddCandidate && <AddCandidate contract={contract} isOwner={isOwner} />}
      {showCandidates && <Candidates contract={contract} wallet={wallet} isOwner={isOwner} />}
      {showOthers && <Others contract={contract} isOwner={isOwner} setEndTime={setEndTime} />}

    </>
  );
}

export default App;
