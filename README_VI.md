
# 📱 Project Name

## 🚀 Giới thiệu

App name introduction

---

## 🧠 Tính năng chính

- 🔐 Feature 1
- 🧑‍💼 Feature 2
- 📟 Feature 3
- 🚨 Feature 4
- 📊 Feature 5
- 🧩 Feature 6

---

## 🧱 Kiến trúc dự án

Áp dụng theo mô hình _MVVM / Feature-based structure_. Cấu trúc thư mục chính:

```
assets/                  # Tài nguyên tĩnh như hình ảnh, icon, font
env/                     # Các file cấu hình môi trường (.env.development, .env.production, ...)
src/                     # Thư mục chứa toàn bộ mã nguồn chính của ứng dụng
├── app                  # Routing & layout theo cấu trúc file (Expo Router / kiểu Next.js)
│   ├── (auth)           # Các route/layout cho người dùng đã đăng nhập
│   ├── (un-auth)        # Các route/layout cho người dùng chưa đăng nhập
│   ├── +html.tsx        # Entry HTML root (cho web hoặc SSR)
│   ├── +not-found.tsx   # Màn hình 404 khi route không tồn tại
│   └── _layout.tsx      # Layout tổng thể cho toàn bộ ứng dụng
├── common               # Các hàm/tệp tiện ích dùng chung trên toàn app
│   ├── animated         # Các tiện ích hoặc component liên quan đến animation
│   ├── constant         # Các hằng số toàn cục (route, config, status code)
│   ├── hooks            # Custom React Hooks
│   ├── method           # Các hàm xử lý logic thuần
│   ├── regex            # Các biểu thức chính quy được định nghĩa sẵn
│   ├── signal           # Trạng thái dạng signal (nếu dùng Preact/React signals)
│   ├── string           # Các hàm xử lý chuỗi
│   └── yup-validate     # Các schema validation dùng Yup
├── components           # Component UI riêng cho từng màn hình (không dùng lại toàn app)
├── data                 
│   └── remote           # Các nguồn dữ liệu từ server (API fetcher, services)
├── library              # Các thư viện nội bộ được dùng xuyên suốt ứng dụng
│   ├── components       # Core UI component tuỳ chỉnh (Text, View, Button,...)
│   ├── index.ts         # Entry point của thư viện
│   ├── networking       # Cấu hình HTTP client (Axios, interceptor, base URL,...)
│   └── utils            # Các hàm tiện ích riêng cho thư viện
├── models               # Định nghĩa kiểu dữ liệu và interface
│   ├── input            # Model cho dữ liệu gửi lên (request body)
│   └── output           # Model cho dữ liệu nhận về (response)
├── theme                # Hệ thống thiết kế: màu sắc, font, style
│   ├── colors           # Định nghĩa bảng màu chính
│   ├── index.ts         # Điểm khởi đầu của theme
│   ├── text-presets     # Các preset cho typography (heading, body, caption...)
│   ├── theme.ts         # File cấu hình theme chính
│   └── typography       # Định nghĩa font, kích thước, độ đậm
└── zustand              # Quản lý trạng thái global với Zustand
    ├── selectors        # Hàm selector để lấy dữ liệu từ store
    └── stores           # Các slice/store Zustand (authStore, deviceStore,...)
```

---

## ⚙️ Cài đặt & Khởi chạy

### Yêu cầu hệ thống

- Node.js >= 18
- Yarn hoặc npm
- Android Studio / Xcode
- Watchman (macOS)

### Cài đặt

```bash
git clone https://github.com/yourusername/your-project.git
cd your-project
yarn install
```

### Expo prebuild

```bash
npx expo prebuild      # (Chỉ dùng lệnh này khi mới clone dự án về hoặc khi thêm một thư viện native mới)
```

### Expo start

```bash
yarn start
```

### Chạy trên Android

```bash
yarn dev:android        # development env
yarn staging:android    # staging env
yarn pro:android        # production env
```

### Chạy trên iOS

```bash
yarn dev:ios        # development env
yarn staging:ios    # staging env
yarn pro:ios        # production env
```

---

## 🔐 Cấu hình môi trường

Các file môi trường đều nằm trong folder `env` tại root project (liên hệ với chủ sở hữu để lấy folder nếu projcet chưa có)

Sử dụng thư viện [`react-native-keys`](https://github.com/numandev1/react-native-keys) hoặc tương đương để load biến môi trường.

---

## 📸 Hình ảnh demo

Screenshot content

---

## 🛠️ Tech stack

- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Axios](https://axios-http.com/) – HTTP client
- [React Query](https://tanstack.com/query/v4/docs/framework/react/overview) - Server State
- [Restyle](https://shopify.github.io/restyle/) - UI Styling
- [Formik](https://formik.org/) - Form Management

---


## 📄 Giấy phép

License content

---

## 📬 Liên hệ

Contact content