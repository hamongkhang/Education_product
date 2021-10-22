import React,{useState,useEffect} from "react";
import { useRouteMatch } from 'react-router';
import { BannerBook } from '../../../components/banner';

const BookDetails = (props) => {
  const match = useRouteMatch();
  const $link="http://localhost:8000/upload/images/book/";
  const $token=localStorage.getItem('access_token');
  const [bookk, setBookk] = useState([]);
  const { changeRender } = props;
  const addToCart = (product_id) =>{
    if($token){
      const _formData = new FormData();
      _formData.append("product_id",product_id)
      _formData.append("type",'book')
      const requestOptions = {
          method: 'POST',
          headers: {"Authorization": `Bearer `+$token},
          body: _formData
      };
      fetch('http://127.0.0.1:8000/api/cart/addCart', requestOptions)
      .then(res => res.json())
      .then(json => {   
          changeRender();
          if(json.success){
              alert('thêm sách vào giỏ hàng thành công')
          }
          else{
              alert('thêm KHÔNG thành công')
          }
          
      });
  }
  else{
      alert('hay đăng nhập trước khi bỏ vào giỏ hàng')
  }
    
}
      useEffect(() => {
          if($token){
            const _formData = new FormData();
            _formData.append("id",match.params.id)
            const requestOptions = {
                method: 'POST',
                body: _formData,
                headers: {"Authorization": `Bearer `+$token}
            };
          fetch("http://localhost:8000/api/getOneBook", requestOptions)
          .then(response => response.json())
          .then(data => setBookk(data.book));
          return () => {
          }
      }
  else{
    const _formData = new FormData();
    _formData.append("id",match.params.id)
    const requestOptions = {
        method: 'POST',
        body: _formData,
    };
  fetch("http://localhost:8000/api/getOneBook", requestOptions)
  .then(response => response.json())
  .then(data => setBookk(data.book));
  return () => {
  }
      }
  }
      , []);
  return (
    <div>
      <BannerBook />
      <div className="xl:w-4/5 xl:px-0 px-4 w-full relative left-1/2 transform -translate-x-1/2 md:mt-10 mt-5">
          <div className="flex flex-col-reverse md1:flex-row md1:space-x-10">
            <div className="md1:w-1/2 w-full md1:mt-0 mt-8">
              <div className="bg-white shadow-lg py-10 rounded-md">
                <img src="" className="md1:h-600 h-96 w-full mx-auto object-scale-down" srcset={$link+bookk.image} />
              </div>
            </div>

            <div className="w-full md1:w-1/2">
              <div className="p-5 border-b-2 border-gray-400 space-y-4 rounded-md shadow-lg bg-white">
                <div className="font-semibold uppercase text-xl md:text-3xl text-center">
                  <h3>{bookk.name}</h3>
                </div>
                <div className="flex justify-center items-end space-x-3">
                    <span className="text-xl text-green-700">{bookk.promotion_price}<sup> đ</sup></span>
                    <span className="text-base line-through font-light text-gray-500">{bookk.Initial_price}<sup>đ</sup></span>
                    <span className="text-base font-light text-gray-500">{"(-"+bookk.promotion+"%)"}</span>
                </div>
                <div>
                    <div className="flex space-x-2 py-3 border-b border-gray-300">
                        <div className="w-5 text-center"> <i className="far fa-check text-indigo-600"></i> </div>
                        <div> Tình trạng: <span className="text-gray-500">Có sẵn</span> </div>
                    </div>
                    <div className="flex space-x-2 py-3 border-b border-gray-300">
                        <div className="w-5 text-center"> <i className="far fa-at text-indigo-600"></i> </div>
                        <div> Tác giả: <span className="text-gray-500">{bookk.author}</span> </div>
                    </div>
                    <div className="flex space-x-2 py-3 border-b border-gray-300">
                        <div className="w-5 text-center"> <i className="fad fa-book-open text-indigo-600"></i> </div>
                        <div> Số trang: <span className="text-gray-500">{bookk.page_number}</span> </div>
                    </div>
                    
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-white">
                        <button className="w-full py-2 rounded-sm bg-green-700 hover:bg-green-800 space-x-2 hover:shadow-lg" >
                            <i className="far fa-cart-plus" />
                            <span>Đặt mua</span>
                        </button>
                    </div>
                </div>
                <div className="py-5 mt-8 border-b-2 border-gray-400 rounded-md shadow-lg bg-white">
                  <div className="uppercase font-medium px-5">
                    Hướng dẫn thanh toán
                    <hr className="border-b border-gray-300 mt-2"/>
                  </div>
                  <div className="px-3">
                    <img src={`${window.location.origin}/assets/images/payment.png`} className="object-scale-down block w-auto mx-auto h-96"/>
                  </div>
                </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="my-10">
                <div>
                    <div className="font-semibold my-4 border-b-2 uppercase border-blue-600 mb-4 py-1">Giới thiệu sách</div>
                    <p className="text-gray-700">{bookk.description}</p>
                </div>
            </div>
          </div>
      {/* <div className="book">
        <div className="book-left">
          <div className="book-left__image">
            <img
              src={$link+bookk.image}/>
            <br />
          </div>
          <figure className="book-intr__image">
            <img src={$link+bookk.image}/>
          </figure>
        </div>

        <div className="book-right">
          <div className="book-right__discript">
            <h2>{bookk.name}</h2>
            <div className="book-right__content">
              <p>
                Hiện nay, Tiếng Anh đã trở nên vô cùng quan trọng và được nhiều
                các bạn học sinh lựa chọn để thi trong kì thi THPT Quốc Gia. Với
                mong muốn giúp các em học sinh tự tin đạt điểm 8+ môn Tiếng Anh
                của mình, cô Phạm Liễu và Bschool cho ra mắt cuốn sách 2000 C
                ...
              </p>
            </div>
          </div>
          <a
            href="https://bschool.vn/sach/16/2000-cau-trac-nghiem-tong-on-tieng-anh-8#"
            target="_blank"
          >
            <button type="submit" className="book__btn">
              <i className="fab fa-facebook-f">&nbsp; đặt hàng qua facebook</i>
            </button>
          </a>
          <br />
          <button type="submit" className="book__btn book__btn--cart" onClick ={()=>addToCart(bookk.id)}>
            <i className="fas fa-shopping-cart">&nbsp; thêm vào giỏ hàng</i>
          </button>
          <h4>Dịch vụ và khuyến mãi</h4>
          <div className="book-right__promotion">
            <p>
              <i className="fas fa-check book-right__promotion--fa-check"></i>
              &nbsp;&nbsp; Khuyến mãi HOT &nbsp;{" "}
              <a style={{ textDecoration: "none" }} href="#">
                <span className="book-right__available">Chi tiết</span>
              </a>
            </p>
            <p>
              <i className="fas fa-check book-right__promotion--fa-check"></i>
              &nbsp;&nbsp; Top 100 cuốn sách Luyện Thi hay nhất &nbsp;{" "}
              <a style={{ textDecoration: "none" }} href="#">
                <span className="book-right__available">Chi tiết</span>
              </a>
            </p>
          </div>
          <h3 className="book-right__title book-right__title--payment">
            Hướng dẫn thanh toán
          </h3>
          <div className="book-right__payment">
            <img src={`${window.location.origin}/assets/images/payment.png`} />
          </div>
        </div>
      </div>
      <div className="book-intr">
        <div className="book-right__title">
          <h3>Giới thiệu sách</h3>
        </div>
        <div className='book-right__title--underline'>

        </div>
        <div className="book-intr__content">
          {bookk.description}
        </div>
      </div> */}
    </div>
    </div>
  );
};

export default BookDetails;
