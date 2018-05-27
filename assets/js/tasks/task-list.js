const TODO_MODE = 0, IN_PROGRESS_MODE = 1, DONE_MODE = 2;
let dataArray;
$(document).ready(function() {
    fetchUserTasks();
    
    function insertData(element, position) {
        document.getElementById("container").innerHTML += '<div class="col-sm-6" style="margin-top:10px;">' +
        insertPosition(position + 1) + 
        insertElement('Title', element.title) +
         insertElement('Body', element.body) +
         insertElement('Subject', element.subject_name) +
         insertElement('Priority', element.priority_mode_name) +
         insertElement('Domain', element.domain_name) +
         insertElement('Final date', formatTimestamp(element.final_date)) +
         '<div class="row">' +
         insertButton(position, TODO_MODE) +
         insertButton(position, IN_PROGRESS_MODE) +
         insertButton(position, DONE_MODE) +
         '</div>' +
          '</div>';
    }
    
    function insertPosition(position) {
        return '<div class="row">' + position + '. TASK</div>';
    }

    function insertElement(header, value) {
        return '<div class="row"><div class="col-xs-4">' + header + ': </div>' + '<div class="col-xs-8">' + value + '</div></div>';
    }

    function insertButton(position, mode) {
        let buttonLabel;
        let modeId = 'button-' + position;
        if(mode === TODO_MODE) {
            buttonLabel = 'Todo';
            modeId += '-todo';
        } else if(mode === IN_PROGRESS_MODE) {
            buttonLabel = 'In progress';
            modeId += '-in_progress';
        } else if(mode === DONE_MODE) {
            buttonLabel = 'Done';
            modeId += '-done';
        }
        return '<button id="' + modeId + '" onClick="showSubmitForm(' + position + ', ' + mode + ')"' +
          'class="btn btn-success col-md-3 col-xs-12" style="margin:0px 5px">' + buttonLabel + '</button>';
    }

    function formatTimestamp(timestamp) {
        return new Date(parseInt(timestamp)).toLocaleDateString("en-US");
    }

    function fetchUserTasks() {
        $.get('rest/users/' + getUser().id + '/tasks', function(data) {
            dataArray = data;
            for(let i = 0;i < data.length;i++) {
                insertData(data[i], i);
            }
        })
    }
});

function showSubmitForm(position, mode) {
    manageButton(position, mode);
    let taskId = dataArray[position].id;
    $.post('rest/users/tasks/' + taskId, {
        status: mode
    }).done(function(data) {
        debugger
    });
}
function manageButton(position, mode) {
    if(mode === TODO_MODE) {
        debugger
        $('#button-' + position + '-todo').prop('disabled', true);
        $('#button-' + position + '-in_progress').prop('disabled', false);
        $('#button-' + position + '-done').prop('disabled', false);
        $('#button-' + position + '-todo').addClass('btn-danger');
        $('#button-' + position + '-in_progress').removeClass('btn-danger');
        $('#button-' + position + '-done').removeClass('btn-danger');
    } else if(mode === IN_PROGRESS_MODE) {
        $('#button-' + position + '-todo').prop('disabled', false);
        $('#button-' + position + '-in_progress').prop('disabled', true);
        $('#button-' + position + '-done').prop('disabled', false);
        $('#button-' + position + '-todo').removeClass('btn-danger');
        $('#button-' + position + '-in_progress').addClass('btn-danger');
        $('#button-' + position + '-done').removeClass('btn-danger');
    } else if(mode === DONE_MODE) {
        $('#button-' + position + '-todo').prop('disabled', false);
        $('#button-' + position + '-in_progress').prop('disabled', false);
        $('#button-' + position + '-done').prop('disabled', true);
        $('#button-' + position + '-todo').removeClass('btn-danger');
        $('#button-' + position + '-in_progress').removeClass('btn-danger');
        $('#button-' + position + '-done').addClass('btn-danger');
    }
}