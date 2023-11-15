import React, { useState } from 'react';
import './TextDisplay.css';

function TextDisplay() {
    const [text, setText] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setText(e.target.result);
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept=".txt" />
            <div className="text-display">
                {text}
            </div>
        </div>
    );
}

export default TextDisplay;




