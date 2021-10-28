import React, {useState, useRef} from 'react';
import JoditEditor from "jodit-react";

const TextEditor = () => {
	const editor = useRef(null)
	const [content, setContent] = useState('')
	
	const config = {
		readonly: false
	}

    const onChange = (e) => {
        console.log(e);
    }
	
	return (
        <div>
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={newContent => setContent(newContent)} 
            onChange={onChange}
        />
        </div>
    );
}

export default TextEditor
