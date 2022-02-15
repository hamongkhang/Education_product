import React from 'react';
import { ListDocument } from './List_document';

const RightDocument = (props) => {
    return props.documentRight ? (
        <div className="other-doc-right">
            {props.categoryRight.map((item, index) => {
                let document = props.documentRight.filter(
                    (item2) => item.name === item2.category_name,
                );
                if (document) {
                    return <ListDocument documentRight={document} />;
                }
            })}
        </div>
    ) : (
        ''
    );
};

export default RightDocument;
