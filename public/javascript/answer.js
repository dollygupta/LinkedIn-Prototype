var userInput = 0;
var baseUrl = "http://localhost:4000/";


//Function to assign operand and value to the display text
function accept()
{
	    var requestId = $('.messageCheckbox:checked').val();
	var action= "accept";
	var finalUrl= baseUrl + "answerRequest";
	sendAjaxRequest(finalUrl,requestId,action);
}

function ignore()
{
	 var requestId = $('.messageCheckbox:checked').val();
	var action= "ignore";
	var finalUrl= baseUrl + "answerRequest";
	sendAjaxRequest(finalUrl,requestId,action);
	
}
function sendAjaxRequest(finalUrl,requestId,action)
{
	$.ajax({
      url:finalUrl,
      type:'GET',
      data:{"action": action,"requestId": requestId},
      success: function(result) {
      	if(result == "Error")
      	{
      		alert("Oops there is error in signing up!!");
      	}
      	else
      		{
      		alert("Done");
      		}
      },
      error: function(jqXHR, textStatus, errorThrown) {
      	alert('error ' + textStatus + " " + errorThrown);
      }
  });
}