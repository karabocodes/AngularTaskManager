import{c as y}from"./chunk-TRNELGHZ.js";import{C as N,D as P,a as C,b as S,c as _,d as b,e as R,f as W,g as v,h as F,t as I,u as E}from"./chunk-D2G6HKVK.js";import{a as B,c as T}from"./chunk-UZ4HAGIG.js";import{a as q}from"./chunk-JMDEYX64.js";import{Ea as r,Fa as n,Ka as M,Na as c,Qa as s,Ra as l,Sa as d,U as f,Ua as h,ob as w,pa as m,qa as g}from"./chunk-JO6IUR6O.js";var J=(()=>{let o=class o{constructor(a,t){this.apiService=a,this.router=t,this.username="",this.email="",this.password=""}onSubmit(){let a={username:this.username,email:this.email,password:this.password,role:"user"};this.apiService.register(a).subscribe(t=>{console.log("Registration successful",t),this.router.navigate(["/login"])},t=>{console.error("Registration error",t),alert("An error occurred during registration")})}};o.\u0275fac=function(t){return new(t||o)(g(q),g(y))},o.\u0275cmp=f({type:o,selectors:[["app-register"]],standalone:!0,features:[h],decls:12,vars:3,consts:[[1,"register-container"],[3,"ngSubmit"],["matInput","","placeholder","Username","name","username","required","",3,"ngModelChange","ngModel"],["matInput","","type","email","placeholder","Email","name","email","required","",3,"ngModelChange","ngModel"],["matInput","","type","password","placeholder","Password","name","password","required","",3,"ngModelChange","ngModel"],["mat-raised-button","","color","primary","type","submit"]],template:function(t,i){t&1&&(r(0,"div",0)(1,"h2"),c(2,"Register"),n(),r(3,"form",1),M("ngSubmit",function(){return i.onSubmit()}),r(4,"mat-form-field")(5,"input",2),d("ngModelChange",function(e){return l(i.username,e)||(i.username=e),e}),n()(),r(6,"mat-form-field")(7,"input",3),d("ngModelChange",function(e){return l(i.email,e)||(i.email=e),e}),n()(),r(8,"mat-form-field")(9,"input",4),d("ngModelChange",function(e){return l(i.password,e)||(i.password=e),e}),n()(),r(10,"button",5),c(11,"Register"),n()()()),t&2&&(m(5),s("ngModel",i.username),m(2),s("ngModel",i.email),m(2),s("ngModel",i.password))},dependencies:[w,F,W,C,S,_,v,R,b,E,I,P,N,T,B],styles:[".register-container[_ngcontent-%COMP%]{max-width:300px;margin:50px auto;padding:20px;box-shadow:0 0 10px #0000001a}mat-form-field[_ngcontent-%COMP%]{width:100%;margin-bottom:20px}"]});let p=o;return p})();export{J as RegisterComponent};
