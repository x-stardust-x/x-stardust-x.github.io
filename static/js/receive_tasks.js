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

function set_task_list(task_lists) {
    let mission = document.getElementById("mission_list");
    
    for (let index = 0; index < 7; index++) {
        var gtos = get_task_objects();
        console.log(gtos);
        var task_name = gtos.task_name;
        var task_token = gtos.task_cost;
        var people_max = gtos.max_people;
        var people_now = gtos.now_people;
        var task_point = gtos.point_limit;
        var thumbnail = gtos.thumbnail;
        var task_des = gtos.description_limit.hhhhhhh;
        console.log(thumbnail);
        
        var str_inner = str_task.replaceAll("TASK_NAME", task_name);
        str_inner = str_inner.replaceAll("TASK_TOKEN", task_token);
        str_inner = str_inner.replaceAll("THUMBNAIL", thumbnail);
        str_inner = str_inner.replaceAll("PEOPLE_NOW", index * 3);
        str_inner = str_inner.replaceAll("PEOPLE_MAX", people_max);
        str_inner = str_inner.replaceAll("TASK_POINT", 100 - index * 10);
       

        var obj_task_block = document.createElement("div");
        if(compare_point(100 - index * 10) && compare_des(task_des)){
            if(index * 3 < people_max){
                obj_task_block.className = "col mb-4 d-flex justify-content-center" ;
                obj_task_block.innerHTML = str_inner;
                mission.append(obj_task_block);
            }
        }
        
        // obj_task_block.setAttribute("id", "mission" + index);


    }
}

function compare_point(task_point) {
    const user_point = get_point();
    if(user_point >= task_point){
        return 1;
    }
    return 0;
}

function compare_des(task_des) {
    const user_des = get_des().description.hhhhhhh;
    for (let i = 0; i<user_des.length; i++) {
        for (let j = 0; j < task_des.length; j++) {
            if(user_des[i] = task_des[i]){
                return 1;
            }
        }
    }
    return 0;
}