File packages.txt được dùng để tổng hợp các package được dùng trong dự án. 
Câu lệnh: npm list --depth=0 > packages.txt
Các package sử dụng được lưu bên trong file package.json (tương tự requirements.txt)

- package.json thì gọi phiên bản tương đối
- package-lock.json thì gọi phiên bản tuyệt đối, đúng từng chi tiết

file vite.confis.js dùng để điều chỉnh config của vite. Trong đó allias để làm ngắn các đường dẫn của file

file index.html để deploy ra trang web từ đó link tới main.jsx để có thể thay đổi các trang

.env là file để tổng hợp các thông tin cá nhân 

gitignore để tránh push các file ko cần thiết lên github

Lưu ý cách viết của react-dom ( có thể bị lỗi thời)

router là file được tạo ra để có thể tổng hợp các đường dẫn, sau đó nó sẽ được thay đổi vào trong biến route ở trang main.jsx giúp thay đổi trang

errorpage là trang để thông báo web lỗi

main.jsx là trang để thay đổi các page

trong folder page sẽ chia thành các folder của các trang, trong mỗi folder sẽ gồm các components của trang đó và 1 file index.jsx(nếu thêm vào đường dẫn sẽ tiện hơn VD: src/home thay vì src/home/home.py)

trong folder components/commom sẽ chứa các components chung của các trang như header,footer,...

cjs để tránh lỗi module