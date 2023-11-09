const str_task = `
          <div class="card h-100" style="width: 18rem;">
            <img src="${HOST_URL_TPLANET_DAEMON}THUMBNAIL" class="card-img-top">
            <div class="card-body">
              <h4 class="d-flex justify-content-center">TASK_NAME</h4>
              <h5>現在人數: <span>PEOPLE_NOW</span>/<span>PEOPLE_MAX</span></h5>
              <h5>工作時間: <span>TASK_TOKEN</span></h5>
              <h5>積分限制: <span>TASK_POINT</span></h5>
              <a href="/verifier-cms-content.html?task=UUID" class="btn btn-primary d-flex justify-content-center">查看詳細</a>
            </div>
          </div>
        `

const user_point = get_point();
const user_des = get_des().description.hhhhhhh;

console.log(user_point);
console.log(user_des);

function set_task_list(list_tasks) {
    let mission = document.getElementById("mission_list");

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
        if(task_des ==null){
            task_des={};
        }
        var str_inner=str_task.replaceAll("UUID",task_uuid);
        str_inner = str_inner.replaceAll("TASK_NAME", task_name);
        str_inner = str_inner.replaceAll("TASK_TOKEN", task_token);
        str_inner = str_inner.replaceAll("THUMBNAIL", thumbnail);
        str_inner = str_inner.replaceAll("PEOPLE_NOW", people_now);
        str_inner = str_inner.replaceAll("PEOPLE_MAX", people_max);
        str_inner = str_inner.replaceAll("TASK_POINT", task_point);


        var obj_task_block = document.createElement("div");
        // obj_task_block.setAttribute("id", "mission" + index);
        if (compare_point(task_point) && compare_des(task_des)) {
            if(people_now < people_max){
                obj_task_block.className = "col mb-4 d-flex justify-content-center";
                obj_task_block.innerHTML = str_inner;
                mission.append(obj_task_block);
            }
        }
    }

    


}

function compare_point(task_point) {
    console.log(task_point);
    if (user_point >= task_point) {
        return 1;
    }
    return 0;
}

function compare_des(task_des) {
    task_des = JSON.parse(task_des);
    task_des = task_des.hhhhhhh;
    console.log(task_des.hhhhhhh);
    for (let i = 0; i < user_des.length; i++) {
        for (let j = 0; j < task_des.length; j++) {
            if (user_des[i] == task_des[j] && task_des[j] != "其他") {
                console.log(user_des[i]);
                return 1;
            }
        }
    }
    return 0;
}