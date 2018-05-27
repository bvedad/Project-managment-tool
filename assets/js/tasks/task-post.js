$(document).ready(function() {
    fetchFormData();

$('#button-submit').on("click", function() {
    postData();
});

function formatTimestamp(timestamp) {
    var date = new Date(timestamp * 1000);
    // date.setMilliseconds();
    return date.getDate() + '/' +
     (date.getMonth() + 1) + '/' +
      date.getFullYear() + '<br>' +
      date.getHours() + 'h:' +
      date.getMinutes() + 'm'; 
}

function fetchFormData() {
    $.get("rest/domains", function(data) {
        var dropdown = $("#domain-menu");
        $.each(data, function(index, value) {
            dropdown.append("<option>" + value.name + "</option>");
        });
    });
    
    $.get("rest/subjects", function(data) {
        var dropdown = $("#subject-menu");
        $.each(data, function(index, value) {
            dropdown.append("<option>" + value.name + "</option>");
        });
    });
    
    $.get("rest/priority-modes", function(data) {
        var dropdown = $("#priority-mode-menu");
        $.each(data, function(index, value) {
            dropdown.append("<option>" + value.title + "</option>");
        });
    });
}

function postData() {
        var title, body, domainId, subjectId, priorityModeId, finalDateTimestamp;
        title = $("#input-title").val();
        body = $("#input-body").val();
        domainId = $("#domain-menu").prop("selectedIndex");
        subjectId = $("#subject-menu").prop("selectedIndex");
        priorityModeId = $("#priority-mode-menu").prop("selectedIndex");
        finalDateTimestamp = getTimestamp(document.getElementById("input-final-date").value);
        if(!validateFields(title, body, domainId, subjectId, priorityModeId, finalDateTimestamp)) {
            return;
        }
        $.post("rest/tasks", {
            "title": title,
            "body": body,
            "domainId": domainId,
            "subjectId": subjectId,
            "priorityModeId": priorityModeId,
            "userId": getUser().id,
            "finalDateTimestamp": finalDateTimestamp
        }).done(function(data, status){
            if(status == 'success') {
                alert('Task created');
                document.location.reload();
            } else {
                alert('Task not created');
            }
        });
    }
    function getTimestamp(dateString) {
        if(dateString === '') {
            return null;
        }
        dateSplited = dateString.split('-');
        let year = dateSplited[0];
        let month = dateSplited[1] - 1;
        let day = dateSplited[2];
        let date = new Date(year, month, day, 0, 0, 0, 0);
        return date.getTime();
    }

    function validateFields(title, body, domainId, subjectId, priorityModeId, finalDateTimestamp) {
        if(title === '') {
            alert('Please enter title');
            return false;
        }
        if(body === '') {
            alert('Please enter body');
            return false;
        }
        if(domainId === 0) {
            alert('Please select domain');
            return false;
        }
        if(subjectId === 0) {
            alert('Please select subject');
            return false;
        }
        if(priorityModeId === 0) {
            alert('Please select priority mode');
            return false;
        }
        if(finalDateTimestamp === null) {
            alert('Please select date');
            return false;
        }
        return true;
    }
});