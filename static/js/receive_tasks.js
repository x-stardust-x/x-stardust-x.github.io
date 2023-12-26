const str_task =
    `
    <div class="card w-100">
        <img src="${HOST_URL_TPLANET_DAEMON}THUMBNAIL" class="card-img-top h-100">
        <div class="card-body">
            <h4 class="d-flex justify-content-center">TASK_NAME</h4>
            <h5>現在人數: <span>PEOPLE_NOW</span>/<span>PEOPLE_MAX</span></h5>
            <h5>工作時間: <span>TASK_TOKEN</span></h5>
            <h5>積分限制: <span>TASK_POINT</span></h5>
            <a class="btn btn-info d-flex justify-content-center mb-3" data-bs-toggle="modal" data-bs-target="#MISSION_NUMBER">查看詳細</a>
            <button class="btn btn-danger d-flex justify-content-center col-12" onclick="task_save(TASK_UUID)">獲取任務</button>
        </div>
    </div>
`
const modal_task = `
<div class="modal fade" id="MISSION_NUMBER" tabindex="-1" aria-labelledby="MISSION_LABEL_NUMBER" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="MISSION_LABEL_NUMBER">任務詳細內容</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h4>名稱</h4><p>TASK_NAME</p>
                <h4>時長</h4><p>TASK_TOKEN小時</p>
                <h4>現在人數</h4><p>PEOPLE_NOW人</p>
                <h4>最多人數</h4><p>PEOPLE_MAX人</p>
                <h4>積分</h4><p>TASK_POINT分</p>
                <h4>專長</h4><p>TASK_DES</p>
                <h4>理念</h4><p>TASK_OVERVIEW</p>
            </div>
        </div>
    </div>
</div>
`
const user_point = get_point();
const user_des = get_des().description.hhhhhhh;

function set_task_list(list_tasks) {
    let mission = document.getElementById("mission_list");
    let modal = document.getElementById("task_modal_area");
    var number = 0;
    for (let index = 0; index < list_tasks.length; index++) {
        var obj_task = get_task_info(list_tasks[index]);
        console.log(obj_task);
        var task_uuid = obj_task.uuid;
        var task_name = obj_task.name;
        var task_token = obj_task.token;
        var people_max = obj_task.max_people;
        var people_now = obj_task.now_people;
        var task_point = obj_task.point_limit;
        var thumbnail = obj_task.thumbnail;
        var task_des = obj_task.description_limit;
        var task_overview = obj_task.overview;
        if (task_des == null) {
            task_des = {};
        }
        //str_task
        var str_task_inner = str_task.replaceAll("TASK_UUID", task_uuid);
        str_task_inner = str_task_inner.replaceAll("TASK_NAME", task_name);
        str_task_inner = str_task_inner.replaceAll("TASK_TOKEN", task_token);
        str_task_inner = str_task_inner.replaceAll("THUMBNAIL", thumbnail);
        str_task_inner = str_task_inner.replaceAll("PEOPLE_NOW", people_now);
        str_task_inner = str_task_inner.replaceAll("PEOPLE_MAX", people_max);
        str_task_inner = str_task_inner.replaceAll("TASK_POINT", task_point);

        //modal_task
        var modal_task_inner = modal_task.replaceAll("TASK_NAME", task_name);
        modal_task_inner = modal_task_inner.replaceAll("TASK_TOKEN", task_token);
        modal_task_inner = modal_task_inner.replaceAll("PEOPLE_NOW", people_now);
        modal_task_inner = modal_task_inner.replaceAll("PEOPLE_MAX", people_max);
        modal_task_inner = modal_task_inner.replaceAll("TASK_POINT", task_point);
        modal_task_inner = modal_task_inner.replaceAll("TASK_OVERVIEW", task_overview);

        var obj_task_block = document.createElement("div");
        var modal_block = document.createElement("div");
        if (compare_point(task_point) && compare_des(task_des)) {
            if (people_now < people_max) {
                number++;
                obj_task_block.className = "col mb-3 d-flex justify-content-center";
                str_task_inner = str_task_inner.replaceAll("MISSION_NUMBER", "mission" + number);
                modal_task_inner = modal_task_inner.replaceAll("TASK_DES", des_list(task_des));
                modal_task_inner = modal_task_inner.replaceAll("MISSION_NUMBER", "mission" + number)
                modal_task_inner = modal_task_inner.replaceAll("MISSION_LABEL_NUMBER", "missionlabel" + number)
                obj_task_block.innerHTML = str_task_inner;
                modal_block.innerHTML = modal_task_inner;
                mission.append(obj_task_block);
                modal.append(modal_block);
            }
        }
    }
}

function des_list(task_des) {
    task_des = JSON.parse(task_des);
    task_des = task_des.hhhhhhh;
    return task_des;
}

function compare_point(task_point) {
    if (user_point >= task_point) {
        return 1;
    }
    return 0;
}

function compare_des(task_des) {
    task_des = JSON.parse(task_des);
    task_des = task_des.hhhhhhh;
    for (let i = 0; i < user_des.length; i++) {
        for (let j = 0; j < task_des.length; j++) {
            if (user_des[i] == task_des[j] && task_des[j] != "其他") {
                return 1;
            }
        }
    }
    return 0;
}

function task_save(uuid) {
    var dataJSON = {};
    dataJSON.email = getLocalStorage("email");
    dataJSON.uuid = uuid;
    pass_flag_eid = 0;
    pass_flag_tplanet = 0;
    $.ajax({
        url: HOST_URL_EID_DAEMON + "/tasks/save",
        type: "POST",
        async: false,
        crossDomain: true,
        data: dataJSON,
        success: function (returnData) {
            console.log(returnData);
            pass_flag_eid = 1;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(thrownError);
            alert("你已經接過此任務了!!!\n請重新選擇任務");
        }
    });
    if (pass_flag_eid) {
        $.ajax({
            url: HOST_URL_TPLANET_DAEMON + "/tasks/add_nowpeople",
            type: "POST",
            async: false,
            crossDomain: true,
            data: dataJSON,
            success: function (returnData) {
                console.log(returnData);
                pass_flag_tplanet = 1;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
            }
        });
    }
    if (pass_flag_eid && pass_flag_tplanet) {
        window.location.replace("/issues.html");
    }
}