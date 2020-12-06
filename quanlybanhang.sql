--
-- Database: `quanlybanhang`
--

CREATE DATABASE IF NOT EXISTS quanlybanhang;
USE quanlybanhang;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `CatID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `CatName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`CatID`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`CatID`, `CatName`) VALUES
(1, 'Điện thoại'),
(2, 'Máy tính bảng');

-- --------------------------------------------------------

--
-- Table structure for table `manufacturers`
--

DROP TABLE IF EXISTS `manufacturers`;
CREATE TABLE IF NOT EXISTS `manufacturers` (
  `ManID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ManName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ManID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `manufacturers`
--

INSERT INTO `manufacturers` (`ManID`, `ManName`) VALUES
(1, 'Apple'),
(2, 'Samsung'),
(3, 'Oppo'),
(4, 'Sony'),
(5, 'Vivo'),
(6, 'Lenovo'),
(7, 'Masstel'),
(8, 'Huawei');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
CREATE TABLE IF NOT EXISTS `orderdetails` (
  `ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `OrderID` int(11) NOT NULL,
  `ProID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` bigint(20) NOT NULL,
  `Amount` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `OrderID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `OrderDate` datetime NOT NULL,
  `UserID` int(11) NOT NULL,
  `Total` bigint(20) NOT NULL,
  `State` int(1) NOT NULL,
  PRIMARY KEY (`OrderID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `ProID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ProName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `TinyDes` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `FullDes` text COLLATE utf8_unicode_ci NOT NULL,
  `Price` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Sold` int(11) NOT NULL,
  `ReceiveDate` date NOT NULL,
  `View` int(11) NOT NULL,
  `CatID` int(11) NOT NULL,
  `ManID` int(11) NOT NULL,
  `Origin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Active` int(1) NOT NULL,
  PRIMARY KEY (`ProID`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProID`, `ProName`, `TinyDes`, `FullDes`, `Price`, `Quantity`, `Sold`, `ReceiveDate`, `View`, `CatID`, `ManID`, `Origin`, `Active`) VALUES
(1, 'iPhone X 64GB', 'iPhone X mang trên mình thiết kế hoàn toàn mới với màn hình Super Retina viền cực mỏng và trang bị nhiều công nghệ hiện đại như nhận diện khuôn mặt Face ID, sạc pin nhanh và sạc không dây cùng khả năng chống nước bụi cao cấp', '', 29990000, 50, 10, '2018-06-23', 0, 1, 1, 'Trung Quốc', 1),
(2, 'Samsung Galaxy S9+', 'Samsung Galaxy S9 Plus 128GB Hoàng Kim, siêu phẩm smartphone hàng đầu trong thế giới Android đã ra mắt với màn hình vô cực, camera chuyên nghiệp như máy ảnh và hàng loạt những tính năng cao cấp đầy hấp dẫn.', '', 23490000, 50, 22, '2018-06-23', 0, 1, 2, 'Hàn Quốc', 1),
(3, 'Oppo F7', 'Tiếp nối sự thành công của OPPO F5 thì OPPO tiếp tục tung ra OPPO F7 với điểm nhấn vẫn là camera selfie và thiết kế tai thỏ độc đáo.', '', 7990000, 100, 22, '2018-06-20', 0, 1, 3, 'Trung Quốc', 1),
(4, 'Sony Xperia XZ Premium', 'Sony Xperia XZ Premium là flagship của Sony trong năm 2017 với vẻ ngoài hào nhoáng, màn hình cao cấp cũng nhiều trang bị hàng đầu khác.', '', 17990000, 110, 15, '2018-06-02', 0, 1, 4, 'Nhật Bản', 1),
(5, 'Vivo V9', 'Vivo V9 là chiếc smartphone tầm trung cận cao cấp với điểm nhấn là máy có camera kép phía sau và camera selfie độ phân giải cao 24 MP.', '', 29990000, 60, 30, '2018-06-23', 0, 1, 5, 'Trung Quốc', 1),
(6, 'Lenovo Tab 3 A8 ZA180001', 'Hãng Lenovo được nhiều biết đến với các thiết bị có dung lượng pin siêu khủng, máy tính bảng Lenovo Tab 3 A8 ZA180001VN cũng không ngoại lệ. Sở hữu viên pin dung lượng lớn 4290mAh, máy tính bảng Lenovo Tab 3 A8 ZA180001VN cho thời gian sử dụng dài hơn các tablet cùng giá khác, thích hợp với người thường xuyên di chuyển nhiều hay những bạn trẻ thích chơi game.', '', 3190000, 30, 11, '2018-06-02', 0, 2, 6, 'Trung Quốc', 1),
(7, 'Masstel Tab 10', 'Masstel Tab 10 máy tính bảng có thiết kế gọn nhẹ, màn hình lớn hiển thị sắc nét đến từng chi tiết. Và máy có 2 sim 2 sóng giúp bạn nghẹ gọi như 1 smartphone rất tiện lợi. Camera thông minh cùng hiệu năng hoạt động ổn định trong ngày. Đem đến cho người dùng sự tiện lợi và đỉnh cao giải trí đa phương tiện.', '', 2790000, 50, 15, '2018-06-02', 0, 2, 7, 'Trung Quốc', 1),
(8, 'Huawei MediaPad M3 8.0', 'Huawei MediaPad M3 8.0 là mẫu máy tính bảng chủ lực của Huawei trong năm 2017 với điểm nhấn là cấu hình mạnh mẽ cùng hệ thống âm thanh được đầu tư kỹ lưỡng.', '', 5990000, 70, 26, '2018-06-01', 0, 2, 8, 'Trung Quốc', 1),
(9, 'Samsung Galaxy Tab E 9.6', 'Samsung Galaxy Tab E 9.6 là một sự lựa chọn cho bạn thích một chiếc máy có màn hình lớn để giải trí thoải mái hơn nhưng cấu hình không quá thấp.', '', 5490000, 50, 36, '2018-05-30', 0, 2, 2, 'Hàn Quốc', 1),
(10, 'iPad Pro 12.9 Wifi 4G 512GB', 'iPad Pro 12.9 phiên bản mới 2017 cung cấp thông số kỹ thuật được cải tiến đáng kể, bao gồm một màn hình lên đến 12.9 inch mới với một tốc độ tốc độ phản hồi nhanh hơn và hỗ trợ tốt hơn Apple Pencil. Hiệu suất cũng được nâng cấp mới so với các model trước', '', 32990000, 51, 33, '2018-05-29', 0, 2, 1, 'Hàn Quốc', 1),
(11, 'iPhone 8 Plus 64GB', 'iPhone 8 Plus 64Gb đã thay đổi về mặt thiết kế so với những đời iPhone cũ: mặt sau đã chuyển sang chất liệu kính bo cong 2.5D đẹp mắt hơn, loại bỏ viền ăng-ten, bộ khung kim loại cứng cáp hơn cùng với 7 lớp xử lý màu tăng mạnh khả năng chống trầy xước', '', 23990000, 52, 22, '2018-05-28', 0, 1, 1, 'Trung Quốc', 1),
(12, 'iPhone 8 64GB', 'iPhone 8 64GB nổi bật với điểm nhấn mặt lưng kính kết hợp cạnh viền và mặt trước giữ nguyên thiết kế như iPhone 7, cùng với đó là hàng loạt công nghệ đáng mong đợi như sạc nhanh, không dây hay hỗ trợ thực tế ảo AR.iPhone 8 64GB nổi bật với điểm nhấn mặt lưng kính kết hợp cạnh viền và mặt trước giữ nguyên thiết kế như iPhone 7, cùng với đó là hàng loạt công nghệ đáng mong đợi như sạc nhanh, không dây hay hỗ trợ thực tế ảo AR.', '', 20990000, 53, 3, '2018-05-27', 0, 1, 1, 'Trung Quốc', 1),
(13, 'iPhone 7 Plus 32GB', 'iPhone 7 Plus dường như là sản phẩm được Apple chăm chút để vượt xa iPhone 7, trở thành sản phẩm rất đáng để nâng cấp so với iPhone 6s Plus khi được nâng cấp thêm camera kép cùng chức năng chụp chân dung xoá phông cực hot', '', 19990000, 54, 23, '2018-05-26', 0, 1, 1, 'Trung Quốc', 1),
(14, 'iPhone 7 32GB', 'iPhone 7 dường như đã gay sốt ngay từ khi ra mắt bởi những nâng cấp đáng giá về tốc độ xử lý, khả năng chụp ảnh, tính năng chống nước, bụi hiện đại', '', 15990000, 55, 20, '2018-05-25', 0, 1, 1, 'Trung Quốc', 1),
(15, 'Samsung Galaxy S9', 'Siêu phẩm Samsung Galaxy S9 chính thức ra mắt mang theo hàng loạt cải tiến, tính năng cao cấp như camera thay đổi khẩu độ, quay phim siêu chậm 960 fps, AR Emoji... nhanh chóng gây sốt làng công nghệ.', '', 19990000, 56, 23, '2018-05-24', 0, 1, 2, 'Hàn Quốc', 1),
(16, 'Samsung Galaxy S8 Plus', 'Samsung Galaxy S8 Plus hiện đang là chuẩn mực smartphone về thiết kế trong tương lai. Sau nhiều ngày được sử dụng, mình xin chia sẻ những cảm nhận chi tiết nhất về chiếc Galaxy S8 Plus - thiết bị đang có doanh số đặt hàng khủng nhất hiện tại.', '', 17990000, 50, 21, '2018-05-23', 0, 1, 2, 'Hàn Quốc', 1),
(17, 'Samsung Galaxy S8', 'Galaxy S8 là siêu phẩm mới nhất được Samsung ra mắt vào ngày 29/3 với thiết kế nhỏ gọn hoàn toàn mới, màn hình vô cực viền siêu mỏng.', '', 15990000, 50, 29, '2018-05-22', 0, 1, 2, 'Hàn Quốc', 1),
(18, 'Samsung Galaxy Note 8', 'Galaxy Note 8 là niềm hy vọng vực lại dòng Note danh tiếng của Samsung với diện mạo nam tính, sang trọng. Trang bị camera kép xóa phông thời thượng, màn hình vô cực như trên S8 Plus, bút Spen với nhiều tính năng mới và nhiều công nghệ được Samsung ưu ái đem lên Note 8.', '', 22490000, 57, 22, '2018-05-21', 0, 1, 2, 'Hàn Quốc', 1),
(19, 'Oppp F5', 'Đặc điểm nổi bật của OPPO F5 6GB. Bộ sản phẩm chuẩn: Hộp, Sạc, Tai nghe, Sách hướng dẫn, Cáp, Cây lấy sim, Ốp lưng OPPO F5 6GB là phiên bản nâng cấp cấu hình của chiếc OPPO F5, chuyên gia selfie làm đẹp thông minh và màn hình tràn viền tuyệt đẹp.', '', 6990000, 58, 26, '2018-05-20', 0, 1, 3, 'Trung Quốc', 1),
(20, 'Oppo F3', 'Cuối cùng thì mẫu chuyên gia selfie mới OPPO F3 cũng đã chính thức được trình làng với cụm camera trước kép trang bị nhiều tính năng selfie tuyệt vời hứa hẹn sẽ đem đến trải nghiệm đáng giá cho người dùng.', '', 4990000, 59, 50, '2018-04-28', 0, 1, 3, 'Trung Quốc', 1),
(21, 'Oppo F1s', 'OPPO F1s sẽ là chiếc điện thoại được OPPO giới thiệu tại Việt Nam nhằm đánh vào sở thích selfie của giới trẻ với điểm nhấn là camera trước có độ phân giải lên tới 16 MP.', '', 4990000, 60, 30, '2018-04-27', 0, 1, 3, 'Trung Quốc', 1),
(22, 'Oppo A83', 'OPPO A83 là chiếc smartphone dòng A đầu tiên sở hữu cho mình màn hình tràn viền và cùng với đó là camera với khả năng làm đẹp bằng AI nổi tiếng của OPPO.', '', 4990000, 61, 31, '2018-04-26', 0, 1, 3, 'Trung Quốc', 1),
(23, 'Sony Xperia XZ1', 'Sony Xperia XZ1 là mẫu flagship kế tiếp của Sony tiếp nối sự thành công của chiếc Xperia XZs đã ra mắt trước đó với những nâng cấp nhẹ về mặt cấu hình và thiết kế.', '', 13990000, 62, 25, '2018-04-25', 0, 1, 4, 'Nhật Bản', 1),
(24, 'Sony Xperia XA Ultra', 'Sony Xperia XA Ultra sở hữu màn hình lớn cùng camera trước có độ phân giải cao cùng nhiều tính năng cao cấp.', '', 6990000, 63, 32, '2018-04-24', 0, 1, 4, 'Nhật Bản', 1),
(25, 'Sony Xperia XZs', 'Sony Xperia XZs là smartphone được Sony đầu tư mạnh mẽ về camera với hàng loạt các trang bị cao cấp và sở hữu cho mình một mức giá bán hợp lý với người tiêu dùng.', '', 9990000, 64, 30, '2018-04-23', 0, 1, 4, 'Nhật Bản', 1),
(26, 'Sony Xperia L1 Dual', 'Sony Xperia L1 Dual với màn hình lớn 5.5 inch, cấu hình phù hợp và đặt biêt nằm ở mức giá rất vùa túi tiền, đây chắc chắn sẽ đánh dấu sự trở lại của Sony trong thị trường điện thoại thông minh tại Việt Nam.', '', 3590000, 65, 23, '2018-04-22', 0, 1, 4, 'Nhật Bản', 1),
(27, 'Vivo V7+', 'Vivo V7 Plus là chiếc smartphone mang tính cách mạng của Vivo với phần viền màn hình siêu mỏng cùng cụm camera độ phân giải siêu lớn 24 MP ở mặt trước ấn tượng.', '', 7990000, 66, 33, '2018-04-21', 0, 1, 5, 'Trung Quốc', 1),
(28, 'Vivo 5S', 'Vivo Xplay 5S là dòng điện thoại được đánh giá thuộc phân khúc cao cấp với cấu hình có thể xem là hàng đầu thời điểm hiện tại. Điểm đáng chú ý ở đây là sản phẩm có thiết kế tựa như chiếc iPhone 6s Plus của Apple.', '', 6690000, 67, 33, '2018-04-20', 0, 1, 5, 'Trung Quốc', 1),
(29, 'Vivo Y69', 'Vivo Y69 là mẫu smartphone thuộc phân khúc tầm trung của Vivo với thiết kế thời trang, camera selfie độ phân giải lớn đón đầu xu thế tự sướng của giới trẻ.', '', 5490000, 68, 36, '2018-04-19', 0, 1, 5, 'Trung Quốc', 1),
(30, 'Vivo Y55', 'Vivo Y55 có thiết kế khá quen thuộc của Vivo cho các smartphone giá rẻ của họ trong năm 2017 với thiết kế nguyên khối sang trọng, các góc cạnh bo cong mềm mại.', '', 3990000, 70, 26, '2018-04-18', 0, 1, 5, 'Trung Quốc', 1),
(31, 'Lenovo Tab 3 A8 ZA180071', 'Vẻ ngoài thời trang, trẻ trung, cấu hình hoạt động mạnh mẽ so với tầm giá, máy tính bảng Lenovo Tab 3 A8 ZA180071VN là tablet được giới văn phòng và học sinh, sinh viên yêu thích. Thêm vào đó, dung lượng pin khủng cho thời gian sử dụng dài. Bộ nhớ trong dung lượng 16GB, máy tính bảng Lenovo Tab 3 A8 ZA180071VN để người dùng lưu trữ được nhiều dữ liệu.', '', 3190000, 30, 26, '2018-04-17', 0, 2, 6, 'Trung Quốc', 1),
(32, 'Lenovo Tab 3 710I MT8321', 'Lenovo Tab 3 710I MT8321 trang bị một màn hình IPS kích thước 7 inches cùng khe gắn Micro Sim, máy tính bảng Lenovo Tab 3 710I MT8321 có khả năng đàm thoại, kết nối 3G, 4G để bạn có những trải nghiệm thú vị khi thực hiện các cuộc gọi trên màn hình lớn', '', 2190000, 30, 25, '2018-04-16', 0, 2, 6, 'Trung Quốc', 1),
(33, 'Lenovo Tab 3 730X ZA130063', 'Lenovo Tab 3 730X ZA130063 là dòng máy tính bảng phổ thông tầm trung phù hợp với những khách hàng như học sinh, sinh viên. Tuy là thiết bị tầm trung nhưng cấu hình của chiếc máy tính bảng Lenovo Tab 3 730X ZA130063VN rất ổn để lướt web, chơi game liên tục trong nhiều giờ. Thiết kế hiện đại tôn lên được vẻ sang trọng cho người sử dụng.', '', 2290000, 30, 19, '2018-04-15', 0, 2, 6, 'Trung Quốc', 1),
(34, 'Lenovo Tab 3 730X ZA130086', 'Lenovo Tab 3 730X ZA130086 có thiết kế đơn giản nhưng đầy tiện ích khi sử dụng', '', 2290000, 30, 16, '2018-04-15', 0, 2, 6, 'Trung Quốc', 1),
(35, 'Masstel Tab 8', 'Masstel Tab 8 Máy tính bảng có thiết kế gọn nhẹ, màn hình lớn hiển thị sắc nét đến từng chi tiết. Và máy có 2 sim 2 sóng giúp bạn nghẹ gọi như 1 smartphone rất tiện lợi. Camera thông minh cùng hiệu năng hoạt động ổn định trong ngày. Đem đến cho người dùng sự tiện lợi và đỉnh cao giải trí đa phương tiện.', '', 2290000, 50, 22, '2018-04-14', 0, 2, 7, 'Trung Quốc', 1),
(36, 'Masstel Tab 825', 'Masstel Tab 825 là mẫu máy tính bảng Android sở hữu thiết kế kim loại nguyên khối đẹp mắt, vi xử lý mạnh mẽ đến từ Intel và có mức giá hấp dẫn.', '', 2190000, 50, 40, '2018-04-14', 0, 2, 7, 'Trung Quốc', 1),
(37, 'Masstel Tab 7 LTE', 'Masstel Tab 7 LTE máy tính bảng có thiết kế gọn nhẹ, màn hình lớn hiển thị sắc nét đến từng chi tiết. Và máy có 2 sim 2 sóng giúp bạn nghẹ gọi như 1 smartphone rất tiện lợi. Camera thông minh cùng hiệu năng hoạt động ổn định trong ngày. Đem đến cho người dùng sự tiện lợi và đỉnh cao giải trí đa phương tiện.', '', 2090000, 50, 15, '2018-04-13', 0, 2, 7, 'Trung Quốc', 1),
(38, 'Masstel Tab 7', 'Masstel Tab 7 Máy tính bảng có thiết kế gọn nhẹ, màn hình lớn hiển thị sắc nét đến từng chi tiết. Và máy có 2 sim 2 sóng giúp bạn nghẹ gọi như 1 smartphone rất tiện lợi. Camera thông minh cùng hiệu năng hoạt động ổn định trong ngày. Đem đến cho người dùng sự tiện lợi và đỉnh cao giải trí đa phương tiện.', '', 1790000, 50, 25, '2018-04-12', 0, 2, 7, 'Trung Quốc', 1),
(39, 'Huawei MediaPad T3 10', 'Huawei MediaPad T3 10 (2017) là chiếc máy tính bảng với màn hình kích thước lớn cùng khe cắm sim tiện lợi giúp người dùng có thể nghe gọi như một chiếc smartphone, thiết kế mỏng, đẹp', '', 4990000, 70, 45, '2018-04-11', 0, 2, 8, 'Trung Quốc', 1),
(40, 'Huawei MediaPad T3 8.0', 'Huawei MediaPad T3 8.0, máy tính bảng giá rẻ có thẻ sim nghe gọi, nhắn tin thả ga, cấu hình 4 nhân giải trí tiện dụng đi kèm tích hợp sẵn Android 7.', '', 3990000, 70, 56, '2018-04-10', 0, 2, 8, 'Trung Quốc', 1),
(41, 'Huawei MediaPad T1 8.0', 'Huawei MediaPad T1-8 là tablet giá rẻ sở hữu màn hình 8 inch, cấu hình đáp ứng tốt các nhu cầu công việc và giải trí, hỗ trợ đàm thoại và truy cập internet di động tốc độ cao thông qua kết nối 3G, thiết kế trang nhã, thanh thoát', '', 2990000, 70, 59, '2018-04-09', 0, 2, 8, 'Trung Quốc', 1),
(42, 'Huawei MediaPad T1-701u', 'Huawei MediaPad T1-701u là mẫu tablet giá rẻ sở hữu kích thước màn hình 7 inch cùng khả năng hỗ trợ đàm thoại và kết nối 3G. Trong phân khúc giá 3 triệu đồng, đây là sự lựa chọn hợp lý cho những người dùng muốn trải nghiệm việc sử dụng máy tính bảng với chi phí thấp.', '', 2090000, 70, 63, '2018-04-08', 0, 2, 8, 'Trung Quốc', 1),
(43, 'Samsung Galaxy Tab A6 ', 'Samsung tiếp tục giới thiệu máy tính bảng Galaxy Tab A6 10.1 tại thị trường Việt Nam. Với cấu hình mạnh mẽ, màn hình chuẩn Full HD cùng thời lượng pin bền bỉ, máy tính bảng Galaxy Tab A6 10.1 xứng đáng là thiết bị giải trí đỉnh cao cho giới trẻ.', '', 7990000, 50, 32, '2018-04-07', 0, 2, 2, 'Hàn Quốc', 1),
(44, 'Samsung Galaxy Tab A 8.0', 'Samsung Galaxy Tab A 8.0 (2017) mới có màn hình tỉ lệ 4:3 với không gian hiển thị rộng thông minh cho người dùng.', '', 5490000, 50, 33, '2018-04-06', 0, 2, 2, 'Hàn Quốc', 1),
(45, 'Samsung Galaxy Tab A SM-T285', 'Samsung Galaxy Tab A SM-T285 rất thích hợp để sử dụng hỗ trợ công việc văn phòng và giải trí nếu bạn muốn chọn một chiếc tablet ở mức giá tầm trung.', '', 3590000, 50, 30, '2018-04-05', 0, 2, 2, 'Hàn Quốc', 1),
(46, 'Samsung Galaxy Tab A6 7.0', 'Samsung Galaxy Tab A6 7.0 với thiết kế vẫn mang vẻ truyền thống và cấu hình tốt, khả năng hiển thị cải thiện, cùng kết nối 4G.', '', 3590000, 50, 20, '2017-04-04', 0, 2, 2, 'Hàn Quốc', 1),
(47, 'iPad Pro 10.5 Wifi 64GB', 'Apple đã làm cho máy tính bảng của mình hoàn hảo hơn các model trước đây khi tinh chỉnh kể cả thiết kế, phần mềm và nâng cấp phần cứng trên iPad Pro 10.5 inch. Với cấu hình ấn tượng, màn hình sáng hơn, chip mạnh mẽ hơn và một tính năng ProMotion làm tăng tốc độ tươi của màn hình', '', 16990000, 51, 19, '2018-04-04', 0, 2, 1, 'Hàn Quốc', 1),
(48, 'iPad Air 2 Cellular 128GB', 'iPad Air 2 Cellular 128GB mang trong mình thiết kế sang trọng, bộ nhớ trong lớn cùng kết nối 3G/4G tiện lợi sẽ đáp ứng tốt cho bạn trong mọi nhu cầu sử dụng, thiết kế mỏng nhẹ', '', 15490000, 51, 15, '2018-04-04', 0, 2, 1, 'Hàn Quốc', 1),
(49, 'iPad Wifi Cellular 128GB', 'iPad Wifi Cellular 128GB là một trong những sản phẩm mới của Apple, với những điểm nâng cấp vô cùng sáng giá như: mỏng nhẹ, sang trọng, màn hình tuyệt đẹp, cấu hình mạnh mẽ, camera đẳng cấp, cùng nhiều chức năng khác', '', 14990000, 51, 16, '2018-04-03', 0, 2, 1, 'Hàn Quốc', 1),
(50, 'iPad Mini 4 Wifi 128GB', 'iPad mini 4 là sản phẩm tiếp nối của dòng iPad kích thước nhỏ đến từ Apple trong năm 2015. So với phiên bản tiền nhiệm iPad mini 3, thiết bị này đã có rất nhiều cải tiến, từ thiết kế mỏng gọn hơn, màn hình hiển thị tốt hơn, camera được nâng cấp và đặc biệt là con chip xử lý Apple A8 mang đến hiệu năng vượt trội', '', 10990000, 51, 16, '2018-04-03', 0, 2, 1, 'Hàn Quốc', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `f_ID` int(11) NOT NULL AUTO_INCREMENT,
  `f_Username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `f_Password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `f_Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `f_Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `f_DOB` date NOT NULL,
  `f_Permission` int(11) NOT NULL,
  PRIMARY KEY (`f_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`f_Username`, `f_Password`, `f_Name`, `f_Email`, `f_DOB`, `f_Permission`) VALUES
('admin', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'Administrator', 'admmin@gmail.com', '2000-1-1', 1);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
