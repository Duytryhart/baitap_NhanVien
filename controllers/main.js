import Emplayee from "../models/employee.js";
import NhanVienList from "../models/list-employee.js";
import Validation from "../models/validation.js";
// tao lop doi tuong tu doi tuong NhanvienList
const nhanVienList = new NhanVienList();
const validation = new Validation();

export const getId = (id) => {
  return document.getElementById(id);
};
const getTenChucVu = (position) => {
  if (position === "boss") return "sếp";
  if (position === "truongPhong") return "Trưởng phòng";
  if (position === "employee") return "Nhân viên";
};
const getValue = () => {
  const acount = getId("tknv").value;
  const name = getId("name").value;
  const email = getId("email").value;
  const password = getId("password").value;
  const datejob = getId("datepicker").value;
  const luongCB = getId("luongCB").value;
  const position = getId("chucvu").value;
  const gioLam = getId("gioLam").value;

  let isValid = true;
  isValid &=
    validation.checkEmpty(acount, "tbTKNV", "(*)vui long nhap acount") &&
    validation.checkIdExists(
      acount,
      "tbTKNV",
      "* acount nhan vien da ton tai",
      nhanVienList.arr
    );

  isValid &=
    validation.checkEmpty(name, "tbTen", "(*) vui long nha ten") &&
    validation.checkString(name, "tbTen", "* ten nhan vien khong hop le ");

  isValid &=
    validation.checkEmpty(email, "tbEmail", "(*) vui long nha email") &&
    validation.checkEmailExists(
      email,
      "tbEmail",
      "* email da ton tai",
      nhanVienList.arr
    ) &&
    validation.checkEmail(email, "tbEmail", "* emmail khong hop le");

  isValid &=
    validation.checkEmpty(
      password,
      "tbMatKhau",
      "(*) vui long nhap mat khau"
    ) &&
    validation.checkPassword(
      password,
      "tbMatKhau",
      "* passwork khong dung ki tu gom co chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );

  isValid &= validation.checkEmpty(
    datejob,
    "tbNgay",
    "(*) vui long nhap ngay lam"
  );

  isValid &=
    validation.checkEmpty(
      luongCB,
      "tbLuongCB",
      "(*) vui long nhap luong co ban "
    ) &&
    validation.checkNumber(
      luongCB,
      "tbLuongCB",
      "* Luong phai nhap so",
      1000000,
      20000000
    );

  isValid &= validation.checkEmpty(
    position,
    "tbChucVu",
    "(*) vui long nhap chuc vu"
  );

  isValid &=
    validation.checkEmpty(gioLam, "tbGiolam", "(*) vui long nhap gio lam ") &&
    validation.checkNumber(
      gioLam,
      "tbGiolam",
      "* gio lam phai nhap so",
      80,
      200
    );

  if (!isValid) return;

  const nhanVien = new Emplayee(
    acount,
    name,
    email,
    password,
    datejob,
    luongCB,
    position,
    gioLam
  );
  nhanVien.totalSeal();
  nhanVien.xepLoai();
  return nhanVien;
};
const renderEmployee = (data) => {
  let contenHTML = " ";
  for (let i = 0; i < data.length; i++) {
    const emplayee = data[i];
    contenHTML += `
    <tr>
    <td>${emplayee.acount}</td>
    <td>${emplayee.name}</td>
    <td>${emplayee.email}</td>
    <td>${emplayee.datejob}</td>
    <td>${getTenChucVu(emplayee.position)}</td>
    <td>${emplayee.totalSeal}</td>
    <td>${emplayee.rating}</td>
    <td>
    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="onEditemplayee('${
      emplayee.acount
    }')"> Edit </button>
   
   <button class="btn btn-danger " onclick="onDelete('${
     emplayee.acount
   }')">Deleate</button>
   </td>
    </tr>
    `;
  }
  getId("tableDanhSach").innerHTML = contenHTML;
};
getId("btnThem").onclick = function () {
  getId("btnCapNhat").style.display = "none";
  //hien thi tieu de cua modele
  getId("header-title").innerHTML = "Thêm Nhân Viên";
  getId("btnThemNV").style.display = "block";
  getId("tknv").disabled = false;
  resetFrom();
};
window.onload = function () {
  getId("selLoai").addEventListener("change", () => {
    const type = getId("selLoai").value;
    const arrFiltered = nhanVienList.filterEmployee(type);
    renderEmployee(arrFiltered);
  });
};

getId("searchName").addEventListener("keyup", () => {
  const keywork = getId("searchName").value;
  const findEmployee = nhanVienList.searchEmployee(keywork);
  renderEmployee(findEmployee);
});
getId("btnCapNhat").onclick = function () {
  //lay lai thong tin de cap nhat mon
  const employee = getValue();
  nhanVienList.updateEmpoyee(employee);
  renderEmployee(nhanVienList.arr);
  setLocalStorage(nhanVienList.arr);
  document.getElementsByClassName("close")[0].click();
};
getId("selLoai").addEventListener("change", () => {
  const type = getId("selLoai").value;
  console.log(type);
  const arrFiltered = nhanVienList.filterEmployee(type);
  console.log(arrFiltered);
  renderEmployee(arrFiltered);
});

const onEditemplayee = (acount) => {
  //hien thi tieu de cua modele
  console.log(acount);
  getId("header-title").innerHTML = "Sửa Nhân Viên";
  getId("btnThemNV").style.display = "none";
  getId("btnCapNhat").style.display = "block";
  // Hiển thị modal
  const employee = nhanVienList.getEmployeeByID(acount);
  getId("tknv").disabled = true;
  if (employee) {
    //dom toi foodid=>disable de khong su id
    getId("tknv").value = employee.acount;
    getId("name").value = employee.name;
    getId("email").value = employee.email;
    getId("password").value = employee.password;
    getId("luongCB").value = employee.luongCB;
    getId("chucvu").value = employee.position;
    getId("gioLam").value = employee.gioLam;
  }
};
const onDelete = (acount) => {
  //goi nhung chua dang ki voi widow
  nhanVienList.deleateEmployee(acount);
  renderEmployee(nhanVienList.arr);
  setLocalStorage(nhanVienList.arr);
};
//khai bao onDelete  ra doi tuong window
window.onDelete = onDelete;
window.onEditemplayee = onEditemplayee;
const setLocalStorage = (data) => {
  const dataString = JSON.stringify(data);
  localStorage.setItem("EMPLOYEE_LIST", dataString);
};
const getLocalStrorage = (key) => {
  const dataString = localStorage.getItem(key);
  if (!dataString) return;
  const dataJson = JSON.parse(dataString);
  nhanVienList.arr = dataJson;
  renderEmployee(nhanVienList.arr);
};

getLocalStrorage("EMPLOYEE_LIST");
//them nhan vien
window.themNhanVien = () => {
  const nhanVien = getValue();
  if (!nhanVien) return;
  //them doi tuong cac thanh phan nhan vien vao danh sach nhan vien
  nhanVienList.addEmployee(nhanVien);
  console.log(nhanVienList.arr);
  renderEmployee(nhanVienList.arr);
  // lu du lieu va local Storage
  setLocalStorage(nhanVienList.arr);
  // document.getElementsByClassName("close")[0].click();
};
// cliea data khi them mon

const resetFrom = () => {
  getId("forForm").reset();
};
