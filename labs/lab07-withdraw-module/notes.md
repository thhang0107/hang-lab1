# Lab 07 – Withdraw Module (ATM)

## Mục tiêu
- Viết module rút tiền (Withdraw) trong ATM bằng Node.js.
- Kết nối MySQL, xử lý giao dịch, kiểm tra số dư, ghi log.

## Các bước thực hiện
1. Tạo database `atm_demo` với các bảng `accounts`, `cards`, `transactions`.
2. Cài Node.js + thư viện `mysql2`.
3. Viết hàm:
   - `verifyPin(cardNo, pin)`: xác thực PIN.
   - `withdraw(cardNo, amount)`: thực hiện rút tiền, update số dư và log giao dịch.
4. Test bằng tài khoản mẫu (`card_no = 1234567890`, `PIN = 1234`).

## Kết quả
- Thành công khi rút 200 từ tài khoản demo.
- Số dư giảm, transaction được ghi lại.

## Đánh giá
- Kết nối DB đúng.
- Xử lý giao dịch và rollback khi lỗi.
- Kiểm tra số dư hợp lệ.
- Ghi log đầy đủ.
