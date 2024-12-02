import{a as f}from"./chunk-P6WAGQW2.js";import"./chunk-P32JNNSH.js";import{$ as t,G as s,L as o,M as l,T as M,W as p,aa as n,ba as O,fa as e,ga as m,ha as c,ja as P,x as C,ya as _}from"./chunk-MUYU46A6.js";var u=(()=>{let a=class a{constructor(g,r){this.route=g,this.tracksService=r}ngOnInit(){this.circuitId=this.route.snapshot.paramMap.get("id"),this.circuitId&&this.loadTrackDetails()}loadTrackDetails(){this.track=this.tracksService.getTrackById(this.circuitId)??{},this.track||console.log("No track found")}};a.\u0275fac=function(r){return new(r||a)(l(_),l(f))},a.\u0275cmp=C({type:a,selectors:[["track-details"]],standalone:!0,features:[P],decls:33,vars:9,consts:[[1,"container"],[1,"header"],[1,"track-name"],[1,"track-card"],[1,"info-grid"],[1,"info-item"],[1,"label"],[1,"value","nationality"],[1,"value"],[1,"value","coordinates"],["target","_blank",1,"value","link",3,"href"]],template:function(r,i){r&1&&(t(0,"div",0)(1,"div",1)(2,"h1"),e(3,"Detalles del Circuito"),n(),t(4,"div",2),e(5),n()(),t(6,"div",3)(7,"div",4)(8,"div",5)(9,"span",6),e(10,"Pa\xEDs"),n(),t(11,"div",7),O(12,"div"),t(13,"span"),e(14),n()()(),t(15,"div",5)(16,"span",6),e(17,"Ciudad"),n(),t(18,"span",8),e(19),n()(),t(20,"div",5)(21,"span",6),e(22,"Coordenadas"),n(),t(23,"div",9)(24,"span"),e(25),n(),t(26,"span"),e(27),n()()(),t(28,"div",5)(29,"span",6),e(30,"Wikipedia"),n(),t(31,"a",10),e(32," Ver informaci\xF3n del circuito "),n()()()()()),r&2&&(o(5),c(" ",i.track.circuitName," "),o(7),p("fflag ff-md ","fflag-"+i.track.Location.country.replaceAll(" ",""),""),o(2),m(i.track.Location.country),o(5),m(i.track.Location.locality),o(6),c("Lat: ",i.track.Location.lat,""),o(2),c("Long: ",i.track.Location.long,""),o(4),M("href",i.track.url,s))},styles:[".container[_ngcontent-%COMP%]{padding:20px;max-width:1200px;margin:0 auto}.header[_ngcontent-%COMP%]{margin-bottom:30px;text-align:center}.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2rem;font-weight:700;margin-bottom:10px;color:#15151e}.header[_ngcontent-%COMP%]   .season-info[_ngcontent-%COMP%]{color:#666;font-size:1.1rem}.modern-table[_ngcontent-%COMP%]{width:100%;border-collapse:separate;border-spacing:0 8px}.modern-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:15px;text-align:left;color:#666;font-weight:500;border-bottom:2px solid #e2e2e2}.modern-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child{padding-left:20px}.modern-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child{padding-right:20px}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{background:white;box-shadow:0 2px 4px #00000014;transition:transform .2s}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{transform:translate(5px);box-shadow:0 4px 8px #0000001f}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:15px;border:none}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{border-radius:8px 0 0 8px;padding-left:20px}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child{border-radius:0 8px 8px 0;padding-right:20px}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#15151e;font-weight:500;transition:color .2s}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#e10600}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.nationality[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.nationality[_ngcontent-%COMP%]   .fflag[_ngcontent-%COMP%]{margin-right:8px}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td.number[_ngcontent-%COMP%]{font-weight:700;color:#15151e}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .surname[_ngcontent-%COMP%]{font-weight:700;color:#15151e;margin-right:5px}.modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .firstname[_ngcontent-%COMP%]{color:#666}@media (max-width: 767px){.container[_ngcontent-%COMP%]{padding:10px}.modern-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .modern-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:10px;font-size:.9rem}.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.5rem}.header[_ngcontent-%COMP%]   .season-info[_ngcontent-%COMP%]{font-size:1rem}}.track-name[_ngcontent-%COMP%]{font-size:1.5rem;color:#666;margin-top:10px}.track-card[_ngcontent-%COMP%]{background:white;border-radius:12px;box-shadow:0 2px 4px #00000014;padding:30px;margin-top:20px;transition:transform .2s}.track-card[_ngcontent-%COMP%]:hover{transform:translateY(-5px);box-shadow:0 4px 8px #0000001f}.info-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:25px}.info-item[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.info-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{font-size:.9rem;color:#666;text-transform:uppercase;letter-spacing:.5px}.info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{font-size:1.1rem;color:#15151e;font-weight:500}.info-item[_ngcontent-%COMP%]   .value.nationality[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px}.info-item[_ngcontent-%COMP%]   .value.nationality[_ngcontent-%COMP%]   .fflag[_ngcontent-%COMP%]{margin-right:8px}.info-item[_ngcontent-%COMP%]   .value.coordinates[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:4px;font-family:monospace;font-size:1rem}.info-item[_ngcontent-%COMP%]   .value.link[_ngcontent-%COMP%]{color:#15c;text-decoration:none;transition:color .2s}.info-item[_ngcontent-%COMP%]   .value.link[_ngcontent-%COMP%]:hover{color:#e10600}@media (max-width: 767px){.track-card[_ngcontent-%COMP%]{padding:20px}.info-grid[_ngcontent-%COMP%]{gap:20px}.info-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{font-size:.8rem}.info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{font-size:1rem}.info-item[_ngcontent-%COMP%]   .value.coordinates[_ngcontent-%COMP%]{font-size:.9rem}.track-name[_ngcontent-%COMP%]{font-size:1.3rem}}"]});let d=a;return d})();export{u as TrackDetailsComponent};