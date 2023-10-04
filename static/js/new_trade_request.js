const doneBtn = document.getElementById('doneBtn');
doneBtn.addEventListener("click", function () {
  var form = new FormData();
  var email = getLocalStorage("email");
  var name = document.getElementById("task_name").value;
  var overview = document.getElementById("overview").value;
  var token = document.getElementById("token").value;
  var people = document.getElementById("people").value;
  var point = document.getElementById("point").value;
  let checkArray = [];
  var obj_sed = {};
  var index_chk_box = 0;
  while (true) {
    if (document.getElementById("gridCheck" + (++index_chk_box).toString()) == null) {
      break;
    }
    if (document.getElementById("gridCheck" + (index_chk_box).toString()).checked) {
      checkArray.push(document.getElementById("gridCheck" + (index_chk_box).toString()).value);
    }
  }
  obj_sed.hhhhhhh = checkArray;
  if (document.getElementById("otherCheck") != null ) { //&& document.getElementById("otherCheck").checked
    checkArray.push("其他"); 
    obj_sed.others = document.getElementById("textArea").value;
  }
  var cover = getLocalStorage("task_cover"); // `${TASK_COVER}`;
  var balance = getLocalStorage("balance");
  //parseFloat(balance) >= parseFloat(token)
   if (1) {
    form.append("email", email);
    form.append("name", name);
    form.append("token", token);
    form.append("people", people);
    form.append("point", point);
    form.append("description", JSON.stringify(obj_sed));
    form.append("overview", overview);
    form.append("cover", cover);
    form.append("balance", balance);
    //https://isu-backend.townway.com.tw/trade_request/create_request
    let settings = {
      "url": `http://127.0.0.1:8000/create_request`,
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form,
    };

    $.ajax(settings).done(function (res) {
      console.log(res);
      //window.location.replace("/trade.html");
    });
   }
   else {
     console.log("餘額不夠");
     window.alert("很抱歉，您的時間餘額不夠導致交易無法送出")
   }
});


function checkBoxFn() {
  let otherCheck = document.getElementById("otherCheck");
  let textArea = document.getElementById("textArea");
  if (otherCheck.checked === true) {
    textArea.style.display = "block";
  } else {
    textArea.style.display = "none";
    textArea.value = "";
  }
}