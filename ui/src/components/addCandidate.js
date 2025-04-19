
import React, { useState } from 'react'
import '../App.css'
import Loder from './loder';
import showAlert from './alert';
export default function AddCandidate(props) {
    const [isloading, setIsLoading] = useState(false);
    const [text, setText] = useState({
        name: "",
        sign: ""
    })

    const addCandidates = async (event) => {
        setIsLoading(true);
        try {
            event.preventDefault()
            const add = await props.contract.addCandidate(text.name, text.sign)
            await add.wait()
            setIsLoading(false);
            showAlert("Added successfull", "success")

        }
        catch (err) {
            setIsLoading(false);
            showAlert('Something went wrong', 'error')
            console.log(err.message)
        }
    }
    return (<>
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
            </div>)
            :
            (
                <form className='container-fluid py-5 px-5' name='addCandidate' onSubmit={addCandidates} >
                    <h3>Add Candidate</h3>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input onChange={e => setText({ ...text, name: e.target.value })} type="text" name="name" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Sign</label>
                        <input onChange={e => setText({ ...text, sign: e.target.value })} type="text" name="sign" className="form-control" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>)
        }</>
    )
}
