
import emplayee from "../models/employee.js";
import NhanVienList from "../models/list-employee.js";
// tao lop doi tuong tu doi tuong NhanvienList
const nhanVienList= new NhanVienList();

export const getId=(id)=>{
    return document.getElementById(id);

}
const getTenChucVu=(position)=>{
if(position==="boss")return "sếp";
if(position==="truongPhong") return "Trưởng phòng";
if(position==="employee")return "Nhân viên";
}
const getValue=()=>{
const acount=getId("tknv").value;
    const name=getId("name").value;
    const email=getId("email").value;
    const password=getId("password").value;
    const datejob=getId("datepicker").value;
    const luongCB=getId("luongCB").value;
    const position=getId("chucvu").value;
    const gioLam=getId("gioLam").value;
    const nhanVien= new emplayee(
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
}
const renderEmployee=(data)=>{
  let contenHTML=" ";
for(let i=0;i<data.length;i++){
    const emplayee=data[i];
    contenHTML+=`
    <tr>
    <td>${emplayee.acount}</td>
    <td>${emplayee.name}</td>
    <td>${emplayee.email}</td>
    <td>${emplayee.datejob}</td>
    <td>${getTenChucVu(emplayee.position)}</td>
    <td>${emplayee.totalSeal}</td>
    <td>${emplayee.rating}</td>
    <td>
   <button class="btn btn-info" data-toggle="modal"  data-target="#exampleModal" onclick="onEditemplayee('${
     emplayee.acount
   }')"> Edit </button>
   <button class="btn btn-danger " onclick="onDelete('${
     emplayee.acount
   }')">Deleate</button>
   </td>
    </tr>
    `;
  
}
  getId("tableDanhSach").innerHTML=contenHTML;
}
getId("btnThem").onclick=function(){
  getId("btnCapNhat").style.display="none";
  //hien thi tieu de cua modele 
  getId("header-title").innerHTML="Thêm Nhân Viên";
}
const onEditemplayee = (acount) => {

   getId("btnCapNhat").style.display="none";
  //hien thi tieu de cua modele 
  getId("header-title").innerHTML="Thêm Nhân Viên";
    
    console.log(acount);
    getId("header-title").innerHTML = "Sửa Nhân Viên";
    getId("btnThemNV").style.display = "block";

    // Hiển thị modal
  
};
const onDelete=(acount)=>{
//goi nhung chua dang ki voi widow
nhanVienList.deleateEmployee(acount);
renderEmployee(nhanVienList.arr);
setLocalStorage(nhanVienList.arr);
}
//khai bao onDelete  ra doi tuong window
window.onDelete=onDelete;
window.onEditemplayee=onEditemplayee;
const setLocalStorage=(data)=>{
  const dataString=JSON.stringify(data);
  localStorage.setItem("EMPLOYEE_LIST",dataString);
}
const getLocalStrorage=(key)=>{
const dataString=localStorage.getItem(key);
  if (!dataString) return;
  const dataJson = JSON.parse(dataString);
  nhanVienList.arr = dataJson;
  renderEmployee(nhanVienList.arr);

};

getLocalStrorage("EMPLOYEE_LIST");
//them nhan vien 
window.themNhanVien=()=>{
    const nhanVien=getValue();
  //them doi tuong cac thanh phan nhan vien vao danh sach nhan vien 
nhanVienList.addEmployee(nhanVien);
console.log(nhanVienList.arr);
renderEmployee(nhanVienList.arr);
// lu du lieu va local Storage
setLocalStorage(nhanVienList.arr);
document.getElementsByClassName("close")[0].click();

}
// 

const resetFrom=()=>{
  getId("").reset();
}

