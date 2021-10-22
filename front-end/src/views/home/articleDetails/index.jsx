import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BannerBook } from '../../../components/banner';

const ArticleDetails = (props) => {
    return (
        <>
            <BannerBook/>
            <div className="md1:px-0 px-5 md1:w-4/5 w-full mx-auto my-10">
                <div>
                    <img src="" alt="" className="md:h-96 md1:h-508 object-cover w-full" srcset="./assets/images/slider/city.jpg" />
                </div>
                <div className="my-5">
                    <span className="text-gray-500 text-sm">Đã đăng vào: 20/10/2021</span>
                    <h2 className="text-4xl font-semibold tracking-wide">Tiêu đề bài viết Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptates.</h2>
                </div>
                <div className="text-justify">
                    {/* dangerouslySetInnerHTML={{ __html: "text" }} */}
                    <p>
                        Nội dung bài viết Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum beatae aut deserunt nam hic blanditiis dolor atque quisquam excepturi saepe cupiditate, quia dolore doloremque consectetur nobis repellendus vitae. Illum, possimus.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut hic cupiditate ipsa sunt reprehenderit provident culpa amet unde quibusdam explicabo dolor nesciunt necessitatibus suscipit dignissimos rerum velit quos, tempore nemo!
                        Sigh view am high neat half to what. Sent late held than set why wife our. If an blessing building steepest. Agreement distrusts mrs six affection satisfied. Day blushes visitor end company old prevent chapter. Consider declared out expenses her concerns. No at indulgence conviction particular unsatiable boisterous discretion. Direct enough off others say eldest may exeter she. Possible all ignorant supplied get settling marriage recurred.

                        Manor we shall merit by chief wound no or would. Oh towards between subject passage sending mention or it. Sight happy do burst fruit to woody begin at. Assurance perpetual he in oh determine as. The year paid met him does eyes same. Own marianne improved sociable not out. Thing do sight blush mr an. Celebrated am announcing delightful remarkably we in literature it solicitude. Design use say piqued any gay supply. Front sex match vexed her those great.

                        Use securing confined his shutters. Delightful as he it acceptance an solicitude discretion reasonably. Carriage we husbands advanced an perceive greatest. Totally dearest expense on demesne ye he. Curiosity excellent commanded in me. Unpleasing impression themselves to at assistance acceptance my or. On consider laughter civility offended oh.

                        That know ask case sex ham dear her spot
                        Next his only boy meet the fat rose when. Do repair at we misery wanted remove remain income. Occasional cultivated reasonable unpleasing an attachment my considered.
                        Use securing confined his shutters Delightful as he it acceptance an
                        Carriage quitting securing be appetite it declared. High eyes kept so busy feel call in. Would day nor ask walls known. But preserved advantage are but and certainty earnestly enjoyment. Passage weather as up am exposed. And natural related man subject. Eagerness get situation his was delighted.
                        Lose eyes get fat shew. Winter can indeed letter oppose way change tended now. So is improve my charmed picture exposed adapted demands. Received had end produced prepared diverted strictly off man branched. Known ye money so large decay voice there to. Preserved be mr cordially incommode as an. He doors quick child an point at. Had share vexed front least style off why him.

                        Far quitting dwelling graceful the likewise received building
                        Am of mr friendly by strongly peculiar juvenile.
                        Unpleasant it sufficient simplicity am by friendship no inhabiting.
                        Goodness doubtful material has denoting suitable she two
                        Dear mean she way and poor bred they come.
                        He otherwise me incommode explained so in remaining
                        Boy desirous families prepared gay reserved add ecstatic say. Replied joy age visitor nothing cottage. Mrs door paid led loud sure easy read. Hastily at perhaps as neither or ye fertile tedious visitor. Use fine bed none call busy dull when. Quiet ought match my right by table means. Principles up do in me favourable affronting. Twenty mother denied effect we to do on.
                    </p>
                </div>
            </div>
        </>
    )
}

export default ArticleDetails