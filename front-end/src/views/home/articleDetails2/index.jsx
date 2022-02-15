import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import { BannerBook } from '../../../components/banner';

const ArticleDetails2 = (props) => {
    const [article, setArticle] = useState({});
    const { id } = useParams();

    const fetchArticle = () => {
        fetch(
            `${process.env.REACT_APP_URL_SERVER}/api/featuredPost/getFeaturedPost`,
            {
                method: 'GET',
            },
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.data) {
                    const articleTemp = data.data.find((item) => item.id == id);
                    if (articleTemp) {
                        console.log(articleTemp);
                        setArticle(articleTemp);
                    }
                }
            });
    };

    useEffect(() => {
        fetchArticle();
    }, []);
    return (
        <>
            <BannerBook />
            <div className="md1:px-0 px-5 md1:w-4/5 w-full mx-auto my-10">
                <div>
                    <img
                        className="md:h-96 md1:h-508 object-cover w-full"
                        src={`${process.env.REACT_APP_URL_SERVER}/upload/images/featured_post/${article.image}`}
                    />
                </div>
                <div className="my-5">
                    <span className="text-gray-500 text-sm">
                        Đã đăng vào: {article.updated_at}
                    </span>
                    <p className="text-gray-500 text-sm">
                        Tác giả: {article.author}
                    </p>
                    <h2 className="text-4xl font-semibold tracking-wide">
                        {article.name}
                    </h2>
                </div>
                <div className="text-justify">
                    <p
                        dangerouslySetInnerHTML={{
                            __html: article.description,
                        }}
                    ></p>
                </div>
                <div className="mt-4">
                    {article.file && article.file.split('.').pop() === 'mp4' ? (
                        <video
                            className="md:h-96 md1:h-508 object-cover w-full"
                            src={`${process.env.REACT_APP_URL_SERVER}/upload/images/featured_post/${article.file}`}
                            controls
                        ></video>
                    ) : (
                        <img
                            alt=""
                            className="md:h-96 md1:h-508 object-cover w-full"
                            src={`${process.env.REACT_APP_URL_SERVER}/upload/images/featured_post/${article.file}`}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default ArticleDetails2;
