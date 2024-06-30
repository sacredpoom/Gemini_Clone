import React, { useContext } from 'react'
import './Main.css'
// import icons from Material Design
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ExploreIcon from '@mui/icons-material/Explore'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import MailIcon from '@mui/icons-material/Mail'
import CodeIcon from '@mui/icons-material/Code'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
// import context for state management
import { Context } from '../../context/Context'

export const Main = () => {
    // Using useContext to access state and functions from Context
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <PersonOutlineIcon className="icon" /> 
            </div>
            <div className="main-container">
                {/* conditional rendering based on showResult state */}
                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, Joe.</span></p>
                            <p>How may I assist you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <ExploreIcon className="icon" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban forestry</p>
                                <LightbulbIcon className="icon" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <MailIcon className="icon" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <CodeIcon className="icon" />
                            </div>
                        </div>
                    </> // Result section when showResult is true
                    : <div className="result"> 
                        <div className="result-title">
                            <PersonOutlineIcon className="result-icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <AutoAwesomeIcon />
                            {loading
                                ? <div className='loader'> {/* loading animation while waiting for resultData */}
                                    <hr />
                                    <hr />
                                    <hr />
                                </div> // Render resultData when loading is false
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }

                {/* Bottom section containing search box and information */}
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <AddPhotoAlternateIcon />
                            <MicIcon />
                            {/* Conditionally render the SendIcon based on input */}
                            {input ? <SendIcon onClick={() => onSent()} /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    )
}
