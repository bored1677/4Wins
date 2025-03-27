document.addEventListener("DOMContentLoaded", () => {
    const newEntryButton = document.getElementById("new-entry");
    const addEntryForm = document.getElementById("add-entry-form");
    const saveEntryButton = document.getElementById("save-entry");
    const entryText = document.getElementById("entry-text");
    const journalEntries = document.getElementById("journal-entries");
    
    let entries = JSON.parse(localStorage.getItem("journal")) || [];
    renderEntries();

    newEntryButton.addEventListener("click", () => {
        addEntryForm.style.display = "block";
    });

    saveEntryButton.addEventListener("click", () => {
        const text = entryText.value.trim();
        if (text) {
            const entry = { id: Date.now(), text, date: new Date().toLocaleString() };
            entries.push(entry);
            localStorage.setItem("journal", JSON.stringify(entries));
            entryText.value = "";
            addEntryForm.style.display = "none";
            renderEntries();
        }
    });

    function renderEntries() {
        journalEntries.innerHTML = "";
        entries.forEach(entry => {
            const entryDiv = document.createElement("div");
            entryDiv.classList.add("entry");
            entryDiv.innerHTML = `<strong>${entry.date}</strong><p>${entry.text}</p>`;
            
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => editEntry(entry.id));

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteEntry(entry.id));
            
            entryDiv.appendChild(editButton);
            entryDiv.appendChild(deleteButton);
            journalEntries.appendChild(entryDiv);
        });
    }

    function editEntry(id) {
        const entry = entries.find(e => e.id === id);
        const newText = prompt("Edit your entry:", entry.text);
        if (newText !== null) {
            entry.text = newText;
            localStorage.setItem("journal", JSON.stringify(entries));
            renderEntries();
        }
    }

    function deleteEntry(id) {
        entries = entries.filter(e => e.id !== id);
        localStorage.setItem("journal", JSON.stringify(entries));
        renderEntries();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const addEntryBtn = document.getElementById("add-entry");
    const saveEntryBtn = document.getElementById("save-entry");
    const journalForm = document.getElementById("journal-form");
    const journalEntries = document.getElementById("journal-entries");
    const loadMoreBtn = document.createElement("button");

    loadMoreBtn.textContent = "Load More";
    loadMoreBtn.style.display = "none"; // Hidden by default
    loadMoreBtn.addEventListener("click", showMoreEntries);
    journalEntries.after(loadMoreBtn);

    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    let visibleCount = 5; // Number of initially visible entries

    function displayEntries() {
        journalEntries.innerHTML = "";
        const limitedEntries = entries.slice(0, visibleCount); // Show only a portion

        limitedEntries.forEach((entry, index) => {
            const entryDiv = document.createElement("div");
            entryDiv.classList.add("entry");
            entryDiv.innerHTML = `
                <p><strong>${entry.date}</strong></p>
                <p>${entry.content}</p>
                <button onclick="editEntry(${index})">Edit</button>
                <button onclick="deleteEntry(${index})">Delete</button>
            `;
            journalEntries.appendChild(entryDiv);
        });

        // Show "Load More" button if there are more than visibleCount entries
        if (entries.length > visibleCount) {
            loadMoreBtn.style.display = "block";
        } else {
            loadMoreBtn.style.display = "none";
        }

        localStorage.setItem("journalEntries", JSON.stringify(entries));
    }

    function showMoreEntries() {
        visibleCount += 5; // Increase the number of visible entries
        displayEntries();
    }

    addEntryBtn.addEventListener("click", function () {
        journalForm.style.display = "block";
    });

    saveEntryBtn.addEventListener("click", function () {
        const content = document.getElementById("entry-content").value;
        if (content.trim() === "") return;

        const newEntry = {
            date: new Date().toLocaleDateString(),
            content: content,
        };

        entries.unshift(newEntry); // Add new entry at the top
        visibleCount = 5; // Reset visible count to ensure only 5 are shown
        document.getElementById("entry-content").value = ""; // Clear input
        journalForm.style.display = "none";

        displayEntries();
    });

    function deleteEntry(index) {
        entries.splice(index, 1);
        visibleCount = 5; // Reset visible count after deletion
        displayEntries();
    }

    function editEntry(index) {
        const newContent = prompt("Edit your entry:", entries[index].content);
        if (newContent !== null) {
            entries[index].content = newContent;
            displayEntries();
        }
    }

    displayEntries();
});
