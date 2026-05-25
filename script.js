const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");

addBtn.addEventListener("click", addNote);

function addNote() {

    const noteText = noteInput.value.trim();

    if (noteText === "") {
        return;
    }

    const li = document.createElement("li");

const deleteBtn = document.createElement("button");

deleteBtn.textContent = "Delete";

deleteBtn.addEventListener("click", function () {
    li.remove();
});

li.textContent = noteText + " ";

li.appendChild(deleteBtn);

notesList.appendChild(li);
}