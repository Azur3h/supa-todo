import { useEffect, useState } from "react";
import { fetchAllRecords, insertRecord, deleteRecordById } from "./services/supabase/supabaseClient";

function App() {

    const [mainInputValue, setMainInputValue] = useState("");
    const [todoList, setTodoList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const todoData = await fetchAllRecords("todo");
                setTodoList(todoData);
            } catch (error) {
                console.error("Error fetching todo items: ", error);
            }
        };
        fetchData();
    }, []);
    
    const handleClickOnListItem = async (e) => {
        e.preventDefault();
        const listItemId = e.target.id;
        try {
            await deleteRecordById(listItemId, "todo");
            setTodoList(prevList => prevList.filter(item => item.id != listItemId));
        } catch (error) {
            console.error("Error deleting todo item: ", error);
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const todoData = await insertRecord(mainInputValue, "todo");
            setMainInputValue("");
            setTodoList(prevList => [...prevList, todoData[0]]);
        } catch (error) {
            console.error("Error fetching data: ", error);
        };
    }

    return (
        <section className="main__container | flex-column content-center gap-200">
            <div className="flex gap-400">
                <img className="main__schnauzer" src="assets/images/schnauzer.svg" alt="" />
                <img className="main__axolotl" src="assets/images/axolotl.svg" alt="" />
            </div>

            <form id="main__form" className="flex-column content-center gap-100" onSubmit={handleSubmit}>
                <input
                onChange={(e) => setMainInputValue(e.target.value)}
                value={mainInputValue}
                type="text"
                className="main__input"
                placeholder="Algún axolotl nuevo?"
                />
                <button type="submit" id="main__save-btn" className="main__save-btn">Guardar</button>
            </form>

            <ul id="main__list" className="main__list | flex text-center gap-50 wrap">
                {todoList.map((item) => {
                    return <li key={item.id} id={item.id} onClick={handleClickOnListItem}>{item.title}</li>
                })}
            </ul>
        </section>
    )
}

export default App
