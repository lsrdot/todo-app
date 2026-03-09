import {useState} from "react";
import {type JSX} from "react";

type AddTodoFormProps = {
    onSubmit: (title: string) => void
}

function addTodoForm(
    {onSubmit}
    :AddTodoFormProps
): JSX.Element{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [input, setInput] = useState("")

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!input.trim()) return

        onSubmit(input)
        setInput("");

    }

    return (
        <form className={"flex"} onSubmit={handleSubmit}>
            <input
                value={input}
                onChange={(e) => (setInput(e.target.value))}
                placeholder={"What needs to be done?"}
                className={"rounded-s-md grow border border-gray-400 p-2"}
            />
            <button
                type={"submit"}
                className={"w-16 rounded-e-md bg-slate-900 text-white hover:bg-slate-800"}
            >Add
            </button>
        </form>
    )
}

export default addTodoForm;