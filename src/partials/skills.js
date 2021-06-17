import React, {Fragment, useEffect, useState} from "react"
import axios from "axios"
import signTransaction from "../transactionSigner";

const Skills = (props) => {

    const [data, setData] = useState([])
    const [skillsCards, setSkillsCards] = useState([])
    const [gnomeCards, setGnomeCards] = useState([])
    const [skillId, setSkillId] = useState('')
    const [loading, setLoading] = useState(false)

    const imagePathPoint = "https://ipfs.io/ipfs/"

    const getAllCards = () => {
        const apiUrl = 'https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=' + props.user.accountName + '&collection_name=gnomeseries1&page=1&limit=100&order=desc&sort=asset_id'
        axios.get(apiUrl).then((res) => {
            console.log('response', res.data.data)
            const cards = res.data.data
            setData(cards)
            const skillsCardsFromData = cards.filter((key) => {
                return (key.name.search("Skill") >= 1)
            })
            const gnomeCardsFromData = cards.filter((key) => {
                return (key.name.search("Skill") === -1)
            })

            setSkillsCards(skillsCardsFromData)
            setGnomeCards(gnomeCardsFromData)

            console.log('skills cards', skillsCards, 'gnomecards', gnomeCards)

        })
    }

    const gnomeCardTransfer = async (gnomeAssetId) => {
        if (!skillId) {
            alert('Please select any skills first')
            return
        }
        setLoading(true)
        try {
            const result = await signTransaction(props.user, [{
                contractAccount: 'atomicassets',
                actionName: 'transfer',
                data: {
                    from: props.user.accountName,
                    to: 'gnocitygames',
                    asset_ids: [skillId.toString()], // pass skill assetId here
                    memo: gnomeAssetId.toString(), // gnome asset id
                }
            }])
            console.log('gnome result', result)
            alert(result.message)

        } catch (e) {
            console.log('gnome error', e)
            alert(e)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getAllCards()
    }, [props.user.accountName])


    return (
        <Fragment>

            <div className="container-fluid mw90">
                <div className="grid grid-3-3-3-3 centered pt-5 pb-5">
                    <div className="stats-box small stat-profile-views">
                        <div className="stats-box-value-wrap">
                            <p className="stats-box-value">0</p>
                            <div className="stats-box-diff">
                            </div>
                        </div>


                        <p className="stats-box-title">STAKED GNOKEN</p>
                        <p className="stats-box-text">Stake Gnoken for 20% Exp Increase.</p>
                    </div>
                    <div className="stats-box small stat-posts-created">
                        <div className="stats-box-value-wrap">
                            <p className="stats-box-value">1,000</p>
                            <div className="stats-box-diff">
                            </div>
                        </div>
                        <p className="stats-box-title">UNSTAKED GNOKEN</p>
                        <p className="stats-box-text">Total Available Gnoken.</p>
                    </div>
                    <div className="stats-box small stat-reactions-received">
                        <div className="stats-box-value-wrap">
                            <p className="stats-box-value">1,525</p>
                            <div className="stats-box-diff">
                            </div>
                        </div>
                        <p className="stats-box-title">CURRENT PEOPLE STAKING</p>
                        <p className="stats-box-text">For a 20% Exp Bonus</p>
                    </div>
                </div>
                <div className="section-filters-bar v7 pt-5 pb-5">
                    <div className="section-filters-bar-actions">
                        <div className="section-filters-bar-info">
                            <p className="section-filters-bar-title">How do skills work?</p>
                            <p className="section-filters-bar-text">You will need to obtain a skill and Gnome card. Once
                                you
                                have both
                                available, you can level it up. You'll be BURNING the skill card and applying it to your
                                Gnome for
                                experience and levels. Stake 100 GNOKEN at any time to receive a 20% bonus when applying
                                skills to any
                                Gnome. You may unstake this at any time.</p>
                        </div>
                    </div>

                    <div className="section-filters-bar-actions">
                        <button className="button primary">STAKE 100 GNOKEN</button>
                    </div>
                </div>
                <div className="section-header pt-5 pb-5">
                    <div className="section-header-info">
                        <p className="section-pretitle">Level up with skills!</p>
                        <h2 className="section-title">ELIGIBLE SKILLS</h2>
                    </div>
                </div>
                <div className="grid grid-3-3-3-3 centered pt-5 pb-5">

                    {skillsCards.length > 0 && skillsCards.map((key, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="quest-item">
                                    <figure className="quest-item-cover liquid" style={{height: "400px!important"}}>
                                        <img src={imagePathPoint + key.template.immutable_data.img}
                                             alt={key.template.immutable_data.name}/>
                                    </figure>

                                    <p className="text-sticker"
                                       style={{fontSize: '20px!important', backgroundColor: '#2932499e'}}>
                                        <svg className="text-sticker-icon icon-plus-small">
                                        </svg>
                                        50 EXP
                                    </p>

                                    <div className="quest-item-info">

                                        <button className="button secondary" onClick={() => setSkillId(key.asset_id)}>
                                            {key.asset_id === skillId ? 'SKILL SELECTED' : 'SELECT SKILL'}

                                        </button>

                                        <div className="quest-item-meta">
                                            <div className="user-avatar-list">
                                            </div>

                                            <div className="quest-item-meta-info">
                                                <p className="quest-item-meta-title">Mint #: {key.template_mint}</p>
                                                <p className="quest-item-meta-text">Asset ID: {key.asset_id}</p>


                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </Fragment>
                        )
                    })}

                    {skillsCards.length === 0 &&
                    <h2 className="section-title">No Skills Cards found</h2>
                    }
                </div>


                <div className="section-header pt-5 pb-5">
                    <div className="section-header-info">
                        <p className="section-pretitle">Level up with skills!</p>
                        <h2 className="section-title">ELIGIBLE GNOMES</h2>
                    </div>
                </div>

                <div className="grid grid-3-3-3-3 centered pt-5 pb-5">


                    {gnomeCards.length > 0 && gnomeCards.map((key, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="quest-item">
                                    <figure className="quest-item-cover liquid" style={{height: '400px!important'}}>
                                        <img src={imagePathPoint + key.template.immutable_data.img}
                                             alt={key.template.immutable_data.name}/>
                                    </figure>

                                    <p className="text-sticker"
                                       style={{fontSize: '20px!important', backgroundColor: '#2932499e'}}>
                                        Lvl: 1/45
                                    </p>


                                    <div className="quest-item-info">
                                        <div className="progress-stat">
                                            <div className="table-column centered padded-big-left">
                                                <p className="text-sticker void">
                                                    <svg className="text-sticker-icon icon-plus-small">
                                                    </svg>
                                                    20 TOTAL EXP
                                                </p>
                                            </div>

                                            <div className="bar-progress-wrap small">
                                                <p className="bar-progress-info">
                                                    <svg className="text-sticker-icon icon-plus-small">
                                                    </svg>
                                                    0 Assasin EXP
                                                </p>

                                                <p className="bar-progress-info">
                                                    <svg className="text-sticker-icon icon-plus-small">
                                                    </svg>
                                                    0 Combat EXP
                                                </p>


                                                <p className="bar-progress-info">
                                                    <svg className="text-sticker-icon icon-plus-small">
                                                    </svg>
                                                    0 Manipulation EXP
                                                </p>


                                                <p className="bar-progress-info">
                                                    <svg className="text-sticker-icon icon-plus-small">
                                                    </svg>
                                                    0 Awareness EXP
                                                </p>

                                                <p className="bar-progress-info">
                                                    <svg className="text-sticker-icon icon-plus-small">
                                                    </svg>
                                                    0 Defense EXP
                                                </p>
                                                <p className="bar-progress-info">
                                                    <svg className="text-sticker-icon icon-plus-small">
                                                    </svg>
                                                    0 Intelligence EXP
                                                </p>

                                                <p className="bar-progress-info">
                                                    <svg className="text-sticker-icon icon-plus-small">
                                                    </svg>
                                                    0 Willpower EXP
                                                </p>
                                            </div>

                                            <hr/>

                                            <button className="button primary" disabled={loading}
                                                    onClick={() => gnomeCardTransfer(key.asset_id)}
                                            >LEVEL UP
                                            </button>


                                            <div className="quest-item-meta">

                                                <div className="user-avatar-list">


                                                </div>
                                                <div className="quest-item-meta-info">
                                                    <p className="quest-item-meta-title">Mint #: {key.template_mint}</p>
                                                    <p className="quest-item-meta-text">Asset ID: {key.asset_id}</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    })
                    }

                    {gnomeCards.length === 0 &&
                    <h2 className="section-title">No GNome Cards found</h2>
                    }


                </div>

            </div>

        </Fragment>
    )
}


export default Skills
