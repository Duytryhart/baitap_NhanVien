import { getId } from "../controllers/main.js";

class Validation {
  // Kiểm tra rỗng
  checkEmpty(value, idNoti, mess) {
    if (value.trim() === "") {
      getId(idNoti).innerHTML = mess;
      getId(idNoti).style.display = "block";
      return false;
    }
    getId(idNoti).innerHTML = "";
    getId(idNoti).style.display = "none";
    return true;
  }

  // Kiểm tra trùng ID
  checkIdExists(value, idNoti, mess, arr) {
    const isExist = arr.some(nv => nv.acount === value);
    if (isExist) {
      getId(idNoti).innerHTML = mess;
      getId(idNoti).style.display = "block";
      return false;
    }
    getId(idNoti).innerHTML = "";
    getId(idNoti).style.display = "none";
    return true;
  }

  // Kiểm tra trùng email
  checkEmailExists(value, idNoti, mess, arr) {
    const exists = arr.some(nv => nv.email === value);
    if (exists) {
      getId(idNoti).innerHTML = mess;
      getId(idNoti).style.display = "block";
      return false;
    }
    getId(idNoti).innerHTML = "";
    getId(idNoti).style.display = "none";
    return true;
  }

  // Kiểm tra chuỗi ký tự (họ tên, ...)
  checkString(value, idNoti, mess) {
    const regex =
      /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
    if (regex.test(value.trim())) {
      getId(idNoti).innerHTML = "";
      getId(idNoti).style.display = "none";
      return true;
    }
    getId(idNoti).innerHTML = mess;
    getId(idNoti).style.display = "block";
    return false;
  }

  // Kiểm tra email hợp lệ
  checkEmail(value, idNoti, mess) {
    const regex = /^\S+@\S+\.\S+$/;
    if (regex.test(value.trim())) {
      getId(idNoti).innerHTML = "";
      getId(idNoti).style.display = "none";
      return true;
    }
    getId(idNoti).innerHTML = mess;
    getId(idNoti).style.display = "block";
    return false;
  }

  // Kiểm tra mật khẩu: 6-10 ký tự, ít nhất 1 số, 1 chữ in hoa, 1 ký tự đặc biệt
  checkPassword(value, idNoti, mess) {
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
    if (regex.test(value)) {
      getId(idNoti).innerHTML = "";
      getId(idNoti).style.display = "none";
      return true;
    }
    getId(idNoti).innerHTML = mess;
    getId(idNoti).style.display = "block";
    return false;
  }

  // Kiểm tra số và nằm trong khoảng
  checkNumber(value, idNoti, mess, min = null, max = null) {
    if (isNaN(value)) {
      getId(idNoti).innerHTML = mess;
      getId(idNoti).style.display = "block";
      return false;
    }
    const number = Number(value);
    if ((min !== null && number < min) || (max !== null && number > max)) {
      getId(idNoti).innerHTML = `Giá trị phải nằm trong khoảng ${min} - ${max}`;
      getId(idNoti).style.display = "block";
      return false;
    }
    getId(idNoti).innerHTML = "";
    getId(idNoti).style.display = "none";
    return true;
  }

  // Kiểm tra đã chọn option hợp lệ chưa (select)
  checkSelectOption(idSelect, idNoti, mess) {
    const select = getId(idSelect);
    if (select.selectedIndex !== 0) {
      getId(idNoti).innerHTML = "";
      getId(idNoti).style.display = "none";
      return true;
    }
    getId(idNoti).innerHTML = mess;
    getId(idNoti).style.display = "block";
    return false;
  }

  // Kiểm tra độ dài chuỗi
  checkCharacterLength(value, idNoti, mess, min, max) {
    const length = value.trim().length;
    if (length >= min && length <= max) {
      getId(idNoti).innerHTML = "";
      getId(idNoti).style.display = "none";
      return true;
    }
    getId(idNoti).innerHTML = mess;
    getId(idNoti).style.display = "block";
    return false;
  }
}

export default Validation;
