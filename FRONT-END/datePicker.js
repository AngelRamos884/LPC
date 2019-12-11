//DatePicker para set de fechas y contenido escuchar
$(function () {
    
     var from = $("#fromDate")
       .datepicker({ 
           dayNamesMin: ["Do", "Lu", "Ma", "Mie", "Jue", "Vie", "Sab"],
           monthNames: [ "Ene", "Feb", "Mar", "Apri", "May", "Jun", "Ju", "Ago", "Sep", "Oct", "Nov", "Dec" ],
           dateFormat: "yy-mm-dd",
           changeMonth: true
       })
       .datepicker("setDate", new Date())
       .on("change", function () {
           to.datepicker("option", "minDate", getDate(this));
       }),
     to = $("#toDate").datepicker({
         dayNamesMin: ["Do", "Lu", "Ma", "Mie", "Jue", "Vie", "Sab"],
         monthNames: ["Ene", "Feb", "Mar", "Apri", "May", "Jun", "Ju", "Ago", "Sep", "Oct", "Nov", "Dec"],
         dateFormat: "yy-mm-dd",
         changeMonth: true
     })
     .datepicker("setDate", new Date())
     .on("change", function () {
         from.datepicker("option", "maxDate", getDate(this));
     });
 
     function getDate(element) {
         var date;
         var dateFormat = "yy-mm-dd";
         try {
             date = $.datepicker.parseDate(dateFormat, element.value);
         } catch (error) {
             date = null;
         }
 
         return date;
     }
 
     $("#fromDate").on("change",() => {
        date_from = $('#fromDate').val();
         
     });
     $("#toDate").on("change", () => {
        date_to = $('#toDate').val();
         
     });
 
 });