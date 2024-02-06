import TodoItem from './TodoItem';

export default function TodoList({ todos, setTodos, selected }) {
  return (
    <ul className="list-group mb-0">
      {[...todos].map((v, i) => (
        <TodoItem
          todo={v}
          todos={todos}
          index={i}
          key={v.id}
          setTodos={setTodos}
          selected={selected}
        />
      ))}
    </ul>
  );
}
