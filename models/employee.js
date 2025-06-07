class Employee {
  constructor(
    _account,
    _name,
    _email,
    _password,
    _datejob,
    _salary,
    _position,
    _datetiem
  ) {
    this.acount = _account;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.datejob = _datejob;
    this.salary = Number(_salary);
    this.position = _position;
    this.detetime = Number(_datetiem);
    this.totalSeall = 0;
    this.rating = "";
  }
  totalSeal() {
    if (this.position === "Giam doc") {
      this.totalSeall = this.salary * 3;
    } else if (this.position === " truong phong") {
      this.totalSeall = this.salary * 2;
    } else {
      this.totalSeal = this.salary * 1;
    }
  }
  xepLoai() {
    if (this.detetime >= 192) {
      this.rating = "xuat sac";
    } else if (this.detetime >= 176) {
      this.rating = "gioi";
    } else if (this.detetime >= 160) {
      this.rating = "kha";
    } else {
      this.rating = "trung binh";
    }
  }
}
export default Employee;
