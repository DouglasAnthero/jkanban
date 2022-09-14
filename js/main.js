var KanbanTest = new jKanban({
  element: "#myKanban",
  gutter: "10px",
  widthBoard: "450px",
  itemHandleOptions: {
    enabled: true,
  },
  click: function (el) {
    console.log("Trigger on all items click!");
  },
  context: function (el, e) {
    console.log("Trigger on all items right-click!");
  },
  dropEl: function (el, target, source, sibling) {
    console.log(target.parentElement.getAttribute('data-id'));
    console.log(el, target, source, sibling)
  },
  buttonClick: function (el, boardId) {
    console.log(el);
    console.log(boardId);
    // create a form to enter element
    var formItem = document.createElement("form");
    formItem.setAttribute("class", "itemform");
    formItem.innerHTML =
      '<div class="form-group"><textarea class="form-control" rows="2" autofocus></textarea></div><div class="form-group"><button type="submit" class="btn btn-primary btn-xs pull-right">Submit</button><button type="button" id="CancelBtn" class="btn btn-default btn-xs pull-right">Cancel</button></div>';

    KanbanTest.addForm(boardId, formItem);
    formItem.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = e.target[0].value;
      KanbanTest.addElement(boardId, {
        title: text
      });
      formItem.parentNode.removeChild(formItem);
    });
    document.getElementById("CancelBtn").onclick = function () {
      formItem.parentNode.removeChild(formItem);
    };
  },
  itemAddOptions: {
    enabled: true,
    content: '+ Add New Card',
    class: 'custom-button',
    footer: true
  },
  boards: [
    {
      id: "_todo",
      title: "A Fazer (Can drop item only in working) <i class='bi bi-pencil btnAlg'></i>",
      class: "Default,good",
      dragTo: ["_working"],
      item: [
        {
          id: "_test_delete",
          title: "Try drag this (Look the console) <i class='bi bi-trash btnAlg'></i>",
          drag: function (el, source) {
            console.log("START DRAG: " + el.dataset.eid);
          },
          dragend: function (el) {
            console.log("END DRAG: " + el.dataset.eid);
          },
          drop: function (el) {
            console.log("DROPPED: " + el.dataset.eid);
          }
        },
        {
          title: "Try Click This! <i class='bi bi-trash btnAlg'></i>",
          click: function (el) {
            alert("click");
          },
          context: function (el, e) {
            alert("right-click at (" + `${e.pageX}` + "," + `${e.pageX}` + ")")
          },
          class: ["peppe", "bello"]
        }
      ]
    },
    {
      id: "_working",
      title: "Em Execução (Try drag me too) <i class='bi bi-pencil btnAlg'></i>",
      class: "Default",
      item: [
        {
          title: "Do Something! <i class='bi bi-trash btnAlg'></i>"
        },
        {
          title: "Run? <i class='bi bi-trash btnAlg'></i>"
        }
      ]
    },
    {
      id: "_done",
      title: "Feito (Can drop item only in working) <i class='bi bi-pencil btnAlg'></i>",
      class: "Default",
      dragTo: ["_working"],
      item: [
        {
          title: "All right <i class='bi bi-trash btnAlg'></i>"
        },
        {
          title: "Ok! <i class='bi bi-trash btnAlg'></i>"
        }
      ]
    }
  ]
});

var toDoButton = document.getElementById("addToDo");
toDoButton.addEventListener("click", function () {
  KanbanTest.addElement("_todo", {
    title: "Test Add"
  });
});

var toDoButtonAtPosition = document.getElementById("addToDoAtPosition");
toDoButtonAtPosition.addEventListener("click", function () {
  KanbanTest.addElement("_todo", {
    title: "Test Add at Pos"
  }, 1);
});

var addBoardDefault = document.getElementById("addDefault");
addBoardDefault.addEventListener("click", function () {
  KanbanTest.addBoards([
    {
      id: "_default",
      title: "Kanban Default",
      item: [
        {
          title: "Default Item"
        },
        {
          title: "Default Item 2"
        },
        {
          title: "Default Item 3"
        }
      ]
    }
  ]);
});

var removeBoard = document.getElementById("removeBoard");
removeBoard.addEventListener("click", function () {
  KanbanTest.removeBoard("_done");
});

var removeElement = document.getElementById("removeElement");
removeElement.addEventListener("click", function () {
  KanbanTest.removeElement("_test_delete");
});

var allEle = KanbanTest.getBoardElements("_todo");
allEle.forEach(function (item, index) {
  //console.log(item);
});