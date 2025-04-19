import React, { useState } from 'react'
import Loder from './loder';
import showAlert from './alert';


export default function Others(props) {
    const [isloading, setIsLoading] = useState(false);


    const rmvVoteCount = async () => {
        if (isloading) return
        setIsLoading(true);
        try {
            const count = await props.contract.resetVoteCount()
            await count.wait()
            showAlert("Vote Count reset successfully", "success")
        } catch (err) {
            showAlert("Something went wrong", "error")
            console.log(err.message)
        } finally {
            setIsLoading(false);
        }

    }
    const resetAddress = async () => {
        if (isloading) return
        setIsLoading(true);
        try {
            const count = await props.contract.resetAddress()
            await count.wait()
            showAlert("Reset all voters address successfully", "success")
        } catch (err) {
            showAlert("Something went wrong", "error")
            console.log(err.message)
        } finally {
            setIsLoading(false);
        }

    }

    const endVote = async () => {
        if (isloading) return
        setIsLoading(true);
        try {
            const count = await props.contract.endVote()
            await count.wait()
            showAlert("Vote has ended successfully", "success")
            props.setEndTime(0)
        } catch (err) {
            showAlert("Something went wrong", "error")
            console.log(err.message)
        } finally {
            setIsLoading(false);
        }

    }


    const rmvAllCandidates = async () => {
        if (isloading) return
        setIsLoading(true);
        try {
            const count = await props.contract.rmvAllCandidates()
            await count.wait()
            showAlert("Remove all candidates successfully", "success")
        } catch (err) {
            showAlert("Something went wrong", "error")
            console.log(err.message)
        } finally {
            setIsLoading(false);
        }

    }





    return (
        <>
            {isloading && < Loder />}
            {!props.isOwner ? (
                <div className='body'>
                    <div className="wrapper">
                        <div className="box">
                            <h1>403</h1>
                            <p className='denied'>Sorry, You don't have access this page.</p>
                            <p className='denied'><a href="/">Only admin can access this page.</a></p>
                        </div>
                    </div>
                </div>
            ) : (

                <div className='container'>
                    <div class="card text-center">
                        <div class="card-header">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Reset All Vote count</h5>
                            <p class="card-text">Every candidates vote will 0</p>
                            <button type="button" className="btn btn-outline-danger" onClick={() => {
                                if (window.confirm("Are you sure?")) {
                                    rmvVoteCount();
                                }
                            }} >Reset</button>
                        </div>
                        <div class="card-footer text-muted">
                        </div>
                    </div>
                    <div class="card text-center">
                        <div class="card-header">

                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Reset All Voters</h5>
                            <p class="card-text">Reset all voters that everyone can vote again</p>
                            <button type="button" className="btn btn-outline-warning" onClick={() => {
                                if (window.confirm("Are you sure?")) {
                                    resetAddress();
                                }
                            }} >Reset</button>
                        </div>
                        <div class="card-footer text-muted">
                        </div>
                    </div>
                    <div class="card text-center">
                        <div class="card-header">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">End Vote</h5>
                            <p class="card-text">End the running vote</p>
                            <button type="button" className="btn btn-outline-warning" onClick={() => {
                                if (window.confirm("Are you sure?")) {
                                    endVote();
                                }
                            }} >End</button>
                        </div>
                        <div class="card-footer text-muted">
                        </div>
                    </div>
                    <div class="card text-center">
                        <div class="card-header">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Remove all candidates</h5>
                            <p class="card-text">Delete all the existing candidates</p>
                            <button type="button" className="btn btn-outline-danger" onClick={() => {
                                if (window.confirm("Are you sure?")) {
                                    rmvAllCandidates();
                                }
                            }} >Remove</button>
                        </div>
                        <div class="card-footer text-muted">
                        </div>
                    </div>
                </div >)}
        </>
    )
}
