import React, { useEffect, useState } from 'react'

const JsonTree = ({ data }) => {

    useEffect(() => {
        const jsonCrackEmbed = document.querySelector("#jsoncrackEmbed2");
        const json = JSON.stringify(data);
    
        const sendJsonToIframe = () => {
            if (jsonCrackEmbed && jsonCrackEmbed.contentWindow) {
                jsonCrackEmbed.contentWindow.postMessage({ json }, "*");
            }
        };
    
        // Handle iframe load to ensure the structure loads initially
        if (jsonCrackEmbed) {
            jsonCrackEmbed.onload = () => {
                sendJsonToIframe();
            };
        }
    
        // Send JSON whenever `data` changes
        sendJsonToIframe();
    
        // Optionally, listen for any incoming messages if needed
        const handleMessage = (event) => {
            if (event.source === jsonCrackEmbed.contentWindow) {
                // Handle incoming messages from iframe here
            }
        };
    
        window.addEventListener("message", handleMessage);
    
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [data]);
    
    


    return (
        <div className='h-[500px] w-full relative'>
            <iframe id="jsoncrackEmbed2" src="https://jsoncrack.com/widget" className='h-full w-full'></iframe>
            <div className="absolute h-[38px] w-[100px] bg-[#262626] top-0 left-0"></div>
        </div>
    )
}

export default JsonTree