import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZWtvc2dscGJnemp5d3JrandjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2MTYyODMsImV4cCI6MjAzMzE5MjI4M30.2UC1UqCnOson_8c2gbV0euv3HelE8QiUdenVF2xywZQ';
const SUPABASE_URL = `https://okekosglpbgzjywrkjwc.supabase.co`

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM elements
let mainForm = document.getElementById("main__form");
let mainSaveBtn = document.getElementById("main__save-btn");
let mainInput = document.getElementById("main__input");
let mainList = document.getElementById("main__list");


fetchTodoList();


//EventListeners
mainForm.addEventListener("submit", function(event) {
    event.preventDefault();
});

mainSaveBtn.addEventListener("click", function() {
    let inputValue = mainInput.value;
    if (inputValue.trim() !== "") {
        addTodoItem(inputValue);
        clearInput(mainInput);
    }
});

//Functions
async function fetchTodoList() {
    const { data, error } = await supabase
    .from('todo')
    .select("id, title, content")
    if (error) {
        console.error("Error fetching data: ", error);
    } else {
        for ( let i = 0; i < data.length; i++ ) {
            renderTodoItem(data[i])
        }
    }
}

function clearInput(name) {
    name.value = "";
};

async function deleteTodoItem(listItem) {
    const { error } = await supabase
    .from('todo')
    .delete()
    .eq('id', listItem.key)
    if (error) {
        console.error("Error fetching data: ", error);
    } else {
        mainList.removeChild(listItem);
    }
};

async function addTodoItem(newTitle) {
    const { data, error } = await supabase
    .from('todo')
    .insert([
        { title: newTitle, content: "No available content... yet" },
    ])
    .select()
    if (error) {
        console.error("Error fetching data: ", error);
    } else {
        renderTodoItem(data[0]);
    }      
}

function renderTodoItem(item) {
    let newListItem = document.createElement("li");
    newListItem.textContent = item.title;
    newListItem.key = item.id;
    newListItem.addEventListener("click", function () {
        deleteTodoItem(newListItem);
    })
    mainList.append(newListItem);
}


          
// const supaPass = hJuKWjUTApd~(26