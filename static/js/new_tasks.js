const doneBtn = document.getElementById('doneBtn');
doneBtn.addEventListener("click", function () {
  var form = new FormData();
  var uuid = "00000001";
  var email = "yillkid@gmail.com";
  var type = "1";
  var name = document.getElementById("task_name").value; // "test001";
  var overview = document.getElementById("overview").value;// "overview123";
  var token = document.getElementById("token").value; // "test001";
  var cover = getLocalStorage("task_cover");//`${TASK_COVER}`;
  var max_people = document.getElementById("people").value;
  var point_limit = document.getElementById("point").value;
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

  
  form.append("uuid", uuid);
  form.append("email", email);
  form.append("type", type);
  form.append("name", name);
  form.append("token", token);
  form.append("max_people", max_people);
  form.append("point_limit", point_limit);
  form.append("description_limit", JSON.stringify(obj_sed));
  form.append("overview", overview);
  form.append("cover", cover);

  let settings = {
    "url": `${HOST_URL_TPLANET_DAEMON}/tasks/new`,
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  };

  $.ajax(settings).done(function (res) {
    console.log(res);
    window.location.replace("/verifier-cms-list.html");
  });
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