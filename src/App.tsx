import {dummyData} from "./data/todos.ts";
//import TodoItem from "./components/TodoItem.tsx";
import {useEffect, useState} from "react";
import type {Todo} from "./types/todo.ts";
import AddTodoForm from "./components/AddTodoForm.tsx";
import TodoList from "./components/TodoList.tsx";
import TodoSummary from "./components/TodoSummary.tsx";

function App() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]")
        return savedTodos.length > 0 ? savedTodos : dummyData
    })


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    function setTodoCompleted(id: number, completed:boolean) {
        setTodos((prev) => (
            prev.map(todo => (
                todo.id === id ? {...todo, completed} : todo
            ))
        ))
    }
    function addTodo(title: string) {
        setTodos(prev => [
            {
                id: Date.now(),
                title,
                completed: false
            },
            ...prev
        ])
    }

    function deleteTodo(id: number) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    }

    function deleteAllCompletedTodos() {
        setTodos((prevTodos) => prevTodos.filter((todos) => !todos.completed))
    }

    return (
        <>
            <main className={"py-10 h-screen space-y-5 overflow-y-auto"}>
                <h1 className={"font-bold text-3xl text-center"}>Your Todos</h1>
                <div className={"max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6"}>
                    <AddTodoForm
                        onSubmit={addTodo}
                    />
                  <TodoList
                      todos={todos}
                      onCompletedChange={setTodoCompleted}
                      onDelete={deleteTodo}
                  />

                </div>
                <TodoSummary todos={todos} deleteAllCompleted={deleteAllCompletedTodos}/>
            </main>
        </>
    )
}

export default App
