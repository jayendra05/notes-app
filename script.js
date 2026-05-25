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

    // Note Text
    const noteSpan = document.createElement("span");
    noteSpan.textContent = noteText;

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", function () {

        const updatedNote = prompt(
            "Edit Note",
            noteSpan.textContent
        );

        if (
            updatedNote !== null &&
            updatedNote.trim() !== ""
        ) {
            noteSpan.textContent = updatedNote;
        }
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    // Action Buttons Container
    const actionContainer = document.createElement("div");
    actionContainer.classList.add("note-actions");

    actionContainer.appendChild(editBtn);
    actionContainer.appendChild(deleteBtn);

    // Build Note
    li.appendChild(noteSpan);
    li.appendChild(actionContainer);

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
            note.style.display = "flex";
        }
        else {
            note.style.display = "none";
        }
    });
}