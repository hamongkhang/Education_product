import { useRouteMatch } from 'react-router';
import React, { useState, useEffect } from 'react';
import { BannerBook } from '../../../components/banner';

const ArticleDetails = (props) => {
    const $linkImage = 'http://localhost:8000/upload/images/IT_in_teach/';
    const [ITItem, setITItem] = useState({});
    const match = useRouteMatch();
    const getITItem = () => {
        const requestOptions = {
            method: 'GET',
        };
        fetch(
            'http://127.0.0.1:8000/api/ITinTeach/getITinTeach',
            requestOptions,
        )
            .then((res) => res.json())
            .then((json) => {
                json.data.map((item) => {
                    if (item.id == match.params.id) {
                        setITItem(item);
                    }
                });
            });
    };
    useEffect(() => {
        getITItem();
    }, []);
    return (
        <>
            <BannerBook />
            <div className="md1:px-0 px-5 md1:w-4/5 w-full mx-auto my-10">
                <div>
                    <img
                        src=""
                        alt=""
                        className="md:h-96 md1:h-508 object-cover w-full"
                        srcset={$linkImage + ITItem.image + ' 2x'}
                    />
                </div>
                <div className="my-5">
                    <span className="text-gray-500 text-sm">
                        Đã đăng vào: {ITItem.updated_at}
                    </span>
                    <p className="text-gray-500 text-sm">
                        Tác giả: {ITItem.author}
                    </p>
                    <h2 className="text-4xl font-semibold tracking-wide">
                        {ITItem.name}
                    </h2>
                </div>
                <div className="text-justify">
                    <p
                        dangerouslySetInnerHTML={{ __html: ITItem.description }}
                    ></p>
                </div>
                <div>
                    {ITItem.file && ITItem.file.split('.').pop() === 'mp4' ? (
                        <video
                            className="md:h-96 md1:h-508 object-cover w-full"
                            src={`${$linkImage}${ITItem.file}`}
                            controls
                        ></video>
                    ) : (
                        <img
                            src=""
                            alt=""
                            className="md:h-96 md1:h-508 object-cover w-full"
                            srcset={$linkImage + ITItem.file + ' 2x'}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default ArticleDetails;
