import React, { useState, useContext } from 'react'
import './Sidebar.css'
// Importing icons from material design
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import ChatIcon from '@mui/icons-material/Chat'
import HelpIcon from '@mui/icons-material/Help'
import HistoryIcon from '@mui/icons-material/History'
import SettingsIcon from '@mui/icons-material/Settings'
// Importing context for state management
import { Context } from '../../context/Context'

const Sidebar = () => {
    // State to track whether sidebar is extended or collapsed
    const [extended, setExtended] = useState(false)
    // Using useContext to access state and functions from Context
    const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context)

    // Function to load previous prompt
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt); // set selected prompt as recent prompt
        await onSent(prompt); // send the selected prompt
    };

    return (
        <div className='sidebar'>
            <div className="top">
                {/* Toggle sidebar extension on menu icon click */}
                <MenuIcon onClick={() => setExtended(prev => !prev)} className='menu' />

                {/* New chat button */}
                <div onClick={() => newChat()} className="new-chat">
                    <AddIcon />
                    {extended ? <p>New Chat</p> : null}
                </div>

                {/* Conditional rendering of recent prompts list */}
                {extended ?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompt.map((item, index) => {
                            return (
                                <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                                    <ChatIcon />
                                    {/* Display truncated prompt text */}
                                    <p>{item.slice(0, 18)} ...</p>
                                </div>
                            )
                        })}
                    </div> : null}
            </div>

            {/* Bottom section with help, activity, and settings */}
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <HelpIcon />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <HistoryIcon />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <SettingsIcon />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar