import { Translations } from "@shared/types/common.types";

const vi: Translations = {
  common: {
    // actions
    ok: 'Đồng ý',
    cancel: 'Hủy',
    save: 'Lưu',
    confirm: 'Xác nhận',
    delete: 'Xóa',
    edit: 'Chỉnh sửa',
    add: 'Thêm',
    create: 'Tạo mới',
    update: 'Cập nhật',
    submit: 'Gửi',
    send: 'Gửi',
    back: 'Quay lại',
    next: 'Tiếp theo',
    done: 'Xong',
    close: 'Đóng',
    retry: 'Thử lại',
    refresh: 'Làm mới',
    search: 'Tìm kiếm',
    filter: 'Lọc',
    clear: 'Xóa tất cả',
    select: 'Chọn',
    // states
    loading: 'Đang tải...',
    saving: 'Đang lưu...',
    deleting: 'Đang xóa...',
    submitting: 'Đang gửi...',
    // feedback
    error: 'Có lỗi xảy ra',
    success: 'Thành công!',
    noResults: 'Không tìm thấy kết quả',
    empty: 'Chưa có dữ liệu',
    // misc
    required: 'Bắt buộc',
    optional: 'Tùy chọn',
    or: 'hoặc',
    and: 'và',
    yes: 'Có',
    no: 'Không',
    seeAll: 'Xem tất cả',
    learnMore: 'Tìm hiểu thêm',
    tryAgain: 'Vui lòng thử lại',
  },
  network: {
    offline: 'Bạn đang offline',
    backOnline: 'Đã khôi phục kết nối internet',
  },
  forceUpdate: {
    title: 'Cần cập nhật ứng dụng',
    description: 'Phiên bản mới đã có sẵn. Vui lòng cập nhật để tiếp tục sử dụng ứng dụng.',
    updateNow: 'Cập nhật ngay',
  },
  auth: {
    welcomeBack: 'Chào mừng trở lại',
    email: 'Email',
    password: 'Mật khẩu',
    emailPlaceholder: 'ban@example.com',
    passwordPlaceholder: '••••••••',
    signIn: 'Đăng nhập',
    signingIn: 'Đang đăng nhập…',
    createAccount: 'Tạo tài khoản',
    loginFailed: 'Đăng nhập thất bại',
  },
};

export default vi;
