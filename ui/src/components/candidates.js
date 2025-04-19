import React, { useEffect, useState } from 'react'
import Loder from './loder';
import showAlert from './alert';

export default function Candidates(props) {
    const [candidates, setCandidates] = useState([])
    const [isloading, setIsLoading] = useState(false);


    const fetchData = async () => {
        if (isloading || !props.contract) return;
        setIsLoading(true);
        const candidatesArray = [];
        try {

            const count = await props.contract.candidatesCount()
            for (let i = 0; i < count; i++) {
                const candidate = await props.contract.candidates(i)
                console.log(candidate)
                candidatesArray.push(candidate)
            }
            setCandidates(candidatesArray)
        } catch (err) {
            console.log(err.message)
        } finally {
            setIsLoading(false);
        }
    }



    useEffect(() => {
        fetchData()
    }, [props.contract])

    const voteCandidates = async (id) => {
        if (isloading) return
        setIsLoading(true);
        try {
            const vote = await props.contract.voteCandidate(id)
            await vote.wait()

            showAlert("Voted successfully", "success")
        } catch (err) {

            showAlert("Something went wrong", "error")
            console.log(err.message)
        } finally {
            setIsLoading(false);
            fetchData()
        }


    }
    return (
        <>
            {isloading && < Loder />}
            {!props.wallet ? (<h3 style={{ marginTop: "40vh", marginLeft: "35vw", fontFamily: "cursive", color: "red" }}>Connect Your Metamak First</h3>) : (
                <div className="row container-fluid py-5 px-5">
                    {candidates.map((item, i) => (
                        <div className="col-sm-3 my-3 " key={i}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Name: {item.name}</h5>
                                    <p className="card-text">Sign: {item.sign}</p>
                                    <p className="card-text">Vote: {item.voteCount}</p>

                                    <div className='d-flex justify-content-center align-items-center flex-column gap-1'>
                                        <button type="button" className="btn btn-success col-12" onClick={() => voteCandidates(item.id)} >
                                            Vote
                                        </button>
                                        {props.isOwner && (
                                            <button type="button" className="btn btn-danger col-12">
                                                Delete
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>)}
        </>
    )
}
