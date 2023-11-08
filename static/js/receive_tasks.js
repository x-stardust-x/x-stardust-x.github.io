const str_task = `
          <div class="card h-100" style="width: 18rem;">
            <img src="https://picsum.photos/1600/1600?random=10" class="card-img-top">
            <div class="card-body">
              <h4 class="d-flex justify-content-center">TASK_NAME</h4>
              <h5>現在人數: <span>PEOPLE_NOW</span>/<span>PEOPLE_MAX</span></h5>
              <h5>工作時間: <span>TASK_TOKEN</span></h5>
              <h5>積分限制: <span>TASK_POINT</span></h5>
              <a href="#" class="btn btn-primary d-flex justify-content-center">查看詳細</a>
            </div>
          </div>
        `

const user_point = get_point();
const user_des = get_des().description.hhhhhhh;

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
        // console.log(task_uuid);
        // console.log(task_name);
        // console.log(task_token);
        // console.log(people_max);
        // console.log(people_now);
        // console.log(task_point);
        // console.log(thumbnail);
        // console.log(task_des);
        var str_inner = str_task.replaceAll("TASK_NAME", task_name);
        str_inner = str_inner.replaceAll("TASK_TOKEN", task_token);
        str_inner = str_inner.replaceAll("THUMBNAIL", thumbnail);
        str_inner = str_inner.replaceAll("PEOPLE_NOW", index * 3);
        str_inner = str_inner.replaceAll("PEOPLE_MAX", people_max);
        str_inner = str_inner.replaceAll("TASK_POINT", task_point);
       

        var obj_task_block = document.createElement("div");
        if(compare_point(100 - index * 10) && compare_des(task_des)){
            // if(index * 3 < people_max){
                obj_task_block.className = "col mb-4 d-flex justify-content-center" ;
                obj_task_block.innerHTML = str_inner;
                mission.append(obj_task_block);
            // }
        }
        
        obj_task_block.setAttribute("id", "mission" + index);


    }
}

function compare_point(task_point) {
    console.log(user_point);
    console.log(task_point);
    if(user_point >= task_point){
        return 1;
    }
    return 0;
}

function compare_des(task_des) {
    console.log(user_des);
    // for (let i = 0; i<user_des.length; i++) {
    //     for (let j = 0; j < task_des.length; j++) {
    //         if(user_des[i] = task_des[i]){
    //             return 1;
    //         }
    //     }
    // }
    return 1;
    return 0;
}