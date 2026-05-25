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

    li.textContent = noteText;

    notesList.appendChild(li);

    noteInput.value = "";
}