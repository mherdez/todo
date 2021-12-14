let actividades = [
  // {
  //   item: "desayunar",
  //   completed: true,
  // },
  // {
  //   item: "comer",
  //   completed: true,
  // },
  // {
  //   item: "cenar",
  //   completed: false,
  // },
];

const $divRowContent = document.querySelector(".row-content");
const $inputNewTodo = document.querySelector("#new-todo");
const $pNewTodoText = document.querySelector('#new-text')

const crearActividad = (array, index, drag = true) => {
  const $divRow = document.createElement("div");
  const $inputCheckbox = document.createElement("input");
  const $labelActividad = document.createElement("label");
  const $divSeparador = document.createElement("div");

  if(drag) {
    $divRow.setAttribute("draggable", "true");
  }
  $divRow.classList.add("row");
  $divRow.classList.add("row-todo");
  $inputCheckbox.type = "checkbox";
  $inputCheckbox.id = "checkbox-" + index;
  $inputCheckbox.setAttribute("onclick", `pintar('${index}')`);
  $inputCheckbox.classList.add("row-checkbox");

  $divRow.setAttribute("id", "row-"+index);

  $labelActividad.setAttribute("for", $inputCheckbox.id);
  $labelActividad.textContent = array.item;
  $divSeparador.classList.add("separador");

  if (array.completed) {
    $labelActividad.classList.add("item-completed");
    $inputCheckbox.setAttribute("checked", "true");
  } else {
    $labelActividad.classList.remove("item-completed");
    $inputCheckbox.removeAttribute("checked");
  }

  $divRow.appendChild($inputCheckbox);
  $divRow.appendChild($labelActividad);
  $divRowContent.appendChild($divRow);
  $divRowContent.appendChild($divSeparador);
};

const crearFooter = (array) => {
  const $divFooterContent = document.createElement("div");
  const $divItemLeft = document.createElement("div");
  const $divItemStatus = document.createElement("div");
  const $divItemsCompleted = document.createElement("div");
  const $pAll = document.createElement("p");
  const $pActive = document.createElement("p");
  const $pCompleted = document.createElement("p");
  const $pClearCompleted = document.createElement("p");
  const $pItemLeft = document.createElement("p");

  $pItemLeft.textContent = `${array.length} item left`;
  $pAll.textContent = "All";
  $pAll.classList.add("footer__all");
  $pActive.textContent = "Active";
  $pActive.classList.add("footer__active");
  $pCompleted.textContent = "Completed";
  $pCompleted.classList.add("footer__completed");
  $pClearCompleted.textContent = "Clear Completed";
  $pClearCompleted.classList.add("footer__clear-completed");

  $divFooterContent.classList.add("footer-content");
  $divItemLeft.classList.add("item-left");
  $divItemStatus.classList.add("item-status");
  $divItemsCompleted.classList.add("items-completed");

  $divItemLeft.appendChild($pItemLeft);
  $divItemStatus.appendChild($pAll);
  $divItemStatus.appendChild($pActive);
  $divItemStatus.appendChild($pCompleted);
  $divItemsCompleted.appendChild($pClearCompleted);

  $divFooterContent.appendChild($divItemLeft);
  $divFooterContent.appendChild($divItemStatus);
  $divFooterContent.appendChild($divItemsCompleted);

  $divRowContent.appendChild($divFooterContent);

  const $pFooterAll = document.querySelector(".footer__all");
  const $pFooterActive = document.querySelector(".footer__active");
  const $pFooterCompleted = document.querySelector(".footer__completed");
  const $pFooterClearCompleted = document.querySelector(".footer__clear-completed");

  $pFooterAll.addEventListener('click', () => {
    visualizarActividades(actividades);
  });
  $pFooterActive.addEventListener('click', () => {
    visualizarActividades([...actividades].filter( e => !e.completed));
  });
  $pFooterCompleted.addEventListener('click', () => {
    visualizarActividades([...actividades].filter( e => e.completed));
  });
  $pFooterClearCompleted.addEventListener('click', () => {
    actividades = actividades.filter(e => !e.completed)
    visualizarActividades(actividades);
  });

};

const visualizarActividades = (array) => {
  $divRowContent.innerHTML = "";
  $divRowContent.style.backgroundColor = "white";
  array.forEach((item, index) => {
    (array.length !== actividades.length) 
    ? crearActividad(item, index, false)
    : crearActividad(item, index);
  });
  crearFooter(array);
  dragAndDrop(array);
};

const pintar = (item) => {
  actividades[item].completed = !actividades[item].completed;
  visualizarActividades(actividades);
};

const dragAndDrop = (array) => {
  const $container = document.querySelectorAll(".row-todo");

  $container.forEach((element) => {
    element.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("id", e.target.id);
    });
    element.addEventListener("dragenter", (e) => {
      e.target.classList.add("drag-hover");
    });
    element.addEventListener("dragleave", (e) => {
      e.target.classList.remove("drag-hover");
    });
    element.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    element.addEventListener("drop", (e) => {
      const itemOrigen = e.dataTransfer.getData("id").split("-")[1];
      const itemDestino = e.target.id.split("-")[1];

      actividades.splice(itemDestino, 0, actividades.splice(itemOrigen, 1)[0]);
      visualizarActividades(array);
      e.target.classList.remove("drag-hover");
    });
  });
};

// EVENTOS
$inputNewTodo.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    if ($inputNewTodo.value.trim() === "") {
      $inputNewTodo.value = "";
      return;
    }
    actividades.push({ item: $inputNewTodo.value, completed: false });
    visualizarActividades(actividades);
    $inputNewTodo.value = "";
  }
});
$inputNewTodo.addEventListener('blur', () => {
  $pNewTodoText.textContent = 'Create a new todo...'
    $pNewTodoText.classList.remove('new-text')
    $inputNewTodo.value = "";
})
$inputNewTodo.addEventListener('focus', () => {
  $pNewTodoText.textContent = 'Currently typing'
  $pNewTodoText.classList.add('new-text')
})

visualizarActividades(actividades);


