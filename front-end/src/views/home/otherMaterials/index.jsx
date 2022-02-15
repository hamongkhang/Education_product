import React, { useEffect, useState } from 'react';
import { LeftDocument } from './Left_document';
import RightDocument from './Right_document';
import { BannerBook } from '../../../components/banner';
import Preloader from '../../../components/preloader';

const OtherMaterials = () => {
    const [listDocument, setListDocument] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const $token = localStorage.getItem('access_token');

    const getListDocument = () => {
        setIsLoading(true);
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/freeDocument/getFreeDocument`,
            {
                method: 'GET',
            },
        )
            .then((response) => response.json())
            .then((data) => {
                setListDocument(data.data[1]);
                setListCategory(data.data[0]);
                setIsLoading(false);
            });
    };
    useEffect(() => {
        getListDocument();
    }, []);
    return (
        <>
            {isLoading && <Preloader />}
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
