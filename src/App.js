import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import './App.scss';
import './styles/styles.css'
import './styles/simplebar.css'
import './styles/tiny-slider.css'
import RenderHeader from './partials/Header.js';
import CricketPacks from "./partials/CricketPacks.js";
import Skills from "./partials/skills";


export default function App(props) {
    const [, setActiveUser] = useState(null);
    const [, setAccountName] = useState('');

    useEffect(() => {
        const {ual: {activeUser}} = props;
        if (activeUser && !props.ual.activeUser) {
            setActiveUser({activeUser}, updateAccountName);
        } else if (activeUser && props.ual.activeUser) {
            setActiveUser(null) && setAccountName('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function updateAccountName() {
        try {
            const userAccountName = await props.ual.activeUser.getAccountName();
            setAccountName(userAccountName);
        } catch (e) {
            console.warn(e);
        }
    }

    return (
        <div className="App">
            {props.ual.activeUser ?
                <>
                   {/* <RenderHeader
                        showModal={props.ual.showModal}
                        accountName={props.ual.activeUser.accountName}
                        activeUser={props.ual.activeUser}
                        activeAuthenticator={props.ual.activeAuthenticator}
                        logout={props.ual.logout}
                    />*/}
                    <main className="margin-for-header">
                        <Routes>

                            <Route path="/" element={<CricketPacks user={props.ual.activeUser}
                                                                   showModal={props.ual.showModal}/>}/>

                        </Routes>
                    </main>
                </>
                :
                <>

                    {/*<RenderHeader showModal={props.ual.showModal}/>*/}
                    <main className="margin-for-header">
                        <Routes>
                            <Route path="/" element={<Skills showModal={props.ual.showModal}/>}/>
                        </Routes>

                    </main>
                </>
            }

        </div>
    );
}
