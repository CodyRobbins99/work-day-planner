function loadTasks() {
    $(".task").each(function(){
        var key = "hour-" + $(this).data("hour");
        $(this).find(".description").text(localStorage.getItem(key));
    });
}

function renderCurrentDay() {
    var currentDay = moment().format("dddd, MMMM Do, YYYY");
    $("#currentDay").text(currentDay).attr("data-day", moment().format("D"));
}

function auditCurrentDay() {
    var dayOfMonth = moment().format("D");

    if ($("#currentDay").data("day") != dayOfMonth) {

        $(".description").each(function(){
          $(this).text("");
        });
        localStorage.clear();
        
        document.location.reload(true);
    }
}

function auditTasks() {

    var currentHour = moment().format("H");

    $(".task").each(function(){
        var dataHour = $(this).data("hour");

        if (currentHour > dataHour) { 
            $(this).removeClass("present");
            $(this).removeClass("future");
            $(this).addClass("past");
        }
        else if (currentHour == dataHour) {
            $(this).removeClass("past");
            $(this).removeClass("future");
            $(this).addClass("present");
        }
        else  {
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future");
        }
    });
}

$("#timeblocks").on("click", ".task", function(){
    var description = $(this).children(".description").text().trim();
    var textInput = $("<textarea>").val(description);
    $(this).children(".description").replaceWith(textInput);
    textInput.trigger("focus");
});

$("#timeblocks").on("click", ".saveBtn", function() {
    var description = $(this).siblings(".task").find("textarea").val();
    var taskP = $("<p>").addClass("description").text(description);
    $(this).siblings(".task").find("textarea").replaceWith(taskP);
    saveTask($(this).siblings(".task"));
});

function saveTask(task) {
    var key = "hour-" + $(task).data("hour");
    var description = $(task).find(".description").text();
    localStorage.setItem(key, description);
}


renderCurrentDay();
loadTasks();
auditTasks();
