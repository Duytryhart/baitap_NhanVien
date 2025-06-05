
class NhanVienList{
constructor(_arr){
  this.arr=[];
}
addEmployee(employee){
  this.arr.push(employee);

}
deleateEmployee(acount){
let index=-1;
//tim vi tri cua nhan vien trong mang arr 
for(let i=0;i<this.arr.length;i++){
  const emplayee=this.arr[i];
  if(emplayee.acount===acount){
index=i;
break;
  }
}
if(index!==-1){
  this.arr.splice(index,1);
}



}


}
export default NhanVienList; 