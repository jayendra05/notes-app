const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");
const searchInput = document.getElementById("searchInput");

addBtn.addEventListener("click", addNote);

searchInput.addEventListener("keyup", searchNotes);

function addNote() {

    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please enter a note");
        return;
    }

    const li = document.createElement("li");

    const noteSpan = document.createElement("span");
    noteSpan.textContent = noteText;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function () {

        const updatedNote = prompt(
            "Edit Note",
            noteSpan.textContent
        );

        if (updatedNote !== null && updatedNote.trim() !== "") {
            noteSpan.textContent = updatedNote;
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(noteSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);

    noteInput.value = "";
}

function searchNotes() {

    const searchText =
        searchInput.value.toLowerCase();

    const notes =
        document.querySelectorAll("#notesList li");

    notes.forEach(note => {

        if (
            note.textContent
                .toLowerCase()
                .includes(searchText)
        ) {
            note.style.display = "";
        }
        else {
            note.style.display = "none";
        }
    });
}