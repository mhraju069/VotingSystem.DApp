import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import showAlert from './alert';
import Loder from './loder';

export default function StartVote(props) {
    const [isloading, setIsLoading] = useState(false);
    const [text, setText] = useState({
        duration: ''
    });
    const startVoting = async (event) => {
        event.preventDefault()
        setIsLoading(true);
        try {
            const start = await props.contract.startVoting(text.duration)
            await start.wait()
            const endtime = await props.contract.endTime()
            props.setEndTime(Number(endtime))
            setIsLoading(false);
            showAlert("Voting successfully started for " + text.duration + " minutes", "success");

        } catch (err) {
            const hex = err?.error?.data?.originalError?.data || err?.data || err?.error?.data;

            if (hex && hex.startsWith("0x08c379a0")) {
                const reason = ethers.toUtf8String("0x" + hex.slice(138));
                showAlert(reason, "error")

            } else {
                showAlert("Something went wrong!", "error")
            }
            setIsLoading(false);
            console.log(err)
        }
    }


    return (
        <>
            {isloading && <Loder />}
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
                <div>
                    <form className="container m-4 row g-3" onSubmit={startVoting}>
                        <h3>Start Voting</h3>
                        <div className="col-md-4 d-flex flex-md-column">
                            <label className="form-label">Voting Duration</label>
                            <input
                                type="number"
                                name='duration'
                                onChange={(e) => setText({ ...text, duration: e.target.value })}
                                required
                                min="1"
                            />
                        </div>
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
                                <label className="form-check-label">
                                    Agree to terms and conditions
                                </label>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary col-1" type="submit">Start</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}