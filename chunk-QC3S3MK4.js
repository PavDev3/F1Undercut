import{a as x}from"./chunk-M7DTCALV.js";import{a as h}from"./chunk-Z5EE4BT6.js";import"./chunk-WMJCJ33X.js";import"./chunk-P32JNNSH.js";import{$ as n,G as M,L as i,M as l,T as p,W as P,aa as t,ba as C,fa as e,ga as d,ia as O,ja as _,ma as s,na as f,x as m,ya as v}from"./chunk-MUYU46A6.js";var S=(()=>{let r=class r{constructor(g,a){this.route=g,this.driversService=a}ngOnInit(){this.driverId=this.route.snapshot.paramMap.get("id"),this.driverId&&this.loadDriverDetails()}loadDriverDetails(){this.driver=this.driversService.getDriverById(this.driverId)??{},this.driver||console.log("No se encontr\xF3 el driver")}};r.\u0275fac=function(a){return new(a||r)(l(v),l(x))},r.\u0275cmp=m({type:r,selectors:[["driver-details"]],standalone:!0,features:[_],decls:31,vars:11,consts:[[1,"container"],[1,"header"],[1,"driver-name"],[1,"driver-card"],[1,"info-grid"],[1,"info-item"],[1,"label"],[1,"value","nationality"],[1,"value","number"],[1,"value"],["target","_blank",1,"value","link",3,"href"]],template:function(a,o){a&1&&(n(0,"div",0)(1,"div",1)(2,"h1"),e(3,"Detalles del Piloto"),t(),n(4,"div",2),e(5),t()(),n(6,"div",3)(7,"div",4)(8,"div",5)(9,"span",6),e(10,"Nacionalidad"),t(),n(11,"div",7),C(12,"div"),n(13,"span"),e(14),t()()(),n(15,"div",5)(16,"span",6),e(17,"N\xFAmero Permanente"),t(),n(18,"span",8),e(19),t()(),n(20,"div",5)(21,"span",6),e(22,"Fecha de Nacimiento"),t(),n(23,"span",9),e(24),s(25,"dateFormat"),t()(),n(26,"div",5)(27,"span",6),e(28,"Wikipedia"),t(),n(29,"a",10),e(30," Ver biograf\xEDa "),t()()()()()),a&2&&(i(5),O(" ",o.driver.givenName," ",o.driver.familyName," "),i(7),P("fflag ff-md ","fflag-"+o.driver.nationality.replaceAll(" ",""),""),i(2),d(o.driver.nationality),i(5),d(o.driver.permanentNumber),i(5),d(f(25,9,o.driver.dateOfBirth)),i(5),p("href",o.driver.url,M))},dependencies:[h],styles:[".container[_ngcontent-%COMP%]{padding:20px;max-width:1200px;margin:0 auto}.header[_ngcontent-%COMP%]{margin-bottom:30px;text-align:center}.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2rem;font-weight:700;margin-bottom:10px;color:#15151e}.header[_ngcontent-%COMP%]   .season-info[_ngcontent-%COMP%]{color:#666;font-size:1.1rem}.modern-table[_ngcontent-%COMP%]{width:100%;border-collapse:separate;border-spacing:0 8px}.modern-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:15px;text-align:left;color:#666;font-weight:500;border-bottom:2px solid #e2e2e2}.modern-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child{padding-left:20px}.modern-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child{padding-right:20px}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{background:white;box-shadow:0 2px 4px #00000014;transition:transform .2s}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{transform:translate(5px);box-shadow:0 4px 8px #0000001f}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:15px;border:none}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{border-radius:8px 0 0 8px;padding-left:20px}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child{border-radius:0 8px 8px 0;padding-right:20px}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#15151e;font-weight:500;transition:color .2s}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#e10600}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.nationality[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.nationality[_ngcontent-%COMP%]   .fflag[_ngcontent-%COMP%]{margin-right:8px}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.number[_ngcontent-%COMP%]{font-weight:700;color:#15151e}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .surname[_ngcontent-%COMP%]{font-weight:700;color:#15151e;margin-right:5px}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .firstname[_ngcontent-%COMP%]{color:#666}@media (max-width: 767px){.container[_ngcontent-%COMP%]{padding:10px}.modern-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:10px;font-size:.9rem}.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.5rem}.header[_ngcontent-%COMP%]   .season-info[_ngcontent-%COMP%]{font-size:1rem}}.driver-name[_ngcontent-%COMP%]{font-size:1.5rem;color:#666;margin-top:10px}.driver-card[_ngcontent-%COMP%]{background:white;border-radius:12px;box-shadow:0 2px 4px #00000014;padding:30px;margin-top:20px;transition:transform .2s}.driver-card[_ngcontent-%COMP%]:hover{transform:translateY(-5px);box-shadow:0 4px 8px #0000001f}.info-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:25px}.info-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.info-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{font-size:.9rem;color:#666;text-transform:uppercase;letter-spacing:.5px}.info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{font-size:1.1rem;color:#15151e;font-weight:500}.info-item[_ngcontent-%COMP%]   .value.nationality[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px}.info-item[_ngcontent-%COMP%]   .value.nationality[_ngcontent-%COMP%]   .fflag[_ngcontent-%COMP%]{margin-right:8px}.info-item[_ngcontent-%COMP%]   .value.number[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#e10600}.info-item[_ngcontent-%COMP%]   .value.link[_ngcontent-%COMP%]{color:#15c;text-decoration:none;transition:color .2s}.info-item[_ngcontent-%COMP%]   .value.link[_ngcontent-%COMP%]:hover{color:#e10600}@media (max-width: 767px){.driver-card[_ngcontent-%COMP%]{padding:20px}.info-grid[_ngcontent-%COMP%]{gap:20px}.info-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{font-size:.8rem}.info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{font-size:1rem}.info-item[_ngcontent-%COMP%]   .value.number[_ngcontent-%COMP%], .driver-name[_ngcontent-%COMP%]{font-size:1.3rem}}"]});let c=r;return c})();export{S as DriverDetailsComponent};
