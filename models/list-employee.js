class NhanVienList {
  constructor(_arr) {
    this.arr = [];
  }
  addEmployee(employee) {
    this.arr.push(employee);
  }
  findIndexEmployee(acount) {
    let index = -1;
    //tim vi tri cua nhan vien trong mang arr
    for (let i = 0; i < this.arr.length; i++) {
      const emplayee = this.arr[i];
      if (emplayee.acount === acount) {
        index = i;
        break;
      }
    }
    return index;
  }
  deleateEmployee(acount) {
    const index = this.findIndexEmployee(acount);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }
  searchEmployee(keywork) {
    let findEmployee = [];
    for (let i = 0; i < this.arr.length; i++) {
      const emplayee = this.arr[i];
      const nameLowverCasse = emplayee.name.toLowerCase();
      const keyworkdLoweeCase = keywork.toLowerCase();
      const index = nameLowverCasse.indexOf(keyworkdLoweeCase);
      if (index !== -1) {
        findEmployee.push(emplayee);
      }
    }
    return findEmployee;
  }
  getEmployeeByID(acount) {
    const index = this.findIndexEmployee(acount);
    if (!index == -1) {
      return this.arr[index];
    }
    return null;
  }
  updateEmpoyee(emplayee) {
    const index = this.findIndexEmployee(emplayee.acount);
    if (index !== -1) {
      this.arr[index] = emplayee;
    }
  }
  filterEmployee(type){
  if (type === "all") {
    return this.arr;
  }
  let arrFiltered = [];
  for (let i = 0; i < this.arr.length; i++) {
    const emplayee = this.arr[i];
    if (emplayee.rating === type) {
      arrFiltered.push(emplayee);
    }
  }
  return arrFiltered;
}

}
export default NhanVienList;
