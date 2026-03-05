let text = document.querySelector("#todoitem");
let todobox = document.querySelector(".todobox");

let id = 1;
let task = JSON.parse(localStorage.getItem("task")) || [];


window.onload = function () {
    if (task.length > 0) {
        id = task[task.length - 1].id + 1; 
        task.forEach(addtodom);
    }
};

text.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        if (text.value.trim() === "") {
            alert("Task cannot be empty! ------ check the field");
        } else {
            let newtask = {
                id: id,
                title: text.value.trim(),
                status: "pending",
            };

            task.push(newtask);
            id++;
            localStorage.setItem("task", JSON.stringify(task));
            addtodom(newtask);
            text.value = "";
        }
    }
});

function addtodom(newtask) {
    let box = document.createElement("div");
    box.classList.add("task-item");

    let titlespan = document.createElement("span");
    titlespan.innerText = newtask.title;

    let chkbox = document.createElement("input");
    chkbox.type = "checkbox";

    let deleted = document.createElement("span");
    deleted.style.cursor = "pointer";
    deleted.innerText = "❎";

    let edit = document.createElement("span");
    edit.style.cursor = "pointer";
    edit.innerText = "✍";

   
    box.append(titlespan, chkbox, edit, deleted);
    todobox.appendChild(box);

    
    if (newtask.status === "completed") {
        chkbox.checked = true;
        titlespan.style.textDecoration = "line-through";
    }

    chkbox.addEventListener("click", () => {
        newtask.status = chkbox.checked ? "completed" : "pending";
        titlespan.style.textDecoration = chkbox.checked ? "line-through" : "none";

        task = task.map((item) => (item.id === newtask.id ? newtask : item));
        localStorage.setItem("task", JSON.stringify(task));
    });

    edit.addEventListener("click", () => {
        const changetext = prompt("Edit the task:", newtask.title);
        if (changetext !== null && changetext.trim() !== "") {
            titlespan.innerText = changetext;
            newtask.title = changetext;
            newtask.status = "pending";
            titlespan.style.textDecoration = "none";
            chkbox.checked = false;

            task = task.map((item) => (item.id === newtask.id ? newtask : item));
            localStorage.setItem("task", JSON.stringify(task));
        }
    });

    deleted.addEventListener("click", (e) => {
        e.target.parentNode.remove();
        task = task.filter((item) => item.id !== newtask.id);
        localStorage.setItem("task", JSON.stringify(task));
    });
}
