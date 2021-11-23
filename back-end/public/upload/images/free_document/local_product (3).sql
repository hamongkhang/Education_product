-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 14, 2021 lúc 02:02 PM
-- Phiên bản máy phục vụ: 10.4.20-MariaDB
-- Phiên bản PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `local_product`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin_account`
--

CREATE TABLE `admin_account` (
  `id` int(11) NOT NULL,
  `fullName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` datetime NOT NULL,
  `phone` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `linkFB` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameAccount` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `admin_account`
--

INSERT INTO `admin_account` (`id`, `fullName`, `email`, `password`, `avatar`, `sex`, `address`, `birthday`, `phone`, `linkFB`, `nameAccount`, `status`, `created_at`, `updated_at`) VALUES
(1, 'vatli365', 'web.vatly365@gmail.com', '$2y$10$M6f0ns9EKKj9smpBiJB/r..PrsfDpWHZvl6l3E4wGGxNBUa34nasK', 'male_avatar.jpg', 'male', '2001-09-30 01:07:19', '0000-00-00 00:00:00', '0396498891', 'https://www.facebook.com/groups/867025087270480/', 'Admin', 'active', '2021-10-03 17:13:57', '2021-10-03 17:13:57'),
(15, 'Hoài An', 'nguyenthithang092001@gmail.com', '$2y$10$EwOX7HIAM4UusqSjPgiTL.mJW/BTD09MKiliZyNajrd/oj6NQReoy', 'IMG_0107.JPG', 'female', 'Quảng Bình', '2021-09-29 00:00:00', '0915810375', 'https://www.facebook.com/profile.php?id=100031067407528', 'nguyenthithang092001@gmail.com', 'Active', '2021-11-03 12:25:06', '2021-11-03 12:25:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banner_background`
--

CREATE TABLE `banner_background` (
  `id` int(11) NOT NULL,
  `name` varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  `path` text COLLATE utf8_unicode_ci NOT NULL,
  `image` text COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(225) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `banner_background`
--

INSERT INTO `banner_background` (`id`, `name`, `path`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Banner_1', 'upload\\images\\banner', 'banner.jpg', 'Active', '2021-10-15 16:26:51', '2021-11-02 12:45:26'),
(2, 'Banner_2', 'upload\\images\\banner', 'Thi-online-free.jpg', 'Active', '2021-10-15 16:28:14', '2021-11-02 05:06:08'),
(3, 'Banner_3', 'upload\\images\\banner', 'TAILIEU_GV.jpg', 'Active', '2021-10-15 16:28:23', '2021-10-15 16:28:23');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Initial_price` float NOT NULL,
  `promotion` float NOT NULL,
  `promotion_price` float NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int(11) NOT NULL,
  `page_number` int(11) NOT NULL,
  `author` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `book`
--

INSERT INTO `book` (`id`, `name`, `Initial_price`, `promotion`, `promotion_price`, `image`, `type`, `page_number`, `author`, `description`, `status`, `quantity`, `created_at`, `updated_at`) VALUES
(10, 'Tuyển chọn các dạng toán Hay Lạ Khó môn Vật lí (HẾT HÀNG)', 500000, 10, 450000, 'KN_2022.jpg', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-11-02 03:19:24'),
(11, 'Phát triển năng lực người học qua các bài toán Vật lí\r\n', 500000, 10, 400000, 'PTNL-2021.png', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(12, 'Kinh nghiệm luyện thi Vật lí 11\r\n', 500000, 10, 400000, 'Kinh_nghiem_11 (1).png', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(13, 'Kinh nghiệm luyện thi Vật lí 10\r\n', 500000, 10, 400000, 'Kinh_nghiem_10 (1).png', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(14, '80 đề minh họa môn Vật lí (SÁCH TẶNG KÈM KHÓA HỌC KHÔNG BÁN)\r\n', 500000, 10, 400000, '80 de 2021.png', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(15, 'Khám Phá Tư Duy Sáng Tạo Bồi Dưỡng Học Sinh Giỏi THPT Vật Lí Tập 1\r\n', 500000, 10, 400000, 'kham pha tu duy sang tao mon ly.jpg', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(16, '7 ngày 7 điểm, 8 tuần 8 điểm\r\n', 500000, 10, 400000, '7N7D-2021.png', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(17, 'Tuyển chọn các dạng toán Hay Lạ Khó môn Vật lí (HẾT HÀNG)\r\n', 500000, 10, 400000, 'HLK2019_2.png', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(18, 'Luyện Siêu Tư Duy Ngữ Văn Chuyên Đề Nghị Luận Văn Học - Quyển 1: Chiều Rộng\r\n', 500000, 10, 400000, 'Kinh_nghiem_11.png', 4, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(19, 'Luyện Siêu Tư Duy Ngữ Văn Chuyên Đề Nghị Luận Văn Học - Quyển 1: Chiều Rộng\r\n', 500000, 10, 400000, 'Kinh_nghiem_11.png', 4, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(20, 'Luyện Siêu Tư Duy Ngữ Văn Chuyên Đề Nghị Luận Văn Học - Quyển 1: Chiều Rộng\r\n', 500000, 10, 400000, 'Kinh_nghiem_11.png', 4, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(21, 'Luyện Siêu Tư Duy Ngữ Văn Chuyên Đề Nghị Luận Văn Học - Quyển 1: Chiều Rộng\r\n', 500000, 10, 400000, 'Kinh_nghiem_11.png', 4, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Block', 100, '2021-10-11 03:39:21', '2021-11-10 07:45:56'),
(22, 'Luyện Siêu Tư Duy Ngữ Văn Chuyên Đề Nghị Luận Văn Học - Quyển 1: Chiều Rộng\r\n', 500000, 10, 400000, 'Kinh_nghiem_11.png', 4, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(23, 'Luyện Siêu Tư Duy Ngữ Văn Chuyên Đề Nghị Luận Văn Học - Quyển 1: Chiều Rộng\r\n', 500000, 10, 400000, 'Kinh_nghiem_11.png', 4, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(24, 'Trọn bộ Kinh nghiệm luyện thi Vật lí 12\r\n', 500000, 10, 400000, 'KN_2022.jpg', 5, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(25, 'Phát triển năng lực người học qua các bài toán Vật lí\r\n', 500000, 10, 400000, 'PTNL-2021.png', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(26, 'Kinh nghiệm luyện thi Vật lí 11\r\n', 500000, 10, 400000, 'Kinh_nghiem_11 (1).png', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(27, 'Kinh nghiệm luyện thi Vật lí 10\r\n', 500000, 10, 400000, 'Kinh_nghiem_10 (1).png', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(29, 'Khám Phá Tư Duy Sáng Tạo Bồi Dưỡng Học Sinh Giỏi THPT Vật Lí Tập 1\r\n', 500000, 10, 400000, 'kham pha tu duy sang tao mon ly.jpg', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(30, '7 ngày 7 điểm, 8 tuần 8 điểm\r\n', 500000, 10, 400000, '7N7D-2021.png', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(31, 'Tuyển chọn các dạng toán Hay Lạ Khó môn Vật lí (HẾT HÀNG)\r\n', 500000, 10, 400000, 'HLK2019_2.png', 2, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(32, 'Luyện Siêu Tư Duy Ngữ Văn Chuyên Đề Nghị Luận Văn Học - Quyển 1: Chiều Rộng\r\n', 500000, 10, 400000, 'Kinh_nghiem_11.png', 4, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(33, 'Luyện Siêu Tư Duy Ngữ Văn Chuyên Đề Nghị Luận Văn Học - Quyển 1: Chiều Rộng\r\n', 500000, 10, 400000, 'Kinh_nghiem_11.png', 4, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(34, 'Luyện Siêu Tư Duy Ngữ Văn Chuyên Đề Nghị Luận Văn Học - Quyển 1: Chiều Rộng\r\n', 500000, 10, 400000, 'Kinh_nghiem_11.png', 4, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(35, 'Luyện Siêu Tư Duy Ngữ Văn Chuyên Đề Nghị Luận Văn Học - Quyển 1: Chiều Rộng\r\n', 500000, 10, 400000, 'Kinh_nghiem_11.png', 4, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(36, 'Luyện Siêu Tư Duy Ngữ Văn Chuyên Đề Nghị Luận Văn Học - Quyển 1: Chiều Rộng\r\n', 500000, 10, 400000, 'Kinh_nghiem_11.png', 4, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(37, 'Luyện Siêu Tư Duy Ngữ Văn Chuyên Đề Nghị Luận Văn Học - Quyển 1: Chiều Rộng\r\n', 500000, 10, 400000, 'Kinh_nghiem_11.png', 4, 1524, 'Chu Văn Biên', 'Bộ BÍ QUYẾT LUYỆN THI VẬT LÍ 12 đã từng được bình chọn là hay nhất trong tất cả các sách tham khảo tại thời điểm phát hành và được các giáo viên sử dụng làm bộ sách tham khảo chính, đồng thời áp dụng đại trà ở nhiều trung tâm luyện thi và các trường THPT nhiều năm nay...<br>Nhưng hiện tại có 1 số điểm mới tới như bộ Giáo dục đã công bố. Thầy đã kì công viết bộ sách MỚI NHẤT thay thế ĐẶT TÊN là\" KINH NGHIỆM LUYỆN THI VẬT LÍ 12 - CHU VĂN BIÊN\"<br>Với mỗi dạng toán vật lí  thông thường có nhiều cách giải khác nhau. Ðối với hình thức thi trắc nghiệm đòi hỏi phải ra quyết định nhanh và chính xác vì vậy phải lựa chọn được cách giải nào nhanh, hiệu quả nhất. Nhiều tài liệu tham khảo từ trước tới nay thường lựa chọn cách giải tuần tự chi tiết từng bước cho mọi bài toán. Thiết nghĩ những bài toán mở đầu của các dạng thì việc làm đó là cần thiết nhưng các bài toán tiếp sau thì cần phải rút ra được các quy trình giải nhanh. Sau khi vận dụng các quy trình giải nhanh sẽ giúp cho học sinh nhớ được những dạng toán cơ bản đã học và phát hiện được những bài được gọi là‘‘mới lạ” nhưng thực ra nó chính là hình thức biến tướng từ các dạng toán quen thuộc. Mục đích của chúng tôi cho ra đời một bộ sách đầy đủ các dạng, sát với đề thi THPT Quốc Gia và cũng không quên hướng dẫn bạn đọc nhiều cách giải hay cho một dạng toán. Sẽ là một sơ suất lớn nếu bộ sách này không cập nhật được đầy đủ các “mẹo” giúp học sinh loại trừ đi các phương án nhiễu mà không cần đến các thao tác tính toán phức tạp.', 'Active', 100, '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(38, 'Book', 5, 4, 5, 'book_img_01-11-2021-11-04-37.jpg', 2, 2, 'sadasasd', '<p>sdfsdfsdf</p>', 'Active', 3, '2021-11-01 11:04:37', '2021-11-01 11:04:37'),
(39, 'khang', 1, 1, 1, 'book_img_01-11-2021-11-05-34.png', 7, 1, '232', '<p>1312</p>', 'Active', 1, '2021-11-01 11:05:34', '2021-11-01 11:05:34'),
(40, '2132', 3, 30, 2, 'book_img_01-11-2021-11-07-55.jpg', 6, 3, '3', '<p>3423423</p>', 'Active', 3, '2021-11-01 11:07:55', '2021-11-01 11:07:55'),
(41, 'đay là một cuốn sách', 1, 0, 1, 'book_img_01-11-2021-11-17-29.jpg', 2, 1, 'tên tác giả', '<p>viết gì đó</p>', 'Active', 1, '2021-11-01 11:17:29', '2021-11-01 11:17:29'),
(42, 'PNVSHOP', 1, 1, 1, 'book_img_02-11-2021-02-39-10.jpg', 5, 1, '232', '<p>Hà Mộng Khang</p>', 'Active', 1, '2021-11-02 02:39:10', '2021-11-02 02:39:10'),
(43, 'khangffff', 1, 1, 1, 'book_img_02-11-2021-10-56-31.png', 7, 1, '232', '<p>dsfsd</p>', 'Active', 1, '2021-11-02 10:56:31', '2021-11-02 10:56:31'),
(44, 'PNVSHOPdssdfsdf', 2, 2, 2, 'book_img_02-11-2021-12-35-05.png', 6, 2, '23', '<p>2222</p>', 'Active', 2, '2021-11-02 12:35:05', '2021-11-02 12:35:05'),
(45, 'ưe212', 2312, 23, 1780, 'book_img_02-11-2021-12-35-29.png', 4, 2312, '12312', '<p>23123</p>', 'Block', 2132, '2021-11-02 12:35:29', '2021-11-02 12:35:29');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book_type`
--

CREATE TABLE `book_type` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `book_type`
--

INSERT INTO `book_type` (`id`, `name`, `created_at`, `updated_at`) VALUES
(2, 'Sách luyện thi Vật Lí THPT Quốc Gia', '2021-10-04 16:30:17', '2021-10-04 16:30:17'),
(4, 'Sách luyện thi THPT Quốc Gia', '2021-10-04 16:30:50', '2021-10-04 18:20:51'),
(5, 'Sách tham khảo hay lớp 11', '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(6, 'Sách tham khảo hay lớp 10', '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(7, 'Sách tham khảo hay lớp 9', '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(8, 'Sách tham khảo hay lớp 8', '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(9, 'Sách tham khảo hay lớp 7', '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(10, 'Sách tham khảo hay lớp 6', '2021-10-11 03:39:21', '2021-10-11 03:39:21'),
(11, 'Sách tham khảo hay lớp 5', '2021-10-11 03:39:21', '2021-10-11 03:39:21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `id_payment` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `cart`
--

INSERT INTO `cart` (`id`, `id_payment`, `userId`, `product_id`, `type`, `quantity`, `created_at`, `updated_at`) VALUES
(13, '0', 2, 3, 'course', 1, '2021-10-14 02:15:34', '2021-10-14 02:15:34'),
(21, '0', 2, 18, 'book', 100, '2021-10-16 00:14:15', '2021-10-16 00:41:08'),
(22, '0', 2, 24, 'book', 1, '2021-10-16 00:43:49', '2021-10-16 00:43:49'),
(26, '0', 2, 10, 'book', 1, '2021-10-17 01:37:39', '2021-10-17 01:37:39'),
(27, '0', 2, 25, 'book', 2, '2021-10-17 01:49:54', '2021-10-17 01:54:09'),
(42, '1635152110', 7, 3, 'course', 1, '2021-10-18 14:57:03', '2021-10-25 15:55:10'),
(43, '1635152110', 7, 5, 'course', 1, '2021-10-18 14:57:43', '2021-10-25 15:55:10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category_course`
--

CREATE TABLE `category_course` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category_course`
--

INSERT INTO `category_course` (`id`, `name`, `status`, `description`, `created_at`, `updated_at`) VALUES
(2, 'Khoá học 0 đồng', 'Active', 'Đây là khóa học miễn phí cho tất cả các em học sinh thân mến, mọi người đều có thể học tập các kháo học này.', '2021-10-05 16:20:28', '2021-10-11 21:09:36'),
(3, 'Luyện thi THPT QG 2022', 'Active', 'Đây là khóa học miễn phí cho tất cả các em học sinh thân mến, mọi người đều có thể học tập các kháo học này.', '2021-10-07 16:11:11', '2021-10-07 16:11:11'),
(6, 'Luyện thi THPT QG 2023', 'Active', 'Đây là khóa học miễn phí cho tất cả các em học sinh thân mến, mọi người đều có thể học tập các kháo học này.', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(7, 'Luyện thi THPT QG 2024', 'Active', 'Đây là khóa học miễn phí cho tất cả các em học sinh thân mến, mọi người đều có thể học tập các kháo học này.', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(8, 'Gói luyện thi để cho giáo viên tham khảo', 'Active', 'Đây là khóa học miễn phí cho tất cả các em học sinh thân mến, mọi người đều có thể học tập các kháo học này.', '2021-10-04 10:25:41', '2021-10-04 10:25:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `lessonId` int(11) NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`id`, `userId`, `lessonId`, `message`, `created_at`, `updated_at`) VALUES
(1, 7, 4, 'lesson4 comment 1', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(2, 7, 5, 'Tao là Khang đây 2!!!', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(3, 7, 5, 'Tao là Khang đây 3!!!', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(4, 7, 4, 'lesson4 comment 4', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(5, 7, 4, 'lesson4 comment 5', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(6, 7, 4, 'lesson4 comment 6', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(7, 7, 4, 'lesson4 comment 7', '2021-10-20 14:10:18', '2021-10-20 14:10:18'),
(8, 7, 4, 'dấdasdaasdasdasds', '2021-10-20 15:56:45', '2021-10-20 15:56:45'),
(9, 7, 4, 'Hà Mộng Khang', '2021-10-20 15:57:45', '2021-10-20 15:57:45'),
(10, 7, 4, 'teset', '2021-10-20 16:01:27', '2021-10-20 16:01:27'),
(11, 7, 5, '5555', '2021-10-20 16:01:41', '2021-10-20 16:01:41'),
(12, 7, 5, 'Khang comment', '2021-10-20 16:24:51', '2021-10-20 16:24:51'),
(13, 7, 5, 'ttttt', '2021-10-20 16:32:15', '2021-10-20 16:32:15'),
(14, 7, 5, 'qqq', '2021-10-20 16:33:07', '2021-10-20 16:33:07'),
(15, 7, 5, 'aaaaaa', '2021-10-20 16:34:17', '2021-10-20 16:34:17'),
(16, 7, 4, 'dấdasdaasdasdasdsaaa3444', '2021-10-20 16:37:31', '2021-10-20 16:37:31'),
(17, 7, 4, 'undefined', '2021-10-20 16:53:54', '2021-10-20 16:53:54'),
(18, 7, 4, 'undefined', '2021-10-20 16:54:00', '2021-10-20 16:54:00'),
(19, 7, 4, 'undefined', '2021-10-20 16:54:01', '2021-10-20 16:54:01'),
(20, 7, 4, 'undefined', '2021-10-20 16:54:01', '2021-10-20 16:54:01'),
(21, 7, 4, 'undefined', '2021-10-20 16:54:01', '2021-10-20 16:54:01'),
(22, 7, 5, 'asasasa', '2021-10-20 16:58:06', '2021-10-20 16:58:06'),
(23, 7, 5, 'asasasa', '2021-10-20 16:58:17', '2021-10-20 16:58:17'),
(24, 7, 5, 'asasasa', '2021-10-20 16:58:18', '2021-10-20 16:58:18'),
(25, 7, 5, 'asasasa', '2021-10-20 16:58:18', '2021-10-20 16:58:18'),
(26, 7, 5, 'asasasa', '2021-10-20 16:58:19', '2021-10-20 16:58:19'),
(27, 7, 5, 'asasasa', '2021-10-20 16:58:19', '2021-10-20 16:58:19'),
(28, 7, 5, 'asasasa', '2021-10-20 16:58:20', '2021-10-20 16:58:20'),
(29, 7, 5, 'asasasa', '2021-10-20 16:58:20', '2021-10-20 16:58:20'),
(30, 7, 4, 'Hà Mộng Khang', '2021-10-20 17:00:23', '2021-10-20 17:00:23'),
(31, 7, 4, 'âsasa', '2021-10-20 17:03:46', '2021-10-20 17:03:46'),
(32, 7, 4, 'Tôi đã xem', '2021-10-23 01:57:24', '2021-10-23 01:57:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment_reply`
--

CREATE TABLE `comment_reply` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `id_reply` int(11) NOT NULL,
  `lessonId` int(11) NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comment_reply`
--

INSERT INTO `comment_reply` (`id`, `userId`, `id_reply`, `lessonId`, `message`, `created_at`, `updated_at`) VALUES
(2, 7, 2, 5, 'comment reply cuar comment 1 lesson 5', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(3, 7, 1, 4, 'comment reply cuar comment 1 lesson 4', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(4, 7, 2, 5, 'Tao là Khang đây 2!!!', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(5, 7, 4, 4, 'comment reply cua comment 4 lesson 4', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(6, 7, 2, 5, 'Tao là Khang đây 2!!!', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(7, 7, 1, 4, 'comment reply cua comment 1 lesson 4', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(8, 7, 3, 5, 'Tao là Khang đây 2!!!', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(9, 7, 12, 5, 'wqeqweq', '2021-10-20 16:29:34', '2021-10-20 16:29:34'),
(10, 7, 13, 5, 'eeee', '2021-10-20 16:32:19', '2021-10-20 16:32:19'),
(11, 7, 14, 5, 'www', '2021-10-20 16:33:11', '2021-10-20 16:33:11'),
(12, 7, 14, 5, 'aaa', '2021-10-20 16:33:45', '2021-10-20 16:33:45'),
(13, 7, 15, 5, 'aaaar', '2021-10-20 16:34:24', '2021-10-20 16:34:24'),
(14, 7, 22, 5, 'asasa1', '2021-10-20 16:58:11', '2021-10-20 16:58:11'),
(15, 7, 32, 4, 'Xem kệ  m', '2021-10-23 01:57:36', '2021-10-23 01:57:36');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `content`
--

CREATE TABLE `content` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `table_of_content_id` int(11) NOT NULL,
  `status` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `content`
--

INSERT INTO `content` (`id`, `name`, `table_of_content_id`, `status`, `created_at`, `updated_at`) VALUES
(4, 'content 4', 7, 'Active', '2021-10-04 00:00:00', '2021-10-04 00:00:00'),
(5, 'content 5', 4, 'Active', '2021-10-04 00:00:00', '2021-10-04 00:00:00'),
(7, 'content 7', 4, 'Active', '2021-10-05 16:39:24', '2021-10-05 16:39:51'),
(8, 'content 2', 4, 'Active', '2021-10-11 22:56:16', '2021-10-11 22:56:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Initial_price` float NOT NULL,
  `promotion` float NOT NULL,
  `promotion_price` float NOT NULL,
  `category_course` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `target` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `benefit` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `course`
--

INSERT INTO `course` (`id`, `name`, `image`, `Initial_price`, `promotion`, `promotion_price`, `category_course`, `description`, `target`, `benefit`, `status`, `created_at`, `updated_at`) VALUES
(3, 'Định lý BHD - Định lý thống nhất', 'BHD_TN.jpg', 0, 0, 0, 2, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-10-05 16:24:20', '2021-10-11 20:19:41'),
(4, '\r\nGiải và bình luận đề', 'khoa_free.jpg', 0.899, 10, 0.8, 2, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-10-05 16:25:25', '2021-10-05 16:25:25'),
(5, 'Vật lí 10 (2022)', 'Vat_li_10_2022.jpg', 90000, 50, 45000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-10-07 23:58:41', '2021-10-11 21:53:40'),
(6, '\r\nVật lí 11 (2022)', 'Vat_li_11_2022.jpg', 1000000, 0, 1000000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-10-07 23:59:35', '2021-10-07 23:59:35'),
(16, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(17, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(18, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(19, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(20, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(21, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(22, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(23, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 5, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(24, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 5, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(25, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 5, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(26, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(27, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 5, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(28, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 5, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(29, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 5, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(30, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 6, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(31, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 5, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(32, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(33, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 6, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(34, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 6, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(35, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 6, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(36, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(37, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(38, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(39, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(40, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 6, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(41, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 5, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(42, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(43, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 6, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00');
INSERT INTO `course` (`id`, `name`, `image`, `Initial_price`, `promotion`, `promotion_price`, `category_course`, `description`, `target`, `benefit`, `status`, `created_at`, `updated_at`) VALUES
(44, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 6, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(45, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 6, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(46, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(47, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(48, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00'),
(49, '\r\nVật lí 12 (2022)', 'Vat_li_12_2022.jpg', 100000, 100000, 100000, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat aliquam autem laborum voluptatibus? Deserunt, dignissimos? Adipisci suscipit alias sapiente id voluptatibus, omnis aut eum temporibus ducimus vero! Dolor, magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit corrupti voluptatem deserunt, reiciendis fugit, deleniti esse voluptate consectetur, alias voluptas sit eveniet beatae ad magnam a amet nam vel.', 'Active', '2021-09-14 10:32:00', '2021-09-14 10:32:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `exam`
--

CREATE TABLE `exam` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `image` text NOT NULL,
  `file_question` text NOT NULL,
  `number_question` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `status` varchar(225) NOT NULL,
  `price` float NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `exam`
--

INSERT INTO `exam` (`id`, `name`, `image`, `file_question`, `number_question`, `time`, `category_id`, `status`, `price`, `created_at`, `updated_at`) VALUES
(1, 'Đề số 8', 'Cover.png', 'dwer].php', 60, 60, 1, 'Active', 10000, '2021-10-05 16:24:20', '2021-11-12 20:39:42'),
(2, 'Đề số 7', 'Vatli10.jpg', 'Block', 40, 60, 1, 'Block', 10000, '2021-10-05 16:24:20', '2021-11-11 09:15:01'),
(3, 'Đề số 6', 'Vatli10.jpg', 'Block', 40, 60, 1, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(4, 'Đề số 5', 'Vatli10.jpg', 'Block', 40, 60, 1, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(5, 'Đề số 4', 'Vatli10.jpg', 'Block', 40, 60, 1, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(6, 'Đề số 3', 'Vatli10.jpg', 'Block', 40, 60, 1, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(7, 'Đề số 2', 'Vatli10.jpg', 'Block', 40, 60, 1, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(8, 'Đề số 1', 'Vatli10.jpg', 'Block', 40, 60, 1, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(9, 'Đề online 11 bài 1', 'Vatli10.jpg', 'Block', 40, 60, 2, 'Block', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(10, 'Đề online 11 bài 2', 'Vatli10.jpg', 'Block', 40, 60, 2, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(11, 'Đề online 11 bài 3', 'Vatli10.jpg', 'Block', 40, 60, 2, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(12, 'Đề online 11 bài 4', 'Vatli10.jpg', 'Block', 40, 60, 2, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(13, 'Đề online 12 bài 1', 'Vatli10.jpg', 'Block', 40, 60, 3, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(14, 'Đề online 12 bài 2', 'Vatli10.jpg', 'Block', 40, 60, 3, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(15, 'Đề online 12 bài 3', 'Vatli10.jpg', 'Block', 40, 60, 3, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(16, 'Đề online 12 bài 4', 'Vatli10.jpg', 'Block', 40, 60, 3, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(17, 'Ôn luyện bài 1', 'Vatli10.jpg', 'Block', 40, 60, 4, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(18, 'Ôn luyện bài 2', 'Vatli10.jpg', 'Block', 40, 60, 4, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(19, 'Ôn luyện bài 3', 'Vatli10.jpg', 'Block', 40, 60, 4, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(20, 'Ôn luyện bài 4', 'Vatli10.jpg', 'Block', 40, 60, 4, 'Active', 10000, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(22, 'Exam_test_1_2', '251030387_4478611178901526_7543044002142946626_n.jpg', 'Block', 40, 60, 4, 'Block', 100000, '2021-11-10 14:49:31', '2021-11-13 17:30:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `exam_answer`
--

CREATE TABLE `exam_answer` (
  `id` int(11) NOT NULL,
  `answer` text NOT NULL,
  `exam_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `exam_answer`
--

INSERT INTO `exam_answer` (`id`, `answer`, `exam_id`, `question_id`, `created_at`, `updated_at`) VALUES
(1, 'A', 1, 1, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(2, 'B', 1, 2, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(3, 'C', 2, 11, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(4, 'D', 2, 9, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(5, 'Câu hỏi 1 đề 8', 6, 10, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(6, 'Câu hỏi 2 đề 8', 3, 0, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(7, 'Câu hỏi 1 đề 8', 4, 0, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(8, 'Câu hỏi 2 đề 8', 5, 0, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(9, 'Câu hỏi 1 đề 8', 6, 0, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(10, 'Câu hỏi 2 đề 8', 7, 0, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(11, 'Câu hỏi 1 đề 8', 4, 0, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(12, 'Câu hỏi 2 đề 8', 5, 0, '2021-10-05 16:24:20', '2021-10-05 16:24:20');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `exam_category`
--

CREATE TABLE `exam_category` (
  `id` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `status` varchar(225) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `exam_category`
--

INSERT INTO `exam_category` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Thi online Vật Lý 10', 'Active', '2021-10-05 16:20:28', '2021-11-10 09:02:15'),
(2, 'Thi online Vật Lý 11', 'Active', '2021-10-05 16:20:28', '2021-11-10 08:58:04'),
(3, 'Thi online Vật Lý 12', 'Active', '2021-10-05 16:20:28', '2021-11-08 07:47:46'),
(4, 'Đề tổng ôn', 'Block', '2021-10-05 16:20:28', '2021-11-10 08:50:42'),
(5, '40 đề ôn thi Vật Lý', 'Active', '2021-10-05 16:20:28', '2021-10-05 16:20:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `exam_question`
--

CREATE TABLE `exam_question` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `exam_id` int(11) NOT NULL,
  `image` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `exam_question`
--

INSERT INTO `exam_question` (`id`, `question`, `exam_id`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Câu hỏi 1 đề 8', 1, '', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(2, 'Câu hỏi 1 đề 8', 1, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(3, 'Câu hỏi 1 đề 8', 1, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(4, 'Câu hỏi 1 đề 8', 1, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(5, 'Câu hỏi 1 đề 8', 1, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(6, 'Câu hỏi 1 đề 8', 1, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(7, 'Câu hỏi 1 đề 8', 1, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(8, 'Câu hỏi 1 đề 8', 1, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(9, 'Câu hỏi 1 đề 8', 1, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(10, 'Câu hỏi 1 đề 8', 1, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(11, 'Câu hỏi 1 đề 8', 2, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(12, 'Câu hỏi 1 đề 8', 2, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(13, 'Câu hỏi 1 đề 8', 3, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(14, 'Câu hỏi 1 đề 8', 3, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(15, 'Câu hỏi 1 đề 8', 3, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(16, 'Câu hỏi 1 đề 8', 4, 'Vatli10.jpg', '2021-10-05 16:24:20', '2021-10-05 16:24:20');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `featured_post`
--

CREATE TABLE `featured_post` (
  `id` int(11) NOT NULL,
  `name` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `file` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(225) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `featured_post`
--

INSERT INTO `featured_post` (`id`, `name`, `description`, `path`, `file`, `image`, `status`, `author`, `created_at`, `updated_at`) VALUES
(2, 'LỘ TRÌNH HỌC TẬP ĐẶC BIỆT DÀNH CHO HS K2006', 'Sau khi biết kết quả kì thi chuyển cấp, sau khi trải quá một quá trình ôn luyện hết sức căng thẳng hẳn các sĩ tử cũng cảm thấy vô cùng mệt mỏi... nhưng chúng ta nên biết rằng chúng ta đang là tân binh mới ở một môi trường hoàn toàn mới, và rộng hơn ngôi trường cấp 2 ta đã học. Mọi thứ đều mới mẻ, từ thầy cô bạn bè đến cách học, cách dạy của giáo viên. Giáo viên sẽ yêu cầu một sự tự giác chủ động hơn.  \r\n\r\nBởi vậy việc nên làm nhất bây giờ là chúng ta phải trang bị kiến thức thật chắc để đúng thời điểm sẽ bung lụa một cách tự tin. Để gây một ấn tượng cực mạnh vào những ng bạn, thầy cô mới. \r\n\r\nTạo đà hứng thú học tập để có một lí lịch đẹp, bảng điểm đẹp, hành trang tốt cho những chặng đường tiếp theo. \r\n\r\nChuvanbien.vn đã có kinh nghiệm đồng hành với các sĩ tử THPT nhiều năm liền, luôn luôn lắng nghe, chia sẻ bí kíp và có đội ngũ hỗ trợ học tập chuyên môn vững vàng luôn túc trực hỗ trợ học sinh tốt nhất. \r\n\r\nChuvanbien.vn đã thiết kế một lộ trình ôn thi bài bản hiệu quả nhất để cho K2005 bắt đầu ngay hôm nay', 'upload\\images\\featured_post', 'sql5440161.sql', 'Book 3.gif', 'Active', 'Trần Quốc Quân', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(3, 'KHUYỄN MÃI LỚN CHO HỌC SINH K2004- HÀNH TRANG MÙA THI 2022', 'Việc học giỏi đã khó, việc lựa chọn đúng ngành nghề  với sở trường của mình càng khó hơn. \r\n\r\nChắc chắn các em phải cố gắng khám phá thế mạnh của bản thân kết hợp với sự giúp đỡ của gia đình, nhà trường và bạn bè hãy lên mục tiêu rõ ràng, phù hợp với mình càng sớm càng tốt. Bởi Mục tiêu là điều quan trọng nhất trong cuộc sống này, càng rõ ràng về các mục tiêu và mục đích của mình, chúng ta càng có nhiều năng lực và hiệu quả trong việc đạt được chúng. Điều làm nên sự khác biệt ở mỗi người chắc chắn đó chính là sống có mục tiêu. \r\n\r\nHơn nữa, để lựa chọn khối một cách chính xác, các em cần xác định rõ các ngành nghề sau này muốn gắn bó cũng như sở thích, sở trường, năng lực hiện tại để đưa ra quyết định sáng suốt chuẩn bị hành trang thật tốt cho kì thi năm 2022. \r\n\r\nNếu bạn nào có đam mê và năng khiếu về tư duy logic, tính toán chính xác và sau này muốn làm các công việc liên quan đến khoa học, công nghệ, kỹ thuật… thì nên lựa chọn các khối học tự nhiên như A và A1 bao gồm các môn học  Toán, Lý, Hóa, Anh. Đặc biệt với việc tìm hiểu về phương pháp và tư duy học tốt môn Vật Lý thì chuvanbien.vn được học sinh và giáo viên luyện thi nhiều năm qua bình chọn là website học vật lý hàng đầu Việt Nam. Chuvanbien.vn sẽ luôn là 1 người bạn đồng hành, 1 trợ thủ đắc lực giúp các em chinh phục đỉnh cao môn Vật Lý.', 'uploadimagesfeatured_post', 'sql5440161.sql', 'Anh tin tuc.png', 'Active', 'Trần Quốc Quân', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(4, 'KHUYỄN MÃI CỰC LỚN LỘ TRÌNH BỨT PHÁ DÀNH CHO HỌC SINH K2005- HÀNH TRANG MÙA THI 2023', 'Việc học giỏi đã khó, việc lựa chọn đúng ngành nghề  với sở trường của mình càng khó hơn. \r\n\r\nChắc chắn các em phải cố gắng khám phá thế mạnh của bản thân kết hợp với sự giúp đỡ của gia đình, nhà trường và bạn bè hãy lên mục tiêu rõ ràng, phù hợp với mình càng sớm càng tốt. Bởi Mục tiêu là điều quan trọng nhất trong cuộc sống này, càng rõ ràng về các mục tiêu và mục đích của mình, chúng ta càng có nhiều năng lực và hiệu quả trong việc đạt được chúng. Điều làm nên sự khác biệt ở mỗi người chắc chắn đó chính là sống có mục tiêu. \r\n\r\nHơn nữa, để lựa chọn khối một cách chính xác, các em cần xác định rõ các ngành nghề sau này muốn gắn bó cũng như sở thích, sở trường, năng lực hiện tại để đưa ra quyết định sáng suốt chuẩn bị hành trang thật tốt cho kì thi năm 2022. \r\n\r\nNếu bạn nào có đam mê và năng khiếu về tư duy logic, tính toán chính xác và sau này muốn làm các công việc liên quan đến khoa học, công nghệ, kỹ thuật… thì nên lựa chọn các khối học tự nhiên như A và A1 bao gồm các môn học  Toán, Lý, Hóa, Anh. Đặc biệt với việc tìm hiểu về phương pháp và tư duy học tốt môn Vật Lý thì chuvanbien.vn được học sinh và giáo viên luyện thi nhiều năm qua bình chọn là website học vật lý hàng đầu Việt Nam. Chuvanbien.vn sẽ luôn là 1 người bạn đồng hành, 1 trợ thủ đắc lực giúp các em chinh phục đỉnh cao môn Vật Lý.', 'uploadimagesfeatured_post', 'sql5440161.sql', 'Khoa-k2005.jpg', 'Active', 'Trần Quốc Quân', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(5, 'CÓ NÊN HỌC VẬT LÝ CÙNG THẦY CHU VĂN Quân???', 'Việc học giỏi đã khó, việc lựa chọn đúng ngành nghề  với sở trường của mình càng khó hơn. \r\n\r\nChắc chắn các em phải cố gắng khám phá thế mạnh của bản thân kết hợp với sự giúp đỡ của gia đình, nhà trường và bạn bè hãy lên mục tiêu rõ ràng, phù hợp với mình càng sớm càng tốt. Bởi Mục tiêu là điều quan trọng nhất trong cuộc sống này, càng rõ ràng về các mục tiêu và mục đích của mình, chúng ta càng có nhiều năng lực và hiệu quả trong việc đạt được chúng. Điều làm nên sự khác biệt ở mỗi người chắc chắn đó chính là sống có mục tiêu. \r\n\r\nHơn nữa, để lựa chọn khối một cách chính xác, các em cần xác định rõ các ngành nghề sau này muốn gắn bó cũng như sở thích, sở trường, năng lực hiện tại để đưa ra quyết định sáng suốt chuẩn bị hành trang thật tốt cho kì thi năm 2022. \r\n\r\nNếu bạn nào có đam mê và năng khiếu về tư duy logic, tính toán chính xác và sau này muốn làm các công việc liên quan đến khoa học, công nghệ, kỹ thuật… thì nên lựa chọn các khối học tự nhiên như A và A1 bao gồm các môn học  Toán, Lý, Hóa, Anh. Đặc biệt với việc tìm hiểu về phương pháp và tư duy học tốt môn Vật Lý thì chuvanbien.vn được học sinh và giáo viên luyện thi nhiều năm qua bình chọn là website học vật lý hàng đầu Việt Nam. Chuvanbien.vn sẽ luôn là 1 người bạn đồng hành, 1 trợ thủ đắc lực giúp các em chinh phục đỉnh cao môn Vật Lý.', 'uploadimagesfeatured_post', 'sql5440161.sql', 'z2456122140202_90352fbd519ef9b6c88b4d7c9b97f40a.jpg', 'Active', 'Trần Quốc Quân', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(6, 'KHỞI ĐỘNG SỚM CHO NĂM HỌC MỚI', 'Việc học giỏi đã khó, việc lựa chọn đúng ngành nghề  với sở trường của mình càng khó hơn. \r\n\r\nChắc chắn các em phải cố gắng khám phá thế mạnh của bản thân kết hợp với sự giúp đỡ của gia đình, nhà trường và bạn bè hãy lên mục tiêu rõ ràng, phù hợp với mình càng sớm càng tốt. Bởi Mục tiêu là điều quan trọng nhất trong cuộc sống này, càng rõ ràng về các mục tiêu và mục đích của mình, chúng ta càng có nhiều năng lực và hiệu quả trong việc đạt được chúng. Điều làm nên sự khác biệt ở mỗi người chắc chắn đó chính là sống có mục tiêu. \r\n\r\nHơn nữa, để lựa chọn khối một cách chính xác, các em cần xác định rõ các ngành nghề sau này muốn gắn bó cũng như sở thích, sở trường, năng lực hiện tại để đưa ra quyết định sáng suốt chuẩn bị hành trang thật tốt cho kì thi năm 2022. \r\n\r\nNếu bạn nào có đam mê và năng khiếu về tư duy logic, tính toán chính xác và sau này muốn làm các công việc liên quan đến khoa học, công nghệ, kỹ thuật… thì nên lựa chọn các khối học tự nhiên như A và A1 bao gồm các môn học  Toán, Lý, Hóa, Anh. Đặc biệt với việc tìm hiểu về phương pháp và tư duy học tốt môn Vật Lý thì chuvanbien.vn được học sinh và giáo viên luyện thi nhiều năm qua bình chọn là website học vật lý hàng đầu Việt Nam. Chuvanbien.vn sẽ luôn là 1 người bạn đồng hành, 1 trợ thủ đắc lực giúp các em chinh phục đỉnh cao môn Vật Lý.', 'uploadimagesfeatured_post', 'sql5440161.sql', 'Hocbai.gif', 'Active', 'Trần Quốc Quân', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(7, 'KHUYỄN MÃI LỚN CHO HỌC SINH K2004- HÀNH TRANG MÙA THI 2022', 'Việc học giỏi đã khó, việc lựa chọn đúng ngành nghề  với sở trường của mình càng khó hơn. \r\n\r\nChắc chắn các em phải cố gắng khám phá thế mạnh của bản thân kết hợp với sự giúp đỡ của gia đình, nhà trường và bạn bè hãy lên mục tiêu rõ ràng, phù hợp với mình càng sớm càng tốt. Bởi Mục tiêu là điều quan trọng nhất trong cuộc sống này, càng rõ ràng về các mục tiêu và mục đích của mình, chúng ta càng có nhiều năng lực và hiệu quả trong việc đạt được chúng. Điều làm nên sự khác biệt ở mỗi người chắc chắn đó chính là sống có mục tiêu. \r\n\r\nHơn nữa, để lựa chọn khối một cách chính xác, các em cần xác định rõ các ngành nghề sau này muốn gắn bó cũng như sở thích, sở trường, năng lực hiện tại để đưa ra quyết định sáng suốt chuẩn bị hành trang thật tốt cho kì thi năm 2022. \r\n\r\nNếu bạn nào có đam mê và năng khiếu về tư duy logic, tính toán chính xác và sau này muốn làm các công việc liên quan đến khoa học, công nghệ, kỹ thuật… thì nên lựa chọn các khối học tự nhiên như A và A1 bao gồm các môn học  Toán, Lý, Hóa, Anh. Đặc biệt với việc tìm hiểu về phương pháp và tư duy học tốt môn Vật Lý thì chuvanbien.vn được học sinh và giáo viên luyện thi nhiều năm qua bình chọn là website học vật lý hàng đầu Việt Nam. Chuvanbien.vn sẽ luôn là 1 người bạn đồng hành, 1 trợ thủ đắc lực giúp các em chinh phục đỉnh cao môn Vật Lý.', 'uploadimagesfeatured_post', 'sql5440161.sql', 'Anh tin tuc.png', 'Active', 'Trần Quốc Quân', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(8, 'KHUYỄN MÃI CỰC LỚN LỘ TRÌNH BỨT PHÁ DÀNH CHO HỌC SINH K2005- HÀNH TRANG MÙA THI 2023', 'Việc học giỏi đã khó, việc lựa chọn đúng ngành nghề  với sở trường của mình càng khó hơn. \r\n\r\nChắc chắn các em phải cố gắng khám phá thế mạnh của bản thân kết hợp với sự giúp đỡ của gia đình, nhà trường và bạn bè hãy lên mục tiêu rõ ràng, phù hợp với mình càng sớm càng tốt. Bởi Mục tiêu là điều quan trọng nhất trong cuộc sống này, càng rõ ràng về các mục tiêu và mục đích của mình, chúng ta càng có nhiều năng lực và hiệu quả trong việc đạt được chúng. Điều làm nên sự khác biệt ở mỗi người chắc chắn đó chính là sống có mục tiêu. \r\n\r\nHơn nữa, để lựa chọn khối một cách chính xác, các em cần xác định rõ các ngành nghề sau này muốn gắn bó cũng như sở thích, sở trường, năng lực hiện tại để đưa ra quyết định sáng suốt chuẩn bị hành trang thật tốt cho kì thi năm 2022. \r\n\r\nNếu bạn nào có đam mê và năng khiếu về tư duy logic, tính toán chính xác và sau này muốn làm các công việc liên quan đến khoa học, công nghệ, kỹ thuật… thì nên lựa chọn các khối học tự nhiên như A và A1 bao gồm các môn học  Toán, Lý, Hóa, Anh. Đặc biệt với việc tìm hiểu về phương pháp và tư duy học tốt môn Vật Lý thì chuvanbien.vn được học sinh và giáo viên luyện thi nhiều năm qua bình chọn là website học vật lý hàng đầu Việt Nam. Chuvanbien.vn sẽ luôn là 1 người bạn đồng hành, 1 trợ thủ đắc lực giúp các em chinh phục đỉnh cao môn Vật Lý.', 'uploadimagesfeatured_post', 'sql5440161.sql', 'Khoa-k2005.jpg', 'Active', 'Trần Quốc Quân', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(9, 'CÓ NÊN HỌC VẬT LÝ CÙNG THẦY CHU VĂN Quân???', 'Việc học giỏi đã khó, việc lựa chọn đúng ngành nghề  với sở trường của mình càng khó hơn. \r\n\r\nChắc chắn các em phải cố gắng khám phá thế mạnh của bản thân kết hợp với sự giúp đỡ của gia đình, nhà trường và bạn bè hãy lên mục tiêu rõ ràng, phù hợp với mình càng sớm càng tốt. Bởi Mục tiêu là điều quan trọng nhất trong cuộc sống này, càng rõ ràng về các mục tiêu và mục đích của mình, chúng ta càng có nhiều năng lực và hiệu quả trong việc đạt được chúng. Điều làm nên sự khác biệt ở mỗi người chắc chắn đó chính là sống có mục tiêu. \r\n\r\nHơn nữa, để lựa chọn khối một cách chính xác, các em cần xác định rõ các ngành nghề sau này muốn gắn bó cũng như sở thích, sở trường, năng lực hiện tại để đưa ra quyết định sáng suốt chuẩn bị hành trang thật tốt cho kì thi năm 2022. \r\n\r\nNếu bạn nào có đam mê và năng khiếu về tư duy logic, tính toán chính xác và sau này muốn làm các công việc liên quan đến khoa học, công nghệ, kỹ thuật… thì nên lựa chọn các khối học tự nhiên như A và A1 bao gồm các môn học  Toán, Lý, Hóa, Anh. Đặc biệt với việc tìm hiểu về phương pháp và tư duy học tốt môn Vật Lý thì chuvanbien.vn được học sinh và giáo viên luyện thi nhiều năm qua bình chọn là website học vật lý hàng đầu Việt Nam. Chuvanbien.vn sẽ luôn là 1 người bạn đồng hành, 1 trợ thủ đắc lực giúp các em chinh phục đỉnh cao môn Vật Lý.', 'uploadimagesfeatured_post', 'sql5440161.sql', 'z2456122140202_90352fbd519ef9b6c88b4d7c9b97f40a.jpg', 'Active', 'Trần Quốc Quân', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(10, 'KHỞI ĐỘNG SỚM CHO NĂM HỌC MỚI', 'Việc học giỏi đã khó, việc lựa chọn đúng ngành nghề  với sở trường của mình càng khó hơn. \r\n\r\nChắc chắn các em phải cố gắng khám phá thế mạnh của bản thân kết hợp với sự giúp đỡ của gia đình, nhà trường và bạn bè hãy lên mục tiêu rõ ràng, phù hợp với mình càng sớm càng tốt. Bởi Mục tiêu là điều quan trọng nhất trong cuộc sống này, càng rõ ràng về các mục tiêu và mục đích của mình, chúng ta càng có nhiều năng lực và hiệu quả trong việc đạt được chúng. Điều làm nên sự khác biệt ở mỗi người chắc chắn đó chính là sống có mục tiêu. \r\n\r\nHơn nữa, để lựa chọn khối một cách chính xác, các em cần xác định rõ các ngành nghề sau này muốn gắn bó cũng như sở thích, sở trường, năng lực hiện tại để đưa ra quyết định sáng suốt chuẩn bị hành trang thật tốt cho kì thi năm 2022. \r\n\r\nNếu bạn nào có đam mê và năng khiếu về tư duy logic, tính toán chính xác và sau này muốn làm các công việc liên quan đến khoa học, công nghệ, kỹ thuật… thì nên lựa chọn các khối học tự nhiên như A và A1 bao gồm các môn học  Toán, Lý, Hóa, Anh. Đặc biệt với việc tìm hiểu về phương pháp và tư duy học tốt môn Vật Lý thì chuvanbien.vn được học sinh và giáo viên luyện thi nhiều năm qua bình chọn là website học vật lý hàng đầu Việt Nam. Chuvanbien.vn sẽ luôn là 1 người bạn đồng hành, 1 trợ thủ đắc lực giúp các em chinh phục đỉnh cao môn Vật Lý.', 'uploadimagesfeatured_post', 'sql5440161.sql', 'Hocbai.gif', 'Active', 'Trần Quốc Quân', '2021-10-04 10:25:41', '2021-10-04 10:25:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `forgot_code`
--

CREATE TABLE `forgot_code` (
  `id` int(11) NOT NULL,
  `email` varchar(225) NOT NULL,
  `code` varchar(225) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `forgot_code`
--

INSERT INTO `forgot_code` (`id`, `email`, `code`, `created_at`, `updated_at`) VALUES
(13, 'khang.ha22@student.passerellesnumeriques.org', 'ol0vGS', '2021-10-19 16:18:16', '2021-10-19 16:18:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `free_document`
--

CREATE TABLE `free_document` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `free_document`
--

INSERT INTO `free_document` (`id`, `category_id`, `name`, `file`, `path`, `status`, `created_at`, `updated_at`) VALUES
(7, 3, 'THPT Bỉm Sơn - Thanh Hóa - Lần 1', 'THPT Bỉm Sơn - Thanh Hóa - Lần 1.pdf', '/upload/images/free_document/', 'Active', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(8, 2, 'THPT Nguyễn Trãi – Thanh Hóa - Lần 1', 'THPT Chuyên chuyên Quang Trung - Bình Phước - Lần 2.pdf', '/upload/images/free_document/', 'Active', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(9, 2, 'THPT Chuyên chuyên Quang Trung - Bình Phước - Lần 2', 'THPT Chuyên chuyên Quang Trung - Bình Phước - Lần 2 (1).pdf', '/upload/images/free_document/', 'Active', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(10, 2, 'THPT Chuyên chuyên Quang Trung - Bình Phước - Lần 3', 'Đề thi minh hoạ THPT Quốc gia năm 2019.pdf', '/upload/images/free_document/', 'Active', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(11, 2, 'THPT Chuyên chuyên Quang Trung - Bình Phước - Lần 3', 'Đề thi minh hoạ THPT Quốc gia năm 2019.pdf', '/upload/images/free_document/', 'Active', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(12, 2, 'THPT Chuyên chuyên Quang Trung - Bình Phước - Lần 3', 'Đề thi minh hoạ THPT Quốc gia năm 2019.pdf', '/upload/images/free_document/', 'Active', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(13, 2, 'THPT Chuyên chuyên Quang Trung - Bình Phước - Lần 3', 'Đề thi minh hoạ THPT Quốc gia năm 2019.pdf', '/upload/images/free_document/', 'Active', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(14, 2, 'THPT Chuyên chuyên Quang Trung - Bình Phước - Lần 3', 'Đề thi minh hoạ THPT Quốc gia năm 2019.pdf', '/upload/images/free_document/', 'Active', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(15, 3, 'THPT Bỉm Sơn - Thanh Hóa - Lần 1', 'THPT Bỉm Sơn - Thanh Hóa - Lần 1.pdf', '/upload/images/free_document/', 'Active', '2021-10-04 10:25:41', '2021-10-04 10:25:41'),
(16, 3, 'THPT Bỉm Sơn - Thanh Hóa - Lần 1', 'THPT Bỉm Sơn - Thanh Hóa - Lần 1.pdf', '/upload/images/free_document/', 'Active', '2021-10-04 10:25:41', '2021-10-04 10:25:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `free_document_category`
--

CREATE TABLE `free_document_category` (
  `id` int(11) NOT NULL,
  `name` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `free_document_category`
--

INSERT INTO `free_document_category` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Tài liệu môn Vật Lý', 'Active', '2021-10-04 00:46:35', '2021-10-04 00:46:35'),
(3, 'Tài liệu các môn khác', 'Active', '2021-10-04 00:47:00', '2021-10-04 00:47:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `id_payment` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `type` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `history`
--

INSERT INTO `history` (`id`, `id_payment`, `userId`, `product_id`, `type`, `quantity`, `created_at`, `updated_at`) VALUES
(1, '1634422107', 7, 11, 'book', 3, '2021-10-17 05:12:42', '2021-10-17 05:12:42'),
(2, '1634422658', 7, 17, 'course', 1, '2021-10-17 05:18:23', '2021-10-17 05:18:23'),
(3, '1634422658', 7, 13, 'book', 1, '2021-10-17 05:18:23', '2021-10-17 05:18:23'),
(4, '1634423942', 7, 10, 'book', 1, '2021-10-17 05:39:34', '2021-10-17 05:39:34'),
(5, '1634425010', 7, 11, 'book', 1, '2021-10-17 05:58:17', '2021-10-17 05:58:17'),
(7, '1634425010', 7, 4, 'course', 1, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(8, '1634425010', 7, 17, 'course', 1, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(9, '1634425010', 7, 18, 'course', 1, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(10, '1634425010', 7, 19, 'course', 1, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(11, '1634425010', 7, 22, 'course', 1, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(12, '1634425010', 7, 20, 'course', 1, '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(13, '1635153243', 7, 2, 'exam', 1, '2021-10-25 16:23:26', '2021-10-25 16:23:26'),
(14, '1635153243', 7, 1, 'exam', 1, '2021-10-25 16:23:29', '2021-10-25 16:23:29');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `itinteach`
--

CREATE TABLE `itinteach` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `itinteach`
--

INSERT INTO `itinteach` (`id`, `name`, `description`, `image`, `author`, `file`, `path`, `status`, `created_at`, `updated_at`) VALUES
(2, 'ITinTeach_2', 'mô tả _1', 'code3.PNG', 'author_1', '242860562_183746970550668_4081521569323813678_n.jpg', 'upload\\images\\IT_in_teach', 'Active', '2021-10-04 00:31:32', '2021-11-06 15:48:31'),
(3, 'Hỗ trợ học GG Meet', '<p>Hưỡng dẫn dạy học</p>', '74526870_553295735503053_3267794247612366848_n.jpg', 'Hà Mộng Khang', 'code1.PNG', 'upload\\images\\IT_in_teach', 'Block', '2021-11-06 15:10:56', '2021-11-06 15:49:36'),
(5, 'PNVSHOP', '<p>âssa</p>', 'code3.PNG', 'Hà Mộng Khang', 'code1.PNG', 'upload\\images\\IT_in_teach', 'Active', '2021-11-06 15:45:09', '2021-11-06 15:45:09'),
(6, 'Banner_test_2', '<p>ádasdasda</p>', 'slider.PNG', 'ádasd', 'private.key', 'upload\\images\\IT_in_teach', 'Active', '2021-11-06 15:47:42', '2021-11-06 15:47:42'),
(7, 'Exam_test_1322', '<p>34234</p>', '251030387_4478611178901526_7543044002142946626_n.jpg', '324324', 'Untitled_document (2).docx', 'upload\\images\\IT_in_teach', 'Active', '2021-11-10 15:45:03', '2021-11-10 15:45:03'),
(8, 'ưetw', '<p>ưerwe</p>', '251030387_4478611178901526_7543044002142946626_n.jpg', 'ẻwe', 'header (1).php', 'upload\\images\\IT_in_teach', 'Block', '2021-11-10 15:45:50', '2021-11-10 15:47:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lesson`
--

CREATE TABLE `lesson` (
  `id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `path` text CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `lesson`
--

INSERT INTO `lesson` (`id`, `content_id`, `name`, `file_name`, `description`, `status`, `created_at`, `updated_at`, `path`) VALUES
(4, 4, 'lesson 2', 'Lý thuyết hiện tượng quang điện ngoài, thuyết lượng tử ánh sáng.mp4', 'hgfjugj', 'Active', '2021-10-05 16:41:31', '2021-10-11 23:36:00', 'kkjlg'),
(5, 4, 'lesson 2', '2 cách giải cho câu đồ thị dao động cơ hay.mp4', 'jjhkljl', 'Active', '2021-10-11 23:15:49', '2021-10-11 23:15:49', 'gfggfgg'),
(6, 7, 'lesson 2', 'duong-tron-pha.mp4', 'jjhkljl', 'Active', '2021-10-11 23:22:49', '2021-10-11 23:22:49', 'gfggfgg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `message` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_seen` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `receiver` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `messages`
--

INSERT INTO `messages` (`id`, `message`, `is_seen`, `created_at`, `updated_at`, `user_id`, `receiver`) VALUES
(1, 'chat kiểm tra db mới', 0, '2021-09-26 16:55:39', '2021-09-26 16:55:39', 2, 4),
(2, 'admin gửi user', 0, '2021-09-26 16:55:39', '2021-09-26 16:55:39', 4, 2),
(3, 'user gửi admin', 0, '2021-09-26 16:55:39', '2021-09-26 16:55:39', 2, 4),
(4, 'user gửi admin lần 2', 0, '2021-09-26 16:55:39', '2021-09-26 16:55:39', 2, 4),
(5, 'admin gửi user lần 2', 0, '2021-09-26 16:55:39', '2021-09-26 16:55:39', 4, 2),
(6, 'được của ló', 0, '2021-10-06 18:09:37', '2021-10-06 18:09:37', 2, 4),
(7, 'user gửi admin lần 3', 0, '2021-10-06 18:23:59', '2021-10-06 18:23:59', 2, 4),
(8, 'gửi', 0, '2021-10-06 18:26:37', '2021-10-06 18:26:37', 2, 4),
(9, 'gửi', 0, '2021-10-06 18:27:42', '2021-10-06 18:27:42', 2, 4),
(10, 'đã gửi', 0, '2021-10-06 18:36:03', '2021-10-06 18:36:03', 2, 4),
(11, 'chat kiểm tra db mới', 0, '2021-10-06 19:30:39', '2021-10-06 19:30:39', 8, 4),
(12, 'hello', 0, '2021-10-06 21:21:33', '2021-10-06 21:21:33', 9, 4),
(13, 'hello', 0, '2021-10-06 21:21:39', '2021-10-06 21:21:39', 10, 4),
(14, 'hi', 0, '2021-10-06 21:23:19', '2021-10-06 21:23:19', 11, 4),
(15, 'check check', 0, '2021-10-06 23:40:55', '2021-10-06 23:40:55', 12, 4),
(16, 'check check', 0, '2021-10-06 23:43:09', '2021-10-06 23:43:09', 12, 4),
(17, 'check lần 2', 0, '2021-10-06 23:48:36', '2021-10-06 23:48:36', 12, 4),
(18, 'check lần 2', 0, '2021-10-06 23:49:32', '2021-10-06 23:49:32', 12, 4),
(19, 'check lần 2', 0, '2021-10-06 23:50:18', '2021-10-06 23:50:18', 12, 4),
(20, 'hi there', 0, '2021-10-07 00:03:46', '2021-10-07 00:03:46', 12, 4),
(21, 'Hello admin', 0, '2021-10-22 08:15:47', '2021-10-22 08:15:47', 7, 4),
(22, 'hi', 0, '2021-10-26 09:08:48', '2021-10-26 09:08:48', 4, 7),
(23, 'hỏi hỏi con cặc', 0, '2021-11-06 08:07:00', '2021-11-06 08:07:00', 4, 9);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(3, '2021_09_08_175841_create_add_avatar_users', 1),
(4, '2014_10_12_100000_create_password_resets_table', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `momoorderdetails`
--

CREATE TABLE `momoorderdetails` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `partnerCode` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `partnerName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `storeId` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `requestId` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payType` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderInfo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `redirectUrl` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ipnUrl` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `lang` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `extraData` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `requestType` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `signature` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `momoorderdetails`
--

INSERT INTO `momoorderdetails` (`id`, `userId`, `partnerCode`, `partnerName`, `storeId`, `requestId`, `amount`, `orderId`, `payType`, `orderInfo`, `redirectUrl`, `ipnUrl`, `lang`, `extraData`, `requestType`, `signature`, `status`, `created_at`, `updated_at`) VALUES
(16, 7, 'MOMO282120210723', 'Test', 'MomoTestStore', '1634421190', '1200000', '1634421190', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/', 'http://localhost:3000/', 'vi', 'merchantName=MoMo Partner', 'captureWallet', 'fc04d0063b17951925224f2ebf739dd55249d282fb7041f03d1cbc8897043719', 'unsuccessful', '2021-10-17 04:53:10', '2021-10-17 04:53:10'),
(17, 7, 'MOMO282120210723', 'Test', 'MomoTestStore', '1634421211', '1200000', '1634421211', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/', 'http://localhost:3000/', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '23b065709038456e83cfc95c0e461d5bd2dfd0ef2a4b4e1d7588733218e6dec4', 'unsuccessful', '2021-10-17 04:53:31', '2021-10-17 04:53:31'),
(18, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1634421290', '1200000', '1634421290', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/', 'http://localhost:3000/', 'vi', 'merchantName=MoMo Partner', 'captureWallet', 'e38e5579717481a4a5d9b6500853eca427c4d739ddb46fc0dbcecfb2e907e923', 'unsuccessful', '2021-10-17 04:54:50', '2021-10-17 04:54:50'),
(19, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1634422107', '1200000', '1634422107', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/', 'http://localhost:3000/', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '6bcfb4c85d2c07ddf5d1c0be7a466d97d959f1acb78ac12336de6b307416a261', 'successfully', '2021-10-17 05:08:27', '2021-10-17 05:08:27'),
(20, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1634422658', '800000', '1634422658', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/', 'http://localhost:3000/', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '55514837d923153e50c77dfcb98751e00b8cb6a73eda8444c6d01ce17227c44c', 'successfully', '2021-10-17 05:17:38', '2021-10-17 05:17:38'),
(21, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1634422828', '0', '1634422828', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/', 'http://localhost:3000/', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '1515cd6af5ab89cd2738915df75986237fcf88d21858897859ac6d6ea309b21c', 'unsuccessful', '2021-10-17 05:20:28', '2021-10-17 05:20:28'),
(22, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1634422842', '0', '1634422842', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/', 'http://localhost:3000/', 'vi', 'merchantName=MoMo Partner', 'captureWallet', 'cc9ad680f5d2715c2b7ce6366d5430d895606b86b8e14bab0ccc2a3faad0c897', 'unsuccessful', '2021-10-17 05:20:42', '2021-10-17 05:20:42'),
(23, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1634423942', '400000', '1634423942', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000', 'http://localhost:3000', 'vi', 'merchantName=MoMo Partner', 'captureWallet', 'c79146a3b55054852d56e09ff75607e1e325a2e02dc57ab68a39416c577d292e', 'successfully', '2021-10-17 05:39:02', '2021-10-17 05:39:02'),
(24, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1634425010', '400000', '1634425010', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment', 'http://localhost:3000/check-result-payment', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '3f3e06a13d373be9ee6b43a1e37be09ca588fae59bc9a5fb855f19996be1b71d', 'successfully', '2021-10-17 05:56:50', '2021-10-17 05:56:50'),
(25, 7, 'MOMOBKUN20180529', 'Test', 'MomoTestStore', '1634436437', '800000', '1634436437', 'atm', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment', 'http://localhost:3000/check-result-payment', 'vi', '', 'payWithATM', 'e4b776c610029abe690bf6456626e0a368eb43e384838c35bdc3fc0150554195', 'unsuccessful', '2021-10-17 09:07:17', '2021-10-17 09:07:17'),
(26, 7, 'MOMOBKUN20180529', 'Test', 'MomoTestStore', '1634467412', '900000.8', '1634467412', 'atm', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment', 'http://localhost:3000/check-result-payment', 'vi', '', 'payWithATM', '96054ed230e5ebb2fc5cffa8ddbff133a65988265806bcdbf4756deda3ec041e', 'unsuccessful', '2021-10-17 17:43:32', '2021-10-17 17:43:32'),
(27, 7, 'MOMOBKUN20180529', 'Test', 'MomoTestStore', '1634467441', '100000.8', '1634467441', 'atm', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment', 'http://localhost:3000/check-result-payment', 'vi', '', 'payWithATM', '5a4d39e5af274b7e4a10a3c55a99b3c235d1cd90043d0df5df88d6c4a9ef74ca', 'unsuccessful', '2021-10-17 17:44:01', '2021-10-17 17:44:01'),
(28, 7, 'MOMOBKUN20180529', 'Test', 'MomoTestStore', '1634467455', '100000.8', '1634467455', 'atm', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment', 'http://localhost:3000/check-result-payment', 'vi', '', 'payWithATM', '322d5ccc7eadb25e3cdca01506f7fff27d2b9b74535c668ba8df786a37eb1993', 'unsuccessful', '2021-10-17 17:44:15', '2021-10-17 17:44:16'),
(29, 7, 'MOMOBKUN20180529', 'Test', 'MomoTestStore', '1634467577', '10000', '1634467577', 'atm', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment', 'http://localhost:3000/check-result-payment', 'vi', '', 'payWithATM', 'dcfb5bee7e74ee3e4c8941cb8166f5c125af685d00c9d044ca901fba67d0bf39', 'unsuccessful', '2021-10-17 17:46:18', '2021-10-17 17:46:18'),
(30, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1634467629', '100000.8', '1634467629', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment', 'http://localhost:3000/check-result-payment', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '6801ad376080a51a903da2d7dfc6bc2331db985a452e850de2301fd1fe96e37c', 'unsuccessful', '2021-10-17 17:47:09', '2021-10-17 17:47:09'),
(31, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1634467656', '10000', '1634467656', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment', 'http://localhost:3000/check-result-payment', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '95050aeaab397c335b432e5ae30d43ae25855a50fb5f638e228dbadcefd01c62', 'unsuccessful', '2021-10-17 17:47:36', '2021-10-17 17:47:36'),
(32, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635146613', '1000', '1635146613', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment', 'http://localhost:3000/check-result-payment', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '7f16ba77db688aa83e783a155087180214ffc051c99e96143e75ea8aec7ed353', 'unsuccessful', '2021-10-25 14:23:33', '2021-10-25 14:23:33'),
(33, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635152110', '1000', '1635152110', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment', 'http://localhost:3000/check-result-payment', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '0d94377327a44e5653dc6f5aa0ce8bc9a51637f04e7f078929fc71d6ab3d2659', 'unsuccessful', '2021-10-25 15:55:10', '2021-10-25 15:55:10'),
(34, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635152274', '1000', '1635152274', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '36c038b7d2295d4131cef27260cfeb52f48e706d7a04990a21ca14434ad0ea6e', 'successfully', '2021-10-25 15:57:54', '2021-10-25 15:57:54'),
(35, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635153243', '1000', '1635153243', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '7ca0dadd6d59cfd82c89e16ecaba73afbc55dad861839bbac28ed8f8c6b2eb5c', 'successfully', '2021-10-25 16:14:03', '2021-10-25 16:14:03'),
(36, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635158857', '1000', '1635158857', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '27b4442c782e0804721b07ab72e95e692c508f55d6b2f85d3feeaee53ec59fb2', 'successfully', '2021-10-25 17:47:37', '2021-10-25 17:47:37'),
(37, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635160714', '1000', '1635160714', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', 'fb1c45b3c07054b7ad7a51d47114ea6fe615d799069a620196a4f4c3620d2400', 'unsuccessful', '2021-10-25 18:18:34', '2021-10-25 18:18:34'),
(38, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635160715', '1000', '1635160715', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', 'cc28f48e0334cdbded8e0f75f7d0963116fce1443ecdc6e6bb1d23c3acbf60bb', 'unsuccessful', '2021-10-25 18:18:35', '2021-10-25 18:18:35'),
(39, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635385373', '10000', '1635385373', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '26e3d8be049eb9609b033103b84d7131dbc4fbee33004ab1eb9487649070dbeb', 'unsuccessful', '2021-10-28 08:42:53', '2021-10-28 08:42:53'),
(40, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635388685', '10000', '1635388685', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', 'ed3e0c5f99bdf97a16bd6800d11a17ced7fd19635b8dc6d63cffc9c2a149f91f', 'unsuccessful', '2021-10-28 09:38:05', '2021-10-28 09:38:05'),
(41, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635388982', '10000', '1635388982', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', 'fe62a4c74c60e9487a70e01973e89b095c32b331f5fed8f1e418601a418f943e', 'unsuccessful', '2021-10-28 09:43:02', '2021-10-28 09:43:02'),
(42, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635388983', '10000', '1635388983', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '41c016e654e08792095573c038423a05556f3066bbfc00e50a87515373e4fefb', 'unsuccessful', '2021-10-28 09:43:03', '2021-10-28 09:43:03'),
(43, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635389032', '10000', '1635389032', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '8d6d379b8fb6348e592967cb0e5d58409ea87faf4bc88e537e3fb1a6f053823c', 'unsuccessful', '2021-10-28 09:43:52', '2021-10-28 09:43:52'),
(44, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635389068', '10000', '1635389068', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '315b21143632b71cecbf28bd42d8914cce730047eafe50a8ad44734524b709b2', 'unsuccessful', '2021-10-28 09:44:28', '2021-10-28 09:44:28'),
(45, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635400543', '10000', '1635400543', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '02ee63c5d08d10e881fbe5e9fae648d784dc51a98de2a94f4d2c76b1307de5b3', 'unsuccessful', '2021-10-28 12:55:43', '2021-10-28 12:55:43'),
(46, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635413578', '10000', '1635413578', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '8342d2df113711087d80bf356591450aec8e3861a309f874e012d36424ec40b6', 'unsuccessful', '2021-10-28 16:32:58', '2021-10-28 16:32:58'),
(47, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635475720', '10000', '1635475720', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', 'f14b272ae4f97cfc3542173c44f0479ef0ae80881c93b9636e96c2707c279951', 'unsuccessful', '2021-10-29 09:48:40', '2021-10-29 09:48:40'),
(48, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635482864', '10000', '1635482864', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '155817aed9bfe4952d1c8fbdb120d9504575279af71f0d99c261d3445ef9a085', 'unsuccessful', '2021-10-29 11:47:44', '2021-10-29 11:47:44'),
(49, 7, 'MOMO282120210723', 'Nguyễn Đặng Kiều Ly', 'MomoTestStore', '1635482865', '10000', '1635482865', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', '1dfda4941a81b85dc39e6000c10d09dc70d0d52afdd4f011644c996f3cb52d4c', 'unsuccessful', '2021-10-29 11:47:45', '2021-10-29 11:47:45'),
(50, 4, 'MOMO282120210723', 'vatli365', 'MomoTestStore', '1636190578', '10000', '1636190578', 'qr', 'Thanh toán qua MoMo', 'http://localhost:3000/check-result-payment-exam', 'http://localhost:3000/check-result-payment-exam', 'vi', 'merchantName=MoMo Partner', 'captureWallet', 'a04152f02716d251479caef5c74ac5bd50c7cd76ff379f44ffb6f874653bc260', 'unsuccessful', '2021-11-06 16:22:58', '2021-11-06 16:22:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `file` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `type_id`, `name`, `description`, `file`, `path`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 5, 'new 1', 'nguyen thi thang', '2nd year Internship_report.docx', 'upload\\images\\new', '00e8ad267f20b67eef312.jpg', 'Active', '2021-10-06 14:56:29', '2021-10-06 14:56:29'),
(2, 5, 'new 1', 'nguyen thi thang', '2nd year Internship_report.docx', 'upload\\images\\new', '00e8ad267f20b67eef312.jpg', 'Active', '2021-10-06 15:00:54', '2021-10-06 15:00:54'),
(3, 5, 'new 12', 'nguyen thi thang', '[PNV22B-Nguyen Thi Thang]_2nd year Internship_report.pdf', 'upload\\images\\new', '00e8ad267f20b67eef312.jpg', 'Active', '2021-10-06 15:03:41', '2021-10-06 15:03:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news_type`
--

CREATE TABLE `news_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `news_type`
--

INSERT INTO `news_type` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(5, 'ôn luyện thi tốt nghiệp', 'Active', '2021-10-06 00:01:46', '2021-10-06 00:11:19'),
(6, 'khóa học ôn thi 12', 'Active', '2021-10-06 00:02:08', '2021-10-06 00:02:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `question_answer`
--

CREATE TABLE `question_answer` (
  `id` int(11) NOT NULL,
  `id_question` int(11) NOT NULL,
  `id_exam` int(11) NOT NULL,
  `type_answer` varchar(225) NOT NULL,
  `answer` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `question_answer`
--

INSERT INTO `question_answer` (`id`, `id_question`, `id_exam`, `type_answer`, `answer`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'A', 'Đáp án A', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(2, 1, 1, 'B', 'Đáp án B', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(3, 1, 1, 'C', 'Đáp án C', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(4, 1, 1, 'D', 'Đáp án D', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(5, 2, 1, 'A', 'Đáp án A', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(6, 2, 1, 'B', 'Đáp án B', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(7, 2, 1, 'C', 'Đáp án C', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(8, 2, 1, 'D', 'Đáp án D', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(9, 11, 2, 'A', 'Đáp án A', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(10, 11, 2, 'B', 'Đáp án B', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(11, 11, 2, 'C', 'Đáp án C', '2021-10-05 16:24:20', '2021-10-05 16:24:20'),
(12, 11, 2, 'D', 'Đáp án D', '2021-10-05 16:24:20', '2021-10-05 16:24:20');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `table_of_content`
--

CREATE TABLE `table_of_content` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` int(11) NOT NULL,
  `status` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `table_of_content`
--

INSERT INTO `table_of_content` (`id`, `name`, `course_id`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Table content 2', 2, 'Active', '2021-10-03 00:00:00', '2021-10-03 00:00:00'),
(4, 'Table Content 4', 3, 'Active', '2021-10-05 16:37:24', '2021-10-05 16:38:07'),
(6, 'table 2 of khoa học có id 4', 3, 'Active', '2021-10-11 21:40:50', '2021-10-11 21:40:50'),
(7, 'Table Content 4', 4, 'Active', '2021-10-11 22:42:08', '2021-10-11 22:51:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skype` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `youtube` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `teacher`
--

INSERT INTO `teacher` (`id`, `name`, `position`, `image`, `description`, `phone`, `facebook`, `skype`, `youtube`, `created_at`, `updated_at`) VALUES
(1, 'Hà Mộng Khang', 'Giáo viên Vật Lý', 'image_avatar.jfif', 'Tận Tâm - Nhiệt Huyết - Vui Vẻ', '0396498891', 'https://www.facebook.com/mongkhang.ha/', 'https://www.facebook.com/mongkhang.ha/', 'https://www.facebook.com/mongkhang.ha/', '2021-10-04 17:00:16', '2021-10-04 17:00:16'),
(2, 'Nguyễn Đình Kha', 'Giáo viên Vật Lý', 'image_avatar.jfif', 'Tận Tâm - Nhiệt Huyết - Vui Vẻ', '0396498891', 'https://www.facebook.com/mongkhang.ha/', 'https://www.facebook.com/mongkhang.ha/', 'https://www.facebook.com/mongkhang.ha/', '2021-10-04 17:01:29', '2021-10-04 17:01:29'),
(3, 'Nguyễn Hồng Quân', 'Giáo viên Vật Lý', 'image_avatar.jfif', 'Tận Tâm - Nhiệt Huyết - Vui Vẻ', '0396498891', 'https://www.facebook.com/mongkhang.ha/', 'https://www.facebook.com/mongkhang.ha/', 'https://www.facebook.com/mongkhang.ha/', '2021-10-04 17:01:39', '2021-10-04 17:01:39'),
(4, 'Nguyễn Thị Thắng', 'Giáo viên Vật Lý', 'image_avatar.jfif', 'Tận Tâm - Nhiệt Huyết - Vui Vẻ', '0396498891', 'https://www.facebook.com/mongkhang.ha/', 'https://www.facebook.com/mongkhang.ha/', 'https://www.facebook.com/mongkhang.ha/', '2021-10-04 17:01:48', '2021-10-04 17:01:48'),
(5, 'Trần Văn Phát', 'Giáo viên Vật Lý', 'image_avatar.jfif', 'Tận Tâm - Nhiệt Huyết - Vui Vẻ', '0396498891', 'https://www.facebook.com/mongkhang.ha/', 'https://www.facebook.com/mongkhang.ha/', 'https://www.facebook.com/mongkhang.ha/', '2021-10-04 17:01:57', '2021-10-04 17:01:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fullName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_id` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT current_timestamp(),
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nameAccount` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `linkFB` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` datetime NOT NULL,
  `sex` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `is_online` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `provider`, `provider_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `avatar`, `nameAccount`, `linkFB`, `phone`, `address`, `birthday`, `sex`, `status`, `is_admin`, `is_online`) VALUES
(1, 'Hà Mộng Khang', 'user1@gmail.com', '', '', '2021-10-16 19:13:52', '$2y$10$4jTJHY9wVDOaquH5gzNCnuMN2ioxwEn4f3gFk8LK12mMaF8OscJBa', NULL, '2021-09-14 03:32:00', '2021-11-02 05:46:05', 'male_avatar.jpg', 'User1', 'http://facebook.com.aaaaa', '123456789', 'Binh Dinh', '2021-09-12 07:07:02', 'male', 'Block', 0, 0),
(2, 'Hà Mộng Khang', 'user5@gmail.com', '', '', '2021-10-16 19:13:52', '$2y$10$Zr.BwJipoJeAm7GfC5KR8OEb/hokHNE1hUhgL6rKeS40eeNdwF30K', NULL, '2021-09-14 03:42:04', '2021-11-02 04:51:15', 'male_avatar.jpg', 'User5', 'http://facebook.com.aaaaa', '123456789', 'Binh Dinh', '2021-09-12 07:07:02', 'male', 'Active', 0, 0),
(3, 'User', 'an@gmail.com', '', '', '2021-10-16 19:13:52', '$2y$10$HZj7KT0fdSAB8KGgnY16NuHnjYhV80ycF78nQ/wt8kUtldWV/YRa.', NULL, '2021-09-16 19:47:16', '2021-11-02 05:11:10', 'female_avatar.jpg', 'User', 'fb', '915810375', '!', '2021-09-30 00:00:00', 'female', 'Block', 0, 0),
(4, 'vatli365', 'web.vatly365@gmail.com', '', '', '2021-10-16 19:13:52', '$2y$10$M6f0ns9EKKj9smpBiJB/r..PrsfDpWHZvl6l3E4wGGxNBUa34nasK', NULL, '2021-10-04 03:13:57', '2021-10-04 03:13:57', 'male_avatar.jpg', 'Admin', 'https://www.facebook.com/groups/867025087270480/', '396498891', 'Bình Định', '2001-09-30 01:07:19', 'male', 'Active', 1, 0),
(5, 'Hoài An', 'nguyenthithang09001@gmail.com', '', '', '2021-10-16 19:13:52', '$2y$10$Ya7mpjI5hfHKe35fYRZiR.shsfmwj8akNWQ9ac5tNeAd9z4cVCvE2', NULL, '2021-10-04 03:41:02', '2021-10-15 19:24:40', 'tải xuống (1).jfif', 'Thắng', 'https://www.facebook.com/profile.php?id=100031067407528', '0915810375', 'Quảng Bình', '2001-09-08 00:00:00', 'female', 'Active', 0, 0),
(7, 'Nguyễn Đặng Kiều Ly', 'khang.ha22@student.passerellesnumeriques.org', '', '', '2021-10-16 19:13:52', '$2y$10$UY.OIqqQ4YNh8IrFXGInauMG58BYjTnTNAfq1Z7HUOo5bhtCxJ41.', NULL, '2021-10-05 20:42:16', '2021-10-16 04:06:35', '122274710_2825324694418934_5549275639569943818_n.jpg', 'undefined', 'https://www.facebook.com/', '0396498891', 'Thuận Truyền, Bình Thuận, Tây Sơn, Bình Định', '2001-03-24 00:00:00', 'female', 'Active', 1, 0),
(8, 'user8830725', 'email8830725', '', '', '2021-10-16 19:13:52', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '2021-10-06 19:30:33', '2021-10-06 19:30:33', NULL, 'user8830725', 'linkFB', '12345678', 'address', '2021-10-06 09:30:33', 'male', 'status', 0, 0),
(9, 'user7428112', 'email7428112', '', '', '2021-10-16 19:13:52', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '2021-10-06 21:21:27', '2021-10-06 21:21:27', NULL, 'user7428112', 'linkFB', '12345678', 'address', '2021-10-06 11:21:27', 'male', 'status', 0, 0),
(10, 'user2093746', 'email2093746', '', '', '2021-10-16 19:13:52', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '2021-10-06 21:21:35', '2021-10-06 21:21:35', NULL, 'user2093746', 'linkFB', '12345678', 'address', '2021-10-06 11:21:35', 'male', 'status', 0, 0),
(11, 'user3113747', 'email3113747', '', '', '2021-10-16 19:13:52', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '2021-10-06 21:23:15', '2021-11-02 12:56:16', NULL, 'user3113747', 'linkFB', '12345678', 'address', '2021-10-06 11:23:15', 'male', 'Active', 0, 0),
(12, 'user2160119', 'email2160119', '', '', '2021-10-16 19:13:52', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '2021-10-06 23:40:49', '2021-11-02 12:29:57', NULL, 'user2160119', 'linkFB', '12345678', 'address', '2021-10-06 13:40:49', 'male', 'Active', 0, 0),
(44, 'Nguyen Thi Thang', 'thang.nguyen22@student.passerellesnumeriques.org', 'google', '116636803061916851107', '2021-10-16 19:13:52', '$2y$10$I0DarOxEJCN6JQGfYFzAEuIQTS6GEMSn3SiebkM7tPlIFeQrIzPMy', NULL, '2021-10-16 00:18:30', '2021-10-15 20:12:00', 'https://lh3.googleusercontent.com/a-/AOh14GiV2cEUnQrE9icI8EPiF_ZrsJViFp2xi_prOtemSA=s96-c', 'Nguyen Thi Thang', 'account google', 'account google', 'account google', '2021-10-16 00:18:30', 'account google', 'Active', 0, 0),
(45, 'Nguyen Hong Quan', 'quan.nguyen22@student.passerellesnumeriques.org', 'google', '106119964213474839107', '2021-10-16 19:13:52', '$2y$10$dctJk68Z0ubN9oBs4Syu0.aSyhW3QY4u5ScjTLmnRcuXQRejohVAu', NULL, '2021-10-16 00:56:10', '2021-10-16 00:56:10', 'https://lh3.googleusercontent.com/a/AATXAJy09Kot-sYgxs5h5Einsgesg3O0gqDsjRimTc30=s96-c', 'Nguyen Hong Quan', 'account google', 'account google', 'account google', '2021-10-16 00:56:10', 'account google', 'Active', 0, 0),
(47, 'Hoài An', 'nguyenthithang092001@gmail.com', NULL, NULL, '2021-10-16 19:13:52', '$2y$10$EwOX7HIAM4UusqSjPgiTL.mJW/BTD09MKiliZyNajrd/oj6NQReoy', NULL, '2021-10-16 02:45:16', '2021-11-02 04:48:30', 'IMG_0107.JPG', 'nguyenthithang092001@gmail.com', 'https://www.facebook.com/profile.php?id=100031067407528', '0915810375', 'Quảng Bình', '2021-09-29 00:00:00', 'female', 'Active', 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_code`
--

CREATE TABLE `user_code` (
  `id` int(11) NOT NULL,
  `fullName` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameAccount` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `linkFB` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` datetime NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `user_code`
--

INSERT INTO `user_code` (`id`, `fullName`, `nameAccount`, `linkFB`, `phone`, `birthday`, `address`, `sex`, `email`, `password`, `code`, `created_at`, `updated_at`) VALUES
(6, 'Hà Mộng Khang', 'User', 'http://facebook.com.aaaaa', '0123456789', '2021-09-12 07:07:02', 'Binh Dinh', 'male', 'user3@gmail.com', '$2y$10$Z3gjiiGM5AlAheQenbFMU.LHisHQuMTpvmCzLxFpW17u5pdcyqubi', '40vTyc', '2021-10-16 19:13:52', '2021-09-13 23:25:32'),
(9, 'Hà Mộng Khang', 'User6', 'http://facebook.com.aaaaa', '0123456789', '2021-09-12 07:07:02', 'Binh Dinh', 'male', 'user6@gmail.com', '$2y$10$uJDi2W6IvjZWbnRN9to2NurBvMnfukI6pHyuCX9XqwqdxYTkHpKKy', 'KeuQOR', '2021-10-16 19:13:52', '2021-09-14 14:16:39'),
(12, 'Nguyễn Đình Long', 'LongShin', 'https://www.facebook.com/', '0396498891', '2001-07-26 00:00:00', 'Quảng Bình, Việt Nam', 'female', 'long.nguyen22@student.passerellesnumeriques.org', '$2y$10$OHmha0jadjYkVkSpbpTNluHWDgX7oL/1JGN30onduOoal8J84hWS2', 'AOQRe6', '2021-10-16 19:13:52', '2021-10-05 14:21:53'),
(16, 'Hoài An', 'Hoai An', 'https://www.facebook.com/profile.php?id=100031067407528', '0915810375', '2021-09-28 00:00:00', 'Quảng Bình', 'female', 'admin@gmail.com', '$2y$10$qnalGuJcGJdSj44zJZhWeOM9ONuaBKH3Rn3sintcPIx89SCdYtVPS', 'uXIlku', '2021-10-16 19:13:52', '2021-10-16 02:41:12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_course`
--

CREATE TABLE `user_course` (
  `id` int(11) NOT NULL,
  `id_payment` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user_course`
--

INSERT INTO `user_course` (`id`, `id_payment`, `userId`, `created_at`, `updated_at`) VALUES
(1, '1634422107', 7, '2021-10-17 05:10:26', '2021-10-17 05:10:26'),
(2, '1634422107', 7, '2021-10-17 05:12:42', '2021-10-17 05:12:42'),
(3, '1634422658', 7, '2021-10-17 05:18:23', '2021-10-17 05:18:23'),
(4, '1634423942', 7, '2021-10-17 05:39:34', '2021-10-17 05:39:34'),
(5, '1634423942', 7, '2021-10-17 05:50:18', '2021-10-17 05:50:18'),
(6, '1634423942', 7, '2021-10-17 05:50:25', '2021-10-17 05:50:25'),
(7, '1634423942', 7, '2021-10-17 05:50:25', '2021-10-17 05:50:25'),
(8, '1634423942', 7, '2021-10-17 05:50:55', '2021-10-17 05:50:55'),
(9, '1634423942', 7, '2021-10-17 05:51:43', '2021-10-17 05:51:43'),
(10, '1634423942', 7, '2021-10-17 05:51:43', '2021-10-17 05:51:43'),
(11, '1634423942', 7, '2021-10-17 05:51:56', '2021-10-17 05:51:56'),
(12, '1634425010', 7, '2021-10-17 05:58:17', '2021-10-17 05:58:17'),
(13, '1634425010', 7, '2021-10-17 07:46:16', '2021-10-17 07:46:16'),
(14, '1634425010', 7, '2021-10-17 07:46:44', '2021-10-17 07:46:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_exam`
--

CREATE TABLE `user_exam` (
  `id` int(11) NOT NULL,
  `id_payment` varchar(225) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_exam` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user_exam`
--

INSERT INTO `user_exam` (`id`, `id_payment`, `id_user`, `id_exam`, `created_at`, `updated_at`) VALUES
(1, '1635152274', 7, 1, '2021-10-25 15:57:54', '2021-10-25 15:57:54'),
(2, '1635153243', 7, 1, '2021-10-25 16:14:03', '2021-10-25 16:14:03'),
(3, '1635158857', 7, 1, '2021-10-25 17:47:37', '2021-10-25 17:47:37'),
(4, '1635160714', 7, 1, '2021-10-25 18:18:34', '2021-10-25 18:18:34'),
(5, '1635160715', 7, 1, '2021-10-25 18:18:35', '2021-10-25 18:18:35'),
(6, '1635385373', 7, 1, '2021-10-28 08:42:53', '2021-10-28 08:42:53'),
(7, '1635388685', 7, 3, '2021-10-28 09:38:05', '2021-10-28 09:38:05'),
(8, '1635388982', 7, 3, '2021-10-28 09:43:02', '2021-10-28 09:43:02'),
(9, '1635388983', 7, 3, '2021-10-28 09:43:03', '2021-10-28 09:43:03'),
(10, '1635389032', 7, 3, '2021-10-28 09:43:52', '2021-10-28 09:43:52'),
(11, '1635389068', 7, 3, '2021-10-28 09:44:28', '2021-10-28 09:44:28'),
(12, '1635400543', 7, 1, '2021-10-28 12:55:43', '2021-10-28 12:55:43'),
(13, '1635413578', 7, 1, '2021-10-28 16:32:58', '2021-10-28 16:32:58'),
(14, '1635475720', 7, 1, '2021-10-29 09:48:40', '2021-10-29 09:48:40'),
(15, '1635482864', 7, 1, '2021-10-29 11:47:44', '2021-10-29 11:47:44'),
(16, '1635482865', 7, 1, '2021-10-29 11:47:45', '2021-10-29 11:47:45'),
(17, '1636190578', 4, 1, '2021-11-06 16:22:58', '2021-11-06 16:22:58');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admin_account`
--
ALTER TABLE `admin_account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `banner_background`
--
ALTER TABLE `banner_background`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `book_type`
--
ALTER TABLE `book_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `category_course`
--
ALTER TABLE `category_course`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `comment_reply`
--
ALTER TABLE `comment_reply`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `exam_answer`
--
ALTER TABLE `exam_answer`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `exam_category`
--
ALTER TABLE `exam_category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `exam_question`
--
ALTER TABLE `exam_question`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `featured_post`
--
ALTER TABLE `featured_post`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `forgot_code`
--
ALTER TABLE `forgot_code`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `free_document`
--
ALTER TABLE `free_document`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `free_document_category`
--
ALTER TABLE `free_document_category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `itinteach`
--
ALTER TABLE `itinteach`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_user_id_foreign` (`user_id`),
  ADD KEY `messages_receiver_foreign` (`receiver`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `momoorderdetails`
--
ALTER TABLE `momoorderdetails`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news_type`
--
ALTER TABLE `news_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`(191));

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`(191),`tokenable_id`);

--
-- Chỉ mục cho bảng `question_answer`
--
ALTER TABLE `question_answer`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `table_of_content`
--
ALTER TABLE `table_of_content`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user_code`
--
ALTER TABLE `user_code`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user_course`
--
ALTER TABLE `user_course`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user_exam`
--
ALTER TABLE `user_exam`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admin_account`
--
ALTER TABLE `admin_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `banner_background`
--
ALTER TABLE `banner_background`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT cho bảng `book_type`
--
ALTER TABLE `book_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT cho bảng `category_course`
--
ALTER TABLE `category_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT cho bảng `comment_reply`
--
ALTER TABLE `comment_reply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `content`
--
ALTER TABLE `content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT cho bảng `exam`
--
ALTER TABLE `exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `exam_answer`
--
ALTER TABLE `exam_answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `exam_category`
--
ALTER TABLE `exam_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `exam_question`
--
ALTER TABLE `exam_question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `featured_post`
--
ALTER TABLE `featured_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `forgot_code`
--
ALTER TABLE `forgot_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `free_document`
--
ALTER TABLE `free_document`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `free_document_category`
--
ALTER TABLE `free_document_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `itinteach`
--
ALTER TABLE `itinteach`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `lesson`
--
ALTER TABLE `lesson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `momoorderdetails`
--
ALTER TABLE `momoorderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `news_type`
--
ALTER TABLE `news_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `question_answer`
--
ALTER TABLE `question_answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `table_of_content`
--
ALTER TABLE `table_of_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT cho bảng `user_code`
--
ALTER TABLE `user_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `user_course`
--
ALTER TABLE `user_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `user_exam`
--
ALTER TABLE `user_exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_receiver_foreign` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
