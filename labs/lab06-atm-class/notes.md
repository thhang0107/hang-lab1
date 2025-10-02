# Lab 06 – Thiết kế chi tiết lớp & kiến trúc ATM

## 1. Mục tiêu
- Từ Use Case và Sequence Diagram đã có, tiến hành thiết kế **Class Diagram** và **Package Diagram** cho hệ thống ATM.  
- Cung cấp tài liệu thiết kế chi tiết, bao gồm sơ đồ và giải thích.  

---

## 2. Class Diagram
- **Các lớp chính**:
  - `ATM`: quản lý thông tin máy ATM, xử lý giao dịch rút, gửi, chuyển khoản.
  - `Card`: lưu trữ thông tin thẻ, trạng thái và PIN hash.
  - `Account`: quản lý tài khoản, số dư và các thao tác nợ/có.
  - `Transaction`: ghi nhận thông tin giao dịch (mã, loại, số tiền, thời gian, trạng thái).

- **Quan hệ**:
  - `ATM` liên kết với `Card` và `Transaction`.
  - `Card` liên kết với `Account`.
  - `Account` liên kết với `Transaction`.

- **File kèm theo**:
  - `class-atm.puml` (mã PlantUML).
  - `class-atm.png` (sơ đồ lớp xuất từ PlantUML).

---

## 3. Package Diagram
- **Các package chính**:
  - `UI`: giao diện người dùng, màn hình ATM.
  - `Controller`: xử lý luồng nghiệp vụ giữa UI và dịch vụ.
  - `BankService`: quản lý logic nghiệp vụ, dữ liệu tài khoản.
  - `Hardware`: mô phỏng phần cứng ATM (máy thẻ, tiền mặt, máy in biên lai).

- **Quan hệ**:
  - `UI` → `Controller`.
  - `Controller` → `BankService`.
  - `Controller` → `Hardware`.

- **File kèm theo**:
  - `package-diagram.puml` (mã PlantUML).
  - `package-diagram.png` (sơ đồ package xuất từ PlantUML).

---
