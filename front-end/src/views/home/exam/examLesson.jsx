import React, { useState, useEffect, useRef } from 'react';
import Countdown from './Countdown';
import 'react-toastify/dist/ReactToastify.css';


export const ExamLesson = ({
    question,
    answer,
    name,
    time,
    timer,
    correct,
    number,
}) => {
    const $link = 'http://localhost:8000/upload/images/exam/';
    const $token = localStorage.getItem('access_token');
    const [answerExam, setAnswerExam] = useState([]);
    const [idExam, setIdExam] = useState([]);
    const [sum, setSum] = useState(0);
    const counterRef = useRef(null)
//     const $link="http://localhost:8000/upload/images/exam/";
//   return (
//     <>
//      <div className="test">
//         <div className="test__block">
//           <div className="test__title">
//             <h3>{name}</h3>
//           </div>
//           {question && question.length!=0
//             ? question.map((items,index) => {
//                 return (
//                   <>
//                     <table className="test-body">
//                       <tbody>
//                         <tr>
//                           <th className="test-body__left">Câu&nbsp;{""}{Number(index)+1}:</th>
//                           {(items.image)&&(items.image!=="Block") ? (
//                               <td className="test-body__right">
//                                  <p dangerouslySetInnerHTML={{ __html:items.question}}></p>
//                                  <p className='test-body__right--img'>
//                                  <img src={$link+items.image} />
//                                  </p>
//                               </td>
//                           ) : (
//                             <td className="test-body__right">
//                               <p dangerouslySetInnerHTML={{ __html:items.question}}></p>
//                             </td>
//                           )}
//                         </tr>
//                         {answer.map((item) => {
//                             if(item.id_question===items.id){
//                           return (
//                             <>
//                               <tr className="test-body__left--list">
//                                 <th className="test-body__left--list-input">
//                                   <label>
//                                     <input
//                                       type="radio"
//                                       name="answer"
//                                       value=""
//                                     />
//                                     &nbsp;{""}{item.type_answer}
//                                   </label>
//                                 </th>
//                                 <td className="test-body__left--list-answer">
//                                   <p dangerouslySetInnerHTML={{ __html:item.answer}}></p>
//                                 </td>
//                               </tr>    
//                             </>
//                           );}
//                         })}
//                       </tbody>
//                     </table>
//                   </>
//                 );
//               })
//             : ""}
//         </div>
//       </div>
//     </>
//   );

    const onExam = (event) => {
        event.preventDefault(); 
        var tong = 0;
        for (var i = 0; i < number; i++) {
            if (correct[i]) {
                if (correct[i].question_id == idExam[i]) {
                    if (correct[i].answer == answerExam[i]) {
                        tong = tong + 1;
                    }
                }
            }
        }
        alert('Bạn là đúng ' + tong + ' / ' + number + ' câu');
        setAnswerExam([]);
        setIdExam([]);
    };
    const addAnswer = (event) => {
        const target = event.target;
        const field = target.name;
        const value = target.value;
        setIdExam([...idExam, Number(field)]);
        setAnswerExam([...answerExam, value]);
    };

    useEffect(() => {
        const fixedCounter = () => {
            if (
                document.body.scrollTop > 384 ||
                document.documentElement.scrollTop > 384
            ) {
                counterRef.current.classList.remove('absolute');
                counterRef.current.classList.remove('top-0');
                counterRef.current.classList.add('fixed');
                counterRef.current.classList.add('top-19');
            } else {
                counterRef.current.classList.remove('fixed');
                counterRef.current.classList.remove('top-19');
                counterRef.current.classList.add('absolute');
                counterRef.current.classList.add('top-0');
            }
        };
        window.addEventListener('scroll', fixedCounter);
        return () => {
            window.removeEventListener('scroll', fixedCounter);
        };
    }, [])

    return (
        <>
            <div className="test">
                <div className="test__block">
                    <div className="test__title">
                        <h3>{name}</h3>
                    </div>
                    <form onSubmit={onExam}>
                        {question && question.length != 0
                            ? question.map((items, index) => {
                                  return (
                                      <>
                                          <table className="test-body">
                                              <tbody>
                                                  <tr>
                                                      <th className="test-body__left">
                                                          Câu&nbsp;{''}
                                                          {Number(index) + 1}:
                                                      </th>
                                                      {(items.image)&&(items.image!=="Block") ? (
                                                          <td className="test-body__right">
                                                                                           <p dangerouslySetInnerHTML={{ __html:items.question}}></p>

                                                              <p className="test-body__right--img">
                                                                  <img
                                                                      src={
                                                                          $link +
                                                                          items.image
                                                                      }
                                                                  />
                                                              </p>
                                                          </td>
                                                      ) : (
                                                          <td className="test-body__right">
                                                                                          <p dangerouslySetInnerHTML={{ __html:items.question}}></p>

                                                          </td>
                                                      )}
                                                  </tr>
                                                  {answer.map((item) => {
                                                      if (
                                                          item.id_question ===
                                                          items.id
                                                      ) {
                                                          return (
                                                              <>
                                                                  <tr className="test-body__left--list">
                                                                      <th className="test-body__left--list-input">
                                                                          <label>
                                                                              <input
                                                                                  type="radio"
                                                                                  name={
                                                                                      items.id
                                                                                  }
                                                                                  value={
                                                                                      item.type_answer
                                                                                  }
                                                                                  onChange={(
                                                                                      event,
                                                                                  ) =>
                                                                                      addAnswer(
                                                                                          event,
                                                                                      )
                                                                                  }
                                                                              />
                                                                              &nbsp;
                                                                              {
                                                                                  ''
                                                                              }
                                                                              {
                                                                                  item.type_answer
                                                                              }
                                                                          </label>
                                                                      </th>
                                                                      <td className="test-body__left--list-answer">
                                                                      <p dangerouslySetInnerHTML={{ __html:item.answer}}></p>
                                                                      </td>
                                                                  </tr>
                                                              </>
                                                          );
                                                      }
                                                  })}
                                              </tbody>
                                          </table>
                                      </>
                                  );
                              })
                            : ''}
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 hover:shadow-xl font-semibold duration-300"
                        >
                            Nộp bài
                        </button>
                    </form>
                </div>
                <div ref={counterRef} className="absolute top-0 px-5 py-3 right-0 bg-white shadow-lg rounded-md">
                    <Countdown timer={timer} />
                </div>
            </div>
        </>
    );
};
export default ExamLesson;
