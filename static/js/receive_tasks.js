function get_task_objects() {
    // 現在人數、總人數、積分、任務專長
    const form = new FormData();
    form.append("email", getLocalStorage('email'));
    var dataJason = {};
    let settings = {
        url: `http://127.0.0.1:8000/get_data`,
        method: "POST",
        timeout: 0,
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form,
        async: false
    };

    $.ajax(settings).done(function (taskObs) {
        const task_Obs = JSON.parse(taskObs);
        dataJason = task_Obs;
    });

    return dataJason;
}


    var get_task_objects = get_task_objects();
    console.log(get_task_objects);
    var people_max = get_task_objects.max_people;
    console.log(people_max);
    var people_now = get_task_objects.now_people;
    console.log(people_now);
    var point = get_task_objects.point_limit;
    console.log(point);
    var des_skill = get_task_objects.description_limit.hhhhhhh;
    console.log(des_skill);
    var des_other = get_task_objects.description_limit.others;
    console.log(des_other);
