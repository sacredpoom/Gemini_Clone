import React, { createContext, useState } from "react";
import run from "../config/gemini";

// Creating a Context to manage global state
export const Context = createContext()

const ContextProvider = (props) => {
    // State variables for managing input, prompts, loading status, and result data
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // Function to add delay between displaying words
    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }

    // Returns to Original screen showing greeting
    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    // Function to handle sending prompts and processing responses
    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            response = await run(prompt)
            setRecentPrompt(prompt)
        }
        else {
            setPrevPrompt(prev => [...prev, input]) // Add input to previous prompts
            setRecentPrompt(input)
            response = await run(input)
        }

        // Format the response text by adding HTML tags
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 === 0) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i]
            delayPara(i, nextWord + " ")
        }
        setLoading(false)
        setInput("")
    }

    // Context value to be provided to the children components
    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        // Providing the context value to the children components
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider