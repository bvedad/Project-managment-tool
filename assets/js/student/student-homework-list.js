var homeworks;
$(document).ready(function() {
    $.ajax({
        method: "GET",
        url: "rest/homeworks",
        dataType: "script"
      }).done(function (data) {
          console.log(data);
          homeworks = data;
        //   data.forEach((function callback(element, index) {
        //       insertData(element, index);
        //   }));
      });
});

$('#button-submit').on("click", function() {
    var homeworkInput = $('#input-homework').val();
    var commentInput = $('#input-comment').val();
    if(homeworkInput === '') {
        alert('Homework can not be empty');
        return
    }
    var homeworkResponse = {
        'id': 1,
        'homework': homeworkInput,
        'comment': commentInput,
        'studentId': 100
    };
    $.post('rest/homeworks', homeworkInput).done(function(data) {
        console.log('Call done', data);
    });
});

function insertData(element, position) {
    document.getElementById("#homework-table-body").innerHTML += '<tr>' +
     wrapElementIntoTd(element.title) +
     wrapElementIntoTd(element.description) +
     wrapElementIntoTd(element.subject) +
     wrapElementIntoTd(formatTimestamp(element.dueDate)) +
     wrapElementIntoTd(formatTimestamp(element.datePosted)) + 
     wrapElementIntoTd('<button id="button' + position + '" onClick="showSubmitForm(' + position + ')"' +
      'class="btn btn-success"><span>Show</span></button>') +
      '<div' + ' style="display:none;" id = "element' + position + '">' + getSubmitForm() + '</div>' +
      '</tr>';
}

function wrapElementIntoTd(element) {
    return '<td>' + element + '</td>';
}

function formatTimestamp(timestamp) {
    var date = new Date(timestamp * 1000);
    // date.setMilliseconds();
    return date.getDate() + '/' +
     (date.getMonth() + 1) + '/' +
      date.getFullYear() + '<br>' +
      date.getHours() + 'h:' +
      date.getMinutes() + 'm'; 
}

function getSubmitForm() {
    return '<div style="height:200px;">Vedadad</div>';
}

function showSubmitForm(position) {
    $('#element' + position).toggle();
    if($('#element' + position).is(":visible")) {
        $('#button' + position).text("Hide");
    } else {
        $('#button' + position).text("Show");
    }
}