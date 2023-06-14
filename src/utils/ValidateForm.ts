export const isEmailValid = (value: string | null) => {
  if (!value) {
    return "Vui lòng nhập email";
  }

  // Kiểm tra tính hợp lệ của email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || "Email không hợp lệ";
};

export const isPhoneNumberValid = (phoneNumber: string | null): boolean | string => {
  if (!phoneNumber) return true;

  const phoneRegex = /^(03[2-9]|05[2689]|07[06-9]|08[1-9]|09[0-9])[0-9]{7}$/;
  return phoneRegex.test(phoneNumber) || "Số điện thoại không hợp lệ";
};

export const isUsernameValid = (username: string | null): boolean | string => {
  if (!username) return "Vui lòng nhập tên đăng nhập";
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{5,12}$/;
  return (
    usernameRegex.test(username) ||
    "Tên đăng nhập phải bắt đầu bằng chữ cái, chỉ được sử dụng chữ cái thường, in hoa và số"
  );
};
