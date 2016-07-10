'use strict';
var textInput = document.querySelector('#textInput');
var addButton = document.querySelector('.addButton');
var divContainer = document.querySelector('.divContainer');
var url = 'https://mysterious-dusk-8248.herokuapp.com/todos';

function getTodos() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      data.forEach(function (e, i) {
        createAnElement(data[i].id, data[i].text);
        if (e.completed) {
          document.getElementById('chk'+data[i].id).classList.add('checked');
        }
      })
    }
  };
  xhr.send();
}

function addNewTodo() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      createAnElement(data.id, data.text);
    };
  }
  var newTodoToAdd = {
    text: textInput.value
  };
  textInput.value ='';
  xhr.send(JSON.stringify(newTodoToAdd));
}

function createAnElement(id, dataText) {
  var newTodo = document.createElement('div');
  newTodo.classList.add("todo-item");
  newTodo.innerHTML = '<div class="task">' + dataText + '</div><button id = "d' + id + '" class="delButton"></button><button id = "chk' + id + '" class="chkButton"></button>';
  newTodo.setAttribute('id', 'di'+id);
  divContainer.appendChild(newTodo);
  document.getElementById('d'+id).addEventListener('click', delTodo);
  document.getElementById('chk'+id).addEventListener('click', chkTodo);
  document.getElementById('chk'+id).classList.add('unchecked');
}

function delTodo(event) {
  var xhr = new XMLHttpRequest();
  var id = event.target.getAttribute('id').slice(1);
  xhr.open('DELETE', url + '/' + id, true);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onload = function() {
    if (xhr.readyState === 4) {
      divContainer.removeChild(document.getElementById('di'+id));
    }
  }
  xhr.send(null);
}

function chkTodo(event) {
  var xhr = new XMLHttpRequest();
  var id = event.target.getAttribute('id').slice(3);
  var toSend = {
    text: document.querySelector('#di'+id + ' div').textContent,
    completed: true
  };
  xhr.open('PUT', url + '/' + id, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.readyState === 4) {
      document.getElementById('chk'+id).classList.add('checked');
    }
  }
  xhr.send(JSON.stringify(toSend));
}

getTodos();
addButton.addEventListener('click', addNewTodo);
