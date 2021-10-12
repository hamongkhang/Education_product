import React from "react";
import { BannerBook } from '../../../components/banner';

const BookDetails = () => {
  return (
    <div>
      <BannerBook />
      <div className="book">
        <div className="book-left">
          <div className="book-left__image">
            <img
              src="https://api.bschool.vn/uploads/books/16/featureds/2000-cau-trac-nghiem-tong-on-tieng-anh-8-28e4dfa4-f620-46d3-aeb5-f85c92319eb2.png"
             
            />
            <br />
          </div>
          <figure className="book-intr__image">
            <img src="https://api.bschool.vn/uploads/books/16/featureds/2000-cau-trac-nghiem-tong-on-tieng-anh-8-28e4dfa4-f620-46d3-aeb5-f85c92319eb2.png" />
          </figure>
        </div>

        <div className="book-right">
          <div className="book-right__discript">
            <h2>2000 câu trắc nghiệm Tổng ôn Tiếng Anh 8 +</h2>
            <p>
              Tình trạng:&nbsp;{" "}
              <span className="book-right__available">Có sẵn</span>
            </p>
            <p>
              Giá bìa:&nbsp;{" "}
              <span className="book-right__price">200.000₫ </span>
            </p>
            <p>
              Giá đang giảm:&nbsp;{" "}
              <span className="book-right__discount">70.000₫</span>
            </p>
            <p>
              Tiết kiệm:&nbsp;{" "}
              <span className="book-right__save">130.000₫&nbsp;(-65%)</span>
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
          <button type="submit" className="book__btn book__btn--cart">
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
          <p>
            Đây là cuốn sách tổng hợp kiến thức trọng tâm của chương trình Vật
            Lý lớp 11 như điện học, từ học và quang học... . Cuốn sách được tác
            giả tóm tắt chi tiết các kiến thức lý thuyết quan trọng và hệ thống
            công thức tính nhanh hay sử dụng, từ đó đưa các ví dụ, bài tập minh
            họa để vận dụng công thức từ cơ bản đến nâng cao.
          </p>
          <p>
            Đặc biệt, cuốn sách đưa ra lộ trình học tập cụ thể cho bạn đọc, giúp
            bạn đọc có thể làm chủ kiến thức Vật lý 11 trong 60 ngày tự học.
            Lượng kiến thức đã được tác giả phân bố từ dễ đến khó theo các
            chuyên đề và theo từng ngày giúp bạn đọc dễ dàng sử dụng cuốn sách
            trong quá trình tham khảo.
          </p>
          <p>
            Tác giả thực sự tin rằng “60 ngày làm chủ kiến thức Vật lý 11" sẽ
            giúp các bạn nắm chắc được các kiến thức nền tảng của môn học này.
            Đồng thời cũng mong muốn với sự tâm huyết nghiên cứu kỹ càng các
            phương pháp giải nhanh, dễ học, dễ nhớ trong cuốn sách sẽ giúp bạn
            đọc trở nên yêu thích môn học này.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
