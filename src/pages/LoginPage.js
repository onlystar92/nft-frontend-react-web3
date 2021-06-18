import React from "react"

const LoginPage = (props) => {
    return (
        <div className="container vh-100">
            <div className="d-flex justify-content-center col-md-6 offset-md-3 mt-5 mb-5">
                <button className="d-flex justify-content-center button primary mt-5 mb-5 font-weight-bold"
                        onClick={props.showModal}>
                    Login using wallet
                </button>
            </div>
        </div>
    )
}

export default LoginPage
