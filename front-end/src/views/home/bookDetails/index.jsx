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
      <div className="xl:w-4/5 xl:px-0 px-4 w-full relative left-1/2 transform -translate-x-1/2 md:mt-5 mt-2">
      <div className="book">
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
            <p>
              Tình trạng:&nbsp;{" "}
              <span className="book-right__available">Có sẵn</span>
            </p>
            <p>
              Số trang:&nbsp;{" "}
              <span className="book-right__save">{bookk.page_number+" trang"}</span>
            </p>
            <p>
              Giá bìa:&nbsp;{" "}
              <span className="book-right__price">{bookk.Initial_price+" đồng"}</span>
            </p>
            <p>
              Giá đang giảm:&nbsp;{" "}
              <span className="book-right__discount">{bookk.promotion_price+" đồng"}</span>
            </p>
            <p>
              Tiết kiệm:&nbsp;{" "}
              <span className="book-right__save">{bookk.Initial_price-bookk.promotion_price+" đồng"}&nbsp;{"( -"+bookk.promotion+"% )"}</span>
            </p>
            <p>
              Tác giả:&nbsp;{" "}
              <span className="book-right__save">{bookk.author}</span>
            </p>
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
      </div>
    </div>
    </div>
  );
};

export default BookDetails;
