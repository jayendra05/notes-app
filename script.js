const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");
const searchInput = document.getElementById("searchInput");
const noteCount = document.getElementById("noteCount");
const emptyState = document.getElementById("emptyState");
const themeToggle = document.getElementById("themeToggle");

const prioritySelect =
    document.getElementById("prioritySelect");

const exportBtn =
    document.getElementById("exportBtn");

const clearAllBtn =
    document.getElementById("clearAllBtn");

let notes =
    JSON.parse(
        localStorage.getItem("notes")
    ) || [];

addBtn.addEventListener(
    "click",
    addNote
);

noteInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {
            addNote();
        }
    }
);

searchInput.addEventListener(
    "keyup",
    searchNotes
);

themeToggle.addEventListener(
    "click",
    toggleTheme
);

exportBtn.addEventListener(
    "click",
    exportNotes
);

clearAllBtn.addEventListener(
    "click",
    clearAllNotes
);

initializeTheme();

notes = [];

saveNotes();

renderNotes();

function addNote() {

    const noteText =
        noteInput.value.trim();

    if (noteText === "") {

        alert(
            "Please enter a note"
        );

        return;
    }

    const note = {

        id: Date.now(),

        text: noteText,

        priority:
            prioritySelect.value,

        createdAt:
            new Date()
                .toLocaleString(),

        updatedAt: null
    };

    notes.push(note);

    saveNotes();

    renderNotes();

    noteInput.value = "";
}

function renderNotes() {

    notesList.innerHTML = "";

    notes.forEach(note => {

        const li =
            document.createElement(
                "li"
            );

        li.classList.add(
            "note-item"
        );

        const contentDiv =
            document.createElement(
                "div"
            );

        contentDiv.classList.add(
            "note-content"
        );

        const textDiv =
            document.createElement(
                "div"
            );

        textDiv.classList.add(
            "note-text"
        );

        textDiv.textContent =
            note.text;

        const dateDiv =
            document.createElement(
                "div"
            );

        dateDiv.classList.add(
            "note-date"
        );

        let dateText =
            "Created: " +
            note.createdAt;

        if (
            note.updatedAt
        ) {

            dateText +=
                " | Updated: " +
                note.updatedAt;
        }

        dateDiv.textContent =
            dateText;

        const priorityDiv =
            document.createElement(
                "div"
            );

        priorityDiv.classList.add(
            "priority"
        );

        priorityDiv.textContent =
            "Priority: " +
            note.priority;

        if (
            note.priority ===
            "High"
        ) {

            priorityDiv.classList.add(
                "priority-high"
            );
        }
        else if (
            note.priority ===
            "Medium"
        ) {

            priorityDiv.classList.add(
                "priority-medium"
            );
        }
        else {

            priorityDiv.classList.add(
                "priority-low"
            );
        }

        contentDiv.appendChild(
            textDiv
        );

        contentDiv.appendChild(
            dateDiv
        );

        contentDiv.appendChild(
            priorityDiv
        );

        const actionContainer =
            document.createElement(
                "div"
            );

        actionContainer.classList.add(
            "note-actions"
        );

        const editBtn =
            document.createElement(
                "button"
            );

        editBtn.textContent =
            "Edit";

        editBtn.classList.add(
            "edit-btn"
        );

        editBtn.addEventListener(
            "click",
            function () {

                const updatedText =
                    prompt(
                        "Edit Note",
                        note.text
                    );

                if (
                    updatedText !== null &&
                    updatedText.trim() !== ""
                ) {

                    note.text =
                        updatedText.trim();

                    note.updatedAt =
                        new Date()
                            .toLocaleString();

                    saveNotes();

                    renderNotes();
                }
            }
        );

        const deleteBtn =
            document.createElement(
                "button"
            );

        deleteBtn.textContent =
            "Delete";

        deleteBtn.classList.add(
            "delete-btn"
        );

        deleteBtn.addEventListener(
            "click",
            function () {

                notes =
                    notes.filter(
                        x =>
                            x.id !==
                            note.id
                    );

                saveNotes();

                renderNotes();
            }
        );

        actionContainer.appendChild(
            editBtn
        );

        actionContainer.appendChild(
            deleteBtn
        );

        li.appendChild(
            contentDiv
        );

        li.appendChild(
            actionContainer
        );

        notesList.appendChild(
            li
        );
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
        searchInput.value
            .toLowerCase();

    const noteItems =
        document.querySelectorAll(
            ".note-item"
        );

    noteItems.forEach(item => {

        if (
            item.textContent
                .toLowerCase()
                .includes(
                    searchText
                )
        ) {

            item.style.display =
                "flex";
        }
        else {

            item.style.display =
                "none";
        }
    });
}

function updateNoteCount() {

    noteCount.textContent =
        notes.length;

    emptyState.style.display =
        notes.length === 0
            ? "block"
            : "none";
}

function clearAllNotes() {

    const confirmed =
        confirm(
            "Delete all notes?"
        );

    if (!confirmed) {
        return;
    }

    notes = [];

    saveNotes();

    renderNotes();
}

function exportNotes() {

    const json =
        JSON.stringify(
            notes,
            null,
            2
        );

    const blob =
        new Blob(
            [json],
            {
                type:
                    "application/json"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const a =
        document.createElement(
            "a"
        );

    a.href = url;

    a.download =
        "notes.json";

    a.click();

    URL.revokeObjectURL(
        url
    );
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
        isDark
            ? "dark"
            : "light"
    );

    updateThemeButton();
}

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            "theme"
        );

    if (
        savedTheme ===
        "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );
    }

    updateThemeButton();
}

function updateThemeButton() {

    themeToggle.textContent =
        document.body.classList.contains(
            "dark-mode"
        )
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
}