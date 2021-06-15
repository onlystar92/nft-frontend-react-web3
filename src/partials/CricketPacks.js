import React, {Fragment} from "react";
import * as waxjs from '@waxio/waxjs/dist';
import signTransaction from '../transactionSigner.js';
import './CricketPacks.css'


const wax = new waxjs.WaxJS(process.env.REACT_APP_WAX_RPC, null, null, false);


class CricketPacks extends React.Component {
    constructor(props) {
        super(props);
    }


    gnomeCardTransfer = async (user, skillAssetId, gnomeAssetId) => {
        try {
            const result = await signTransaction(user, [{
                contractAccount: 'atomicassets',
                actionName: 'transfer',
                data: {
                    from: user.accountName,
                    to: 'gnocitygames',
                    asset_ids: [skillAssetId.toString()], // pass skill assetId here
                    memo: gnomeAssetId.toString(), // gnome asset id
                }
            }])
            console.log('gnome result', result)

            alert(result.message)

        } catch (e) {
            console.log('gnome error', e)
        }
    }


    showModal = this.props.showModal;


    render() {
        return (
            <Fragment>


                <section className="cardBlockSection bgBlack">
                    <div className="container containerWidthIncrease">
                        <div className="col-md-12">
                            <div className="row">


                                <div className="col-12 col-sm-12 col-md-6 paddingUnset packMainBox" id="buyVitals">
                                    <div className="singleRowCard">
                                        <div className="row">

                                            <div className="col-12 col-sm-8 col-md-7">

                                                <div className="cardInsideAlltext">
                                                    <h3 className="cardHeading">
                                                        Vitals Card
                                                    </h3>
                                                    <div className="row">

                                                        <div className="col-6 col-sm-6 col-md-6">
                                                            <h4 className="cardSubHeading">
                                                                SERIES
                                                            </h4>
                                                            <p className="seriesText">
                                                                Genesis T20
                                                            </p>
                                                            <h4 className="cardCountHeading">
                                                                CONTENTS
                                                            </h4>
                                                            <p className="cardCountValue">
                                                                50 Cards
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="col-6 col-sm-6 col-md-6 paddingUnset2">
                                                            <h4 className="releaseDateHeading">
                                                                RELEASE DATE
                                                            </h4>
                                                            <p className="releaseDateValue">March 11, 2021
                                                            </p>
                                                            <h4 className="costHeading">
                                                                PRICE
                                                            </h4>
                                                            <p className="costValue">$25
                                                            </p>
                                                        </div>
                                                        <div className="col-6 col-sm-6 col-md-6">
                                                            <h4 className="releaseDateHeading">
                                                                packs Remaining
                                                            </h4>
                                                            <p className="releaseDateValue">
                                                                2584/15455
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-12">

                                                    <button className="cardInsideLoginBtn"
                                                            onClick={(e) => this.gnomeCardTransfer(this.props.user, 1099543848409, 1099536571289)}>
                                                        Buy Vitals
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>


            </Fragment>
        )
    }
}

export default CricketPacks
