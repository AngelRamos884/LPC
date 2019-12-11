
function getData(){
 
    $.get( "http://localhost:3000/getPulse", function( data ) {
    
       var P = data.data.map(function(v) {  return [v.pulse];  });

       var CD = data.data.map(function(v){ return [v.createdDate] });

       setChart(P, CD);

      });
}
function getByRoomByUser(){
    var params = {
      user: $("#dropDUsers option:selected").text(),
      date_from: $("#fromDate").val(),
      date_to: $("#toDate").val(),
      room:$("#dropDRooms option:selected").text(),
      type: $("#dropDTypes option:selected").text()
    }
    console.log(params)
$.ajax({
    type: "POST",
    url: "http://localhost:3000/getByRoomByUser",
    data:JSON.stringify(params),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (result) {
    
          console.log(result.data);
  
        table = $("#myTable").dataTable({
            destroy: true,
            data: result.data,
            columns: [
                { data: 'id' },
                { data: 'pulse' },
                { data: 'createdDate' }
            ],
            dom: 'Bfrtip',
            buttons: []
        });

    
    },
    error: function (err) {
        console.log("Error: " + err);
    }
});
}
function getParams(){

    var $dropDUsers = $('#dropDUsers');

    var $dropDRooms = $('#dropDRooms');

    var $dropDTypes = $('#dropDTypes');
    
    var typesDum = ['low', 'high']

    $dropDUsers.append($('<option/>', { value: -1, text: 'Select User' }));
    $dropDRooms.append($('<option/>', { value: -1, text: 'Select Room' }));
    $dropDTypes.append($('<option/>', { value: -1, text: 'Select Value' }));

    $.get( "http://localhost:3000/getParams", function( data ) {
    
        var users = data.data.map(function(v) {  return [v.createdBy];  });
 
        var rooms = data.data.map(function(v){ return [v.room] });
   
        $(users).each(function (index, item) {

            $dropDUsers.append($('<option />', { value: index, text: item }))

        });

        $(rooms).each(function (index, item) {

            $dropDRooms.append($('<option />', { value: index, text: item }))

        });

        $(typesDum).each(function (index, item) {

            $dropDTypes.append($('<option />', { value: index, text: item }))

        });
 
       });
}