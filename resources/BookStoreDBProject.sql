USE master
GO
IF db_id (N'BookStoreDBProject') is not null
	Drop database [BookStoreDBProject];
GO
Create database [BookStoreDBProject]
GO
USE [BookStoreDBProject]
GO
CREATE TABLE role(
	_id [nvarchar](100) PRIMARY KEY,
	name [nvarchar](100) NOT NULL
	)
GO
	insert into role values ('1', 'admin'),
							 ('2', 'user')
CREATE TABLE customer(
	_id [nvarchar](100) PRIMARY KEY,
	name [nvarchar](100) NOT NULL,
	email [nvarchar](100) NOT NULL UNIQUE,
	password [nvarchar](100) NOT NULL,
	role_id [nvarchar](100) FOREIGN KEY REFERENCES role(_id) DEFAULT '2',
	phone [nvarchar](100) NULL,
	address [nvarchar](500) NULL
	)
GO
	insert into customer values ('1','admin','admin@admin.com','admin','1','111111111','HCM'),
								('2','user','user@user.com','user','2','222222222','100, Hai Ba Chung, Ha Noi'),
								('3','manh','manh@gmail.com','manh','2','222222222','200, Cach Mang Thang 8, HCM'),
								('4','tuan','tuan@gmail.com','tuan','1','222222222','590, Cach Mang Thang 8, HCM'),
								('5','nghi','nghi@gmail.com','nghi','1','222222222','590, Cach Mang Thang 8, HCM')
GO
CREATE TABLE category(
	_id [nvarchar](100) PRIMARY KEY,
	name [nvarchar](500) NOT NULL
	)
GO
	insert into category values ('1','SCIENCE & MATHEMATICS'),
								('2','COMIC & MANGA'),
								('3','BUSINESS & ECONOMICS'),
								('4','SOCIOLOGY & PSYCHOLOGY'),
								('5','COMPUTER & PROGRAMMING'),
								('6','KIDS')
GO
CREATE TABLE product(
	_id [nvarchar](100) PRIMARY KEY,
	name [nvarchar](500) NOT NULL,
	category_id [nvarchar](100) FOREIGN KEY REFERENCES Category(_id),
	author [nvarchar](50) DEFAULT 'Unknow',
	price float NOT NULL,
	image [nvarchar](500) DEFAULT 'photo.png',
	description [nvarchar](1000) NULL,
	quantity [int] NOT NULL
	)
GO
	insert into product values ('1',N'Thám Tử Lừng Danh Conan - Tập 90','2','Gosho Aoyama',2,'CONAN.PNG',N'Sự thật nào sẽ được làm sáng tỏ đằng sau mối bất hòa giữa hai con người phục vụ công lí ở hai vị thế khác nhau - mật vụ FBI Akai và cảnh sát Amuro!? Cuộc phiêu lưu mới sẽ đưa độc giả đến gần hơn với Tổ chức Áo Đen, tiết lộ mối quan hệ giữa Sera và em gái ngoài lãnh địa!!',100),
								('2',N'One Piece - Tập 80','2','Eiichiro Oda',1.5,'ONE.PNG',N'Sau khi lên được tàu hỏa trên biển, Sanji đã hội ngộ Sogeking và Franky. Kế hoạch đoạt lại Robin bắt đầu. Nào ngờ trên tàu lại có những tay sát thủ lão luyện đang đợi họ. Trong khi đó, Luffy và những người khác vẫn đang tức tốc đuổi theo.',10),
								('3',N'Kết Giới Sư - Tập 5','2','Yellow Tanabe',1.5,'KET.PNG',N'500 năm trước, lãnh chúa Karasumori mang trong mình sức mạnh kì bí mà chính ông cũng không hay biết. Chính nguồn sức mạnh đó đã thu hút yêu ma quỷ quái đến quấy nhiễu cuộc sống của dân trong thành. Người dân đã phải mời một vị pháp sư đến để diệt trừ yêu quái. Vị pháp sư đó chính là sư tổ của hệ phái Hazama.',100),
								('4',N'Lucky Luke 33 - Hoàng Đế Smith','2','Marvel',2.5,'LUC.PNG',N'Rong ruổi khắp miền Viễn Tây và thường xuyên nhất là tại Texas, nghề chính của Lucky Luke là cao bồi (chăn dắt các đàn bò). Thỉnh thoảng, chàng cũng nhận làm người dẫn đường cho vài đoàn lữ hành, làm cảnh sát trưởng (hay thị trưởng) tạm thời, làm phái viên đặc biệt của Chính phủ và Quốc hội Hoa Kỳ, và kể cả vẫn phải thường xuyên truy lùng tứ quái Dalton luôn vượt ngục, để lại đưa chúng trở về trại giam,…',100),
								('5',N'Yu - Gi - Oh! - Vua Trò Chơi - Tập 10','2','Kazuki Takahashi',2,'YU.PNG',N'Yu - Gi - Oh! - Vua Trò Chơi - Tập 10 là câu chuyện về cậu bé Yugi – một học sinh trung học lớp 10 hay bị bạn bè bắt nạt – thường dành gần như toàn bộ thời gian của mình để chơi game một mình. Mọi chuyện bắt đầu thay đổi khi cậu giải được Trò Chơi Ngàn Năm, một linh vật bí ẩn của Ai Cập cổ đại.',100),
								('6',N'Marketing Hệ Não Đồ','3','David Lewis',11,'K1.PNG',N'Marketing Hệ Não Đồ được ca ngợi là "Những kẻ thuyết phục giấu mặt", là câu chuyện đằng sau những hiểu biết tiến bộ mau chóng của chúng ta về bộ não áp dụng vào quảng cáo, marketing, và công nghiệp bán lẻ như thế nào. Với việc khai thác Dữ liệu lớn lên ngôi, "kỹ nghệ thuyết phục" nổi bật hơn bao giờ hết. Tiến sĩ David Lewis, nhà nghiên cứu nổi tiếng quốc tế, đưa khoa học vào việc vẽ bản đồ mua sắm của bộ não và cơ thể để nghiên cứu những nhạy cảm trong hệ thần kinh của chúng ta và phát hiện cách chúng ta chọn lựa và mua sắm.',100),
								('7',N'Tại Sao Chúng Tôi Muốn Bạn Giàu','3','TIKI',9,'K2.PNG',N'Họ là những doanh nhân hàng đầu, có một không hai của thế giới, nổi tiếng và thành đạt. Họ khác nhau ở điểm xuất phát nhưng sẽ cùng nhau chỉ bạn điểm xuất phát cho sự giàu có bằng chính kinh nghiệm của họ. Từ quan niệm “cho người ta một con cá, và bạn nuôi sống anh ta một ngày. Dạy người ta câu cá, và bạn nuôi sống anh ta cả đời” hai nhà tỷ phú hàng đầu sẽ cho bạn thấy tại sao tiền bạc làm nên sự giàu có nhưng lại không giúp ta thoát khỏi sự nghèo khó.',100),
								('8',N'Những Tỷ Phú Tình Cờ','3',N'Johny Nguyễn',7,'K3.PNG',N'Cuốn sách tổng hợp và tóm tắt các góc nhìn, trăn trở, khó khăn, thành công, thất bại của những con người bình thường trên con đường xây dựng nên những công ty vĩ đại. Ít có cuốn sách nào cung cấp được một lượng lớn cảm hứng và kinh nghiệm khởi nghiệp thực tiễn như cuốn sách này. Nếu bạn muốn theo đuổi ước mơ thì đây là cuốn sách gối đầu giường.',100),
								('9',N'Phần Thưởng Lớn Hơn','3','Margaret Heffernan',12,'K4.PNG',N'Thi đỗ vào những ngôi trường tốt nhất. Giành giật lấy vị trí thăng tiến cao hơn trong công việc. Chạy nhanh hơn. Lao động miệt mài hơn. Không ngừng duy trì thành tích. Và dù có làm gì - cũng phải đảm bảo rằng bạn là người giành chiến thắng.',100),
								('10',N'Tư Duy Để Thắng - Dám Thất Bại','3','Billi P.S. Lim',8,'K5.PNG',N'Chúng ta thường nghe cũng như đọc nhiều về gương thành công, về những vĩ nhân. Chúng ta thường không thích nói về thất bại, như thể chúng ta đã được “lập trình” để tránh thất bại… Lẽ nào “thất bại” chẳng có chút giá trị nào sao? Quyển sách này đề cập đến một mặt khác của câu chuyện thành công. Đó là một phương diện chúng ta cần thật sự học hỏi. Đối với những ai đã từng cố gắng và từng thất bại, quyển sách này đứng về phía bạn. Dám thất bại, bạn sẽ dễ dàng thành công sau này…',20),
								('11',N'Thử Thách Những Ước Mơ','4','Billi P.S. Lim',3,'S1.PNG',N'Các bạn đang cầm trên tay cuốn sách "Thử thách những ước mơ" và sắp sửa cùng chúng tôi bước vào hành trình khám phá bí quyết thành công của các doanh nhân thành đạt trên thế giới. Toàn bộ cuốn sách này là những câu chuyện có thật về cuộc đời và con đường thành công của những con người đặc biệt này.',100),
								('12',N'Tony Buổi Sáng - Trên Đường Băng','4',N'Tony Buổi Sáng',2,'S2.PNG',N'Trên đường băng là tập hợp những bài viết được ưa thích trên Facebook của Tony Buổi Sáng. Nhưng khác với một tập tản văn thông thường, nội dung các bài được chọn lọc có chủ đích, nhằm chuẩn bị về tinh thần, kiến thức…cho các bạn trẻ vào đời. Sách gồm 3 phần: “Chuẩn bị hành trang”, “Trong phòng chờ sân bay” và “Lên máy bay”, tương ứng với những quá trình một bạn trẻ phải trải qua trước khi “cất cánh” trên đường băng cuộc đời, bay vào bầu trời cao rộng.',100),
								('13',N'Đắc Nhân Tâm','4','Dale Carnegie',7.5,'S3.PNG',N'Đắc Nhân Tâm - Được lòng người, là cuốn sách đưa ra các lời khuyên về cách thức cư xử, ứng xử và giao tiếp với mọi người để đạt được thành công trong cuộc sống. Gần 80 năm kể từ khi ra đời, Đắc Nhân Tâm là cuốn sách gối đầu giường của nhiều thế hệ luôn muốn hoàn thiện chính mình để vươn tới một cuộc sống tốt đẹp và thành công.',100),
								('14',N'Chiến Thắng Con Quỷ Trong Bạn','4','Napoleon Hill',2,'S4.PNG',N'Chiến thắng Con Quỷ trong bạn một lần nữa lại chứng minh rằng thông điệp và triết lý của Napoleon Hill sẽ còn sống mãi với thời gian. Cuốn sách này ẩn chứa những nội dung sâu sắc về việc làm thế nào để thoát khỏi những thói quen và thái độ ngáng trở con đường đến với thành công, hạnh phúc và thịnh vượng của bạn. Nếu bạn muốn vượt qua những rào cản do chính bản thân mình tạo ra, hãy đọc cuốn sách này!',100),
								('15',N'Tuổi Trẻ Đáng Giá Bao Nhiêu','4',N'Rosie Nguyễn',6,'S5.PNG',N'Bạn hối tiếc vì không nắm bắt lấy một cơ hội nào đó, chẳng có ai phải mất ngủ. Bạn trải qua những ngày tháng nhạt nhẽo với công việc bạn căm ghét, người ta chẳng hề bận lòng. Bạn có chết mòn nơi xó tường với những ước mơ dang dở, đó không phải là việc của họ. Suy cho cùng, quyết định là ở bạn. Muốn có điều gì hay không là tùy bạn. Nên hãy làm những điều bạn thích. Hãy đi theo tiếng nói trái tim. Hãy sống theo cách bạn cho là mình nên sống. Vì sau tất cả, chẳng ai quan tâm.',100),
								('16',N'Cánh Cụt Ngố Và Bí Ngô','6','Salina Yoon',2,'KID1.PNG',N'Cơn tò mò muốn biết mùa thu ra sao đưa Cánh Cụt Ngố làm một chuyến đi tới nông trại xa xôi - ở đó cậu ta khám phá ra cách chia sẻ những thú vui mùa thu với một người đặc biệt ở nhà.',10),
								('17',N'Những Điều Kỳ Thú - Kiến Thức Thú Vị','6','Rosie Nguyễn',2.2,'KID2.PNG',N'Những điều kỳ thú mang đến cho các em thiếu nhi những kiến thức tuyệt vời và thú vị, qua đó các em sẽ biết thêm những điều bổ ích, làm phong phú vốn kiến thức cho mình về nhiều lĩnh vực như: Thế giới tự nhiên, Địa lý, Khoa học kỹ thuật, Kỳ quan thế giới, Trái đất, Vũ trụ...',100),
								('18',N'Ngủ Ngon Cùng Hươu Con','6','Monica Sweeney - Lauren Yelvington',2.2,'KID3.PNG',N'HÃY TƯỞNG TƯỢNG một câu chuyện có thể giúp thiên thần nhỏ của bạn thư giãn, thả lỏng cơ thể để con có thể đi vào giấc ngủ dễ dàng hơn! Ngủ ngon cùng hươu con được “thiết kế” để giúp cha mẹ giảm bớt gánh nặng và khó khăn trong lịch trình giúp con đi ngủ mỗi tối. Các bé không chỉ nhanh chóng bị thu hút và đắm chìm vào thế giới hình ảnh minh hoạ tuyệt đẹp của cuốn sách, mà bố mẹ cũng có thể dễ dàng nhận ra sự khoa học trong cách sử dụng ngôn từ và vần điệu. Việc lặp lại các cụm từ chính, ngôn ngữ gợi mở, êm ái cùng các từ gợi hình tượng và khuyến khích các hoạt động đi ngủ như “duỗi dài người”, “ngáp”, đều giúp bố mẹ trong việc cùng con thư giãn để đi vào giấc ngủ. Đọc sách cùng con ngoài việc là một cách gắn kết tuyệt vời, đây còn là một thói quen hiệu quả để báo hiệu giờ đi ngủ sắp tới. Các bố mẹ nên chuẩn bị những hoạt động hỗ trợ cho giấc ngủ của con khoảng 1 tiếng trước giờ ngủ chính thức và đừng quên đưa cuốn  Ngủ ngon cùng hươu con này vào chu trình đó nhé!',100),
								('19',N'Những Điều Kỳ Thú - Kiến Thức Thú Vị','6',N'Rosie Nguyễn',11,'KID4.PNG',N'Những điều kỳ thú mang đến cho các em thiếu nhi những kiến thức tuyệt vời và thú vị, qua đó các em sẽ biết thêm những điều bổ ích, làm phong phú vốn kiến thức cho mình về nhiều lĩnh vực như: Thế giới tự nhiên, Địa lý, Khoa học kỹ thuật, Kỳ quan thế giới, Trái đất, Vũ trụ...',100),
								('20',N'Chử Đồng Tử - Tiên Dung','6','Phan Minh Đạo',1.1,'KID5.PNG',N'Ngày xưa ở làng Chử Xá có hai cho con rất thương yêu nhau là Chử Cù Vân và Chử Đồng Tử. Họ nghèo khó đến mức phải dùng chung một cái khố, hễ ai đi đâu thì đóng',20)
GO
--SELECT * FROM Product ORDER BY name asc OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY
CREATE TABLE coupon(
	_id [nvarchar](100) PRIMARY KEY,
	code [nvarchar](100) NOT NULL,
	amount float NOT NULL,
	minimumCartValue float NOT NULL,
	eventName [nvarchar](100) NOT NULL,
	fromDate date DEFAULT getdate(),
	toDate date DEFAULT DATEADD(day,7,getdate())
	)
GO
	insert into coupon(_id, code, amount, minimumCartValue, eventName) values ('1', '1111', 10, 10, 'ABC'),
																		('2', '2222', 5, 10, 'Valentine'),
																		('3', '3333', 20, 40, 'Women day'),
																		('4', '4444', 30, 50, 'Luna new year')
CREATE TABLE productOrder(
	_id [nvarchar](100) PRIMARY KEY,
	customer_id [nvarchar](100) FOREIGN KEY REFERENCES customer(_id),
	coupon_id [nvarchar](100) FOREIGN KEY REFERENCES coupon(_id),
	date [datetime] DEFAULT getdate(),	
	status [nvarchar](100) DEFAULT 'Order Placed'	
	)
GO
	insert into productOrder(_id,customer_id, coupon_id, date, status) values ('1','2', '1',getdate(), 'Delivered'),
																		('2','2', null,getdate(), 'Delivered'),
																		('3','2', '1',DATEADD(day,1,getdate()), 'Order Placed'),
																		('4','3', null,DATEADD(day,2,getdate()), 'Order Placed'),
																		('5','1', '3',getdate(), 'Delivered'),
																		('6','1', '2',DATEADD(day,-120,getdate()), 'Delivered'),
																		('7','1', null,DATEADD(day,-90,getdate()), 'Delivered'),
																		('8','3', '3',getdate(), 'Delivered'),
																		('9','3', null,DATEADD(day,-60,getdate()), 'Delivered'),
																		('10','1', '1',getdate(), 'Delivered'),
																		('11','1', null,getdate(), 'Delivered'),
																		('12','1', null,DATEADD(day,-30,getdate()), 'Delivered'),
																		('13','3', '3',getdate(), 'Delivered'),
																		('14','3', '4',DATEADD(day,-50,getdate()), 'Delivered')
GO
CREATE TABLE orderDetail(
	_id [nvarchar](100) PRIMARY KEY,
	productOrder_id [nvarchar](100) FOREIGN KEY REFERENCES productOrder(_id),
	product_id [nvarchar](100) FOREIGN KEY REFERENCES product(_id),
	quantity [int] NOT NULL
	)
GO
	insert into orderDetail values ('1','1','1',4),
									('2','1','2',2),
									('3','2','3',3),
									('4','2','4',3),
									('5','3','6',5),
									('6','3','8',2),
									('7','4','7',1),
									('8','4','9',3),
									('9','5','10',7),
									('10','5','11',2),
									('11','6','12',1),
									('12','6','15',3),
									('13','7','19',5),
									('14','7','20',3),
									('15','8','17',1),
									('16','8','11',2),
									('17','9','12',5),
									('18','9','19',3),
									('19','10','1',1),
									('20','10','2',2),
									('21','12','3',4),
									('22','12','4',3),
									('23','13','6',1),
									('24','13','8',2),
									('25','14','7',3),
									('26','14','9',3),
									('27','2','10',10),
									('28','5','11',2),
									('29','7','12',2),
									('30','6','15',3),
									('31','11','19',1),
									('32','11','20',3),
									('33','8','17',1),
									('34','10','11',2),
									('35','8','12',1),
									('36','9','19',3)
GO
CREATE TABLE wishlist(
	_id [nvarchar](100) PRIMARY KEY,
	customer_id [nvarchar](100) FOREIGN KEY REFERENCES customer(_id),
	product_id [nvarchar](100) FOREIGN KEY REFERENCES product(_id)
	)
GO
	insert into wishlist values ('1','1','1'),
								('2','1','2'),
								('3','1','3'),
								('4','1','4'),
								('5','2','5'),
								('6','2','1'),
								('7','2','2'),
								('8','2','3'),
								('9','2','4'),
								('10','3','5'),
								('11','3','6'),
								('12','3','7'),
								('13','3','8'),
								('14','3','9'),
								('15','3','10'),
								('16','4','1'),
								('17','4','2'),
								('18','4','3'),
								('19','4','4'),
								('20','4','5')
GO
CREATE TABLE rating(
	_id [nvarchar](100) PRIMARY KEY,
	customer_id [nvarchar](100) FOREIGN KEY REFERENCES customer(_id),
	product_id [nvarchar](100) FOREIGN KEY REFERENCES product(_id),
	comment [nvarchar](500) NULL,
	star [int] NOT NULL 
	)
GO
	insert into rating values ('21','1','7','Id like it',4),
								('22','1','8','Excellent',5),
								('23','1','9','So so',3),
								('24','2','17','Good',4),
								('1','1','1','Id like it',5),
								('2','1','2','Id like it',4),
								('3','1','3','Id like it',3),
								('4','1','4','Id like it',4),
								('5','2','5','Id like it',3),
								('6','2','1','Id like it',4),
								('7','2','2','Id like it',4),
								('8','2','3','Id like it',4),
								('9','2','4','Id like it',3),
								('10','3','5','Id like it',4),
								('11','3','6','Id like it',5),
								('12','3','7','Dont like it',1),
								('13','3','8','Id like it',4),
								('14','3','9','Id like it',5),
								('15','3','10','Id like it',4),
								('16','4','1','Id like it',3),
								('17','4','2','Id like it',4),
								('18','4','3','Id like it',4),
								('19','4','4','Id like it',4),
								('20','4','5','Id like it',3)
GO    
