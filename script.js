const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");
const searchInput = document.getElementById("searchInput");
const noteCount = document.getElementById("noteCount");
const emptyState = document.getElementById("emptyState");
const themeToggle = document.getElementById("themeToggle");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Event Listeners
addBtn.addEventListener("click", addNote);

noteInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addNote();
    }
});

searchInput.addEventListener("keyup", searchNotes);

themeToggle.addEventListener("click", toggleTheme);

// Initial Load
initializeTheme();
renderNotes();

function addNote() {

    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please enter a note");
        return;
    }

    const note = {
        id: Date.now(),
        text: noteText,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    saveNotes();

    renderNotes();

    noteInput.value = "";
}

function renderNotes() {

    notesList.innerHTML = "";

    notes.forEach(note => {

        const li = document.createElement("li");
        li.classList.add("note-item");

        // Content Section
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("note-content");

        const textDiv = document.createElement("div");
        textDiv.classList.add("note-text");
        textDiv.textContent = note.text;

        const dateDiv = document.createElement("div");
        dateDiv.classList.add("note-date");
        dateDiv.textContent =
            "Created: " + note.createdAt;

        contentDiv.appendChild(textDiv);
        contentDiv.appendChild(dateDiv);

        // Buttons Section
        const actionContainer =
            document.createElement("div");

        actionContainer.classList.add(
            "note-actions"
        );

        // Edit Button
        const editBtn =
            document.createElement("button");

        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", function () {

            const updatedText = prompt(
                "Edit Note",
                note.text
            );

            if (
                updatedText !== null &&
                updatedText.trim() !== ""
            ) {

                note.text = updatedText.trim();

                saveNotes();

                renderNotes();
            }
        });

        // Delete Button
        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function () {

            notes = notes.filter(
                x => x.id !== note.id
            );

            saveNotes();

            renderNotes();
        });

        actionContainer.appendChild(editBtn);
        actionContainer.appendChild(deleteBtn);

        li.appendChild(contentDiv);
        li.appendChild(actionContainer);

        notesList.appendChild(li);
    });

    updateNoteCount();
}

function saveNotes() {

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );
}

function searchNotes() {

    const searchText =
        searchInput.value.toLowerCase();

    const noteItems =
        document.querySelectorAll(".note-item");

    noteItems.forEach(item => {

        if (
            item.textContent
                .toLowerCase()
                .includes(searchText)
        ) {
            item.style.display = "flex";
        }
        else {
            item.style.display = "none";
        }
    });
}

function updateNoteCount() {

    noteCount.textContent = notes.length;

    if (notes.length === 0) {
        emptyState.style.display = "block";
    }
    else {
        emptyState.style.display = "none";
    }
}

function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );

    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();
}

function initializeTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );
    }

    updateThemeButton();
}

function updateThemeButton() {

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {
        themeToggle.textContent =
            "☀️ Light Mode";
    }
    else {
        themeToggle.textContent =
            "🌙 Dark Mode";
    }
}