import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';


export const ExamLesson = ({
    question,
    answer,
    name,
    time
}) => {
    const $link="http://localhost:8000/upload/images/exam/";
  return (
    <>
     <div className="test">
        <div className="test__block">
          <div className="test__title">
            <h3>{name}</h3>
          </div>
          {question && question.length!=0
            ? question.map((items,index) => {
                return (
                  <>
                    <table className="test-body">
                      <tbody>
                        <tr>
                          <th className="test-body__left">Câu&nbsp;{""}{Number(index)+1}:</th>
                          {(items.image)&&(items.image!=="Block") ? (
                              <td className="test-body__right">
                                 <p dangerouslySetInnerHTML={{ __html:items.question}}></p>
                                 <p className='test-body__right--img'>
                                 <img src={$link+items.image} />
                                 </p>
                              </td>
                          ) : (
                            <td className="test-body__right">
                              <p dangerouslySetInnerHTML={{ __html:items.question}}></p>
                            </td>
                          )}
                        </tr>
                        {answer.map((item) => {
                            if(item.id_question===items.id){
                          return (
                            <>
                              <tr className="test-body__left--list">
                                <th className="test-body__left--list-input">
                                  <label>
                                    <input
                                      type="radio"
                                      name="answer"
                                      value=""
                                    />
                                    &nbsp;{""}{item.type_answer}
                                  </label>
                                </th>
                                <td className="test-body__left--list-answer">
                                  <p dangerouslySetInnerHTML={{ __html:items.answer}}></p>
                                </td>
                              </tr>    
                            </>
                          );}
                        })}
                      </tbody>
                    </table>
                  </>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );

};
export default ExamLesson;