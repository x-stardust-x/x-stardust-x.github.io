function navbar() {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  console.log(page);

  var title_name = "";
  var navbar = document.getElementById("navbar");
  if(navbar!=null){
    const str_nav = `<div class="container-fluid">
                <div class="col d-flex justify-content-start">
                  <a class="navbar-brand mb-0 h1" href="index.html">
                    <img class="mx-1" src="static/imgs/eID-logo.png" width="55" height="30">
                    <img src="static/imgs/ISU logo-s.png" width="55" height="30">
                  </a>
                </div>
                <div class="col text-center">
                  <p class="fs-2 mb-0 text-light">TITLE_NAME</p>
                </div>
                <div class="col d-flex justify-content-end">
                  <div class="dropdown">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <i class="bi bi-gear"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <div class="container justify-content-center">
                        <div class="row" id="dropdown">
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>`

  if (page == "choice.html"){
    title_name="選擇介面";
  } else if (page == "eid.html") {
    title_name="身分資訊";
  } else if (page == "executor-cms.html") {
    title_name="編輯資料";
  } else if (page == "wallet.html") {
    title_name="領取任務";
  } else if (page == "trade.html") {
    title_name="交易所";
  } else if (page == "trade-request.html") {
    title_name="交易設定";
  } else if (page == "verified-tasks.html") {
    title_name="歷史紀錄";
  } else if (page == "issues.html") {
    title_name="永續合作";
  }
  var str_inner = str_nav.replace("TITLE_NAME",title_name);
  navbar.innerHTML = str_inner;
  }
}
