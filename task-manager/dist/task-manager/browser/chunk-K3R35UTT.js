import{c as w}from"./chunk-TRNELGHZ.js";import{C as P,D as x,a as y,b as C,c as _,d as b,e as v,f as F,g as I,h as L,t as N,u as W}from"./chunk-D2G6HKVK.js";import{a as B,c as E}from"./chunk-UZ4HAGIG.js";import{a as T}from"./chunk-JMDEYX64.js";import{Ea as r,Fa as a,Ka as M,Na as d,Qa as u,Ra as p,Sa as g,U as f,Ua as h,ob as S,pa as s,qa as l}from"./chunk-JO6IUR6O.js";var H=(()=>{let n=class n{constructor(t,e){this.apiService=t,this.router=e,this.username="",this.password=""}onSubmit(){this.apiService.login(this.username,this.password).subscribe(t=>{if(t.length>0){let e=t[0];localStorage.setItem("currentUser",JSON.stringify(e)),e.role==="admin"?this.router.navigate(["/admin"]):this.router.navigate(["/tasks"])}else alert("Invalid credentials")},t=>{console.error("Login error",t),alert("An error occurred during login")})}};n.\u0275fac=function(e){return new(e||n)(l(T),l(w))},n.\u0275cmp=f({type:n,selectors:[["app-login"]],standalone:!0,features:[h],decls:10,vars:2,consts:[[1,"login-container"],[3,"ngSubmit"],["matInput","","placeholder","Username","name","username","required","",3,"ngModelChange","ngModel"],["matInput","","type","password","placeholder","Password","name","password","required","",3,"ngModelChange","ngModel"],["mat-raised-button","","color","primary","type","submit"]],template:function(e,i){e&1&&(r(0,"div",0)(1,"h2"),d(2,"Login"),a(),r(3,"form",1),M("ngSubmit",function(){return i.onSubmit()}),r(4,"mat-form-field")(5,"input",2),g("ngModelChange",function(o){return p(i.username,o)||(i.username=o),o}),a()(),r(6,"mat-form-field")(7,"input",3),g("ngModelChange",function(o){return p(i.password,o)||(i.password=o),o}),a()(),r(8,"button",4),d(9,"Login"),a()()()),e&2&&(s(5),u("ngModel",i.username),s(2),u("ngModel",i.password))},dependencies:[S,L,F,y,C,_,I,v,b,W,N,x,P,E,B],styles:[".login-container[_ngcontent-%COMP%]{max-width:300px;margin:50px auto;padding:20px;box-shadow:0 0 10px #0000001a}mat-form-field[_ngcontent-%COMP%]{width:100%;margin-bottom:20px}"]});let m=n;return m})();export{H as LoginComponent};
