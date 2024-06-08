import { useEffect, useState } from "react";
import { deleteRecordById, supabase } from "./services/supabase/supabaseClient";


function App() {

    const [mainInputValue, setMainInputValue] = useState("");
    const [todoList, setTodoList] = useState([])

    useEffect(() => {
        (async function () {
            const { data, error } = await supabase
            .from('todo')
            .select("id, title, content, relative_position")
            .order('id', { ascending: true })
            if (error) {
                return console.error("Error fetching data: ", error);
            };
            setTodoList(data);
        })();
    }, []);
    
    const handleClickOnListItem = (e) => {
        e.preventDefault();
        deleteTodoItem(e.target.id);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { data, error } = await supabase
        .from("todo")
        .insert([
            { title: mainInputValue, content: "No available content... yet" },
        ])
        .select("id, title, content, relative_position");

        if (error) {
            return console.error("Error fetching data: ", error);
        };
        setMainInputValue("");
        setTodoList(prevList => [...prevList, data[0]]);
    }

    const deleteTodoItem = async (listItemId) => {
        const { error } = await supabase
        .from('todo')
        .delete()
        .eq('id', listItemId);

        if (error) {
            return console.error("Error fetching data: ", error);
        };
        setTodoList( prevList => prevList.filter( item => (item.id != listItemId)));
    };

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
