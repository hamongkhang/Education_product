import React, { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

function DraftjsWidget(props) {
    const { value } = props;
    const [count, setCount] = useState(0)
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createWithContent(value ? stateFromHTML(value) : stateFromHTML('')),
    );

    const onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        setEditorState(editorState);
        
        let html = stateToHTML(contentState);
        props.onChange(html);
    }
    useEffect(() => {
        // console.log(value);
        if(count<2){
            setEditorState(EditorState.createWithContent(value ? stateFromHTML(value) : stateFromHTML('')))
            setCount(count + 1)
        }
    }, [value])
    return ( 
    <>
        <Editor editorState = { editorState }
        onEditorStateChange = { onChange }
        toolbar = {
            {
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true }
            }
        }
        />
    </>
    );
}

export {
    DraftjsWidget
};