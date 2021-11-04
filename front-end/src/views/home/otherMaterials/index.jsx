import React, { useEffect, useState } from 'react';
import { LeftDocument } from './Left_document';
import RightDocument from './Right_document';
import { BannerBook } from '../../../components/banner';

const OtherMaterials = () => {
    const [listDocument, setListDocument] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const $token = localStorage.getItem('access_token');

    const getListDocument = () => {
        fetch('http://localhost:8000/api/freeDocument/getFreeDocument', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setListDocument(data.data[1]);
                setListCategory(data.data[0]);
            });
        return () => {};
    };
    useEffect(() => {
        getListDocument();
    }, []);
    return (
        <>
            <BannerBook />
            <div className="other-doc mt-10">
                <LeftDocument document={listDocument} category={listCategory} />
                <RightDocument
                    documentRight={listDocument}
                    categoryRight={listCategory}
                />
            </div>
        </>
    );
};

export default OtherMaterials;
