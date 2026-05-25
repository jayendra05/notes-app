const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");
const searchInput = document.getElementById("searchInput");
const noteCount = document.getElementById("noteCount");
const emptyState = document.getElementById("emptyState");

addBtn.addEventListener("click", addNote);

noteInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addNote();
    }
});

searchInput.addEventListener("keyup", searchNotes);

function addNote() {

    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please enter a note");
        return;
    }

    const li = document.createElement("li");
    li.classList.add("note-item");

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("note-content");

    const textDiv = document.createElement("div");
    textDiv.classList.add("note-text");
    textDiv.textContent = noteText;

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("note-date");

    dateDiv.textContent =
        "Created: " + new Date().toLocaleString();

    contentDiv.appendChild(textDiv);
    contentDiv.appendChild(dateDiv);

    const actionContainer = document.createElement("div");
    actionContainer.classList.add("note-actions");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", function () {

        const updatedText = prompt(
            "Edit Note",
            textDiv.textContent
        );

        if (
            updatedText !== null &&
            updatedText.trim() !== ""
        ) {
            textDiv.textContent = updatedText;
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateNoteCount();
    });

    actionContainer.appendChild(editBtn);
    actionContainer.appendChild(deleteBtn);

    li.appendChild(contentDiv);
    li.appendChild(actionContainer);

    notesList.appendChild(li);

    noteInput.value = "";

    updateNoteCount();
}

function searchNotes() {

    const searchText =
        searchInput.value.toLowerCase();

    const notes =
        document.querySelectorAll(".note-item");

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

function updateNoteCount() {

    const totalNotes =
        document.querySelectorAll(".note-item").length;

    noteCount.textContent = totalNotes;

    if (totalNotes === 0) {
        emptyState.style.display = "block";
    }
    else {
        emptyState.style.display = "none";
    }
}

updateNoteCount();