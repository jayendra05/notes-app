const editBtn = document.createElement("button");
editBtn.textContent = "Edit";
editBtn.classList.add("edit-btn");

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.classList.add("delete-btn");

const actionContainer = document.createElement("div");
actionContainer.classList.add("note-actions");

actionContainer.appendChild(editBtn);
actionContainer.appendChild(deleteBtn);

li.appendChild(noteSpan);
li.appendChild(actionContainer);