import React from 'react'
import { ArticleItem } from '../../components/articles'
import { BannerBook } from '../../components/banner'

const Articles = (props) => (
    <>
        <BannerBook/>
        <div className="xl:w-4/5 xl:px-0 px-4 w-full relative left-1/2 transform -translate-x-1/2 md:mt-20 mt-10">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                    <ArticleItem />
                    <ArticleItem />
                    <ArticleItem />
                    <ArticleItem />
                    <ArticleItem />
                    <ArticleItem />
                    <ArticleItem />
                </div>
        </div>
    </>
)

export default Articles