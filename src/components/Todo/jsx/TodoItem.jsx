import { useState } from 'react';
import { Button, Input } from '../common';
import { deleteTodo, getTodos, updateTodo } from '../../services';

export default function TodoItem({ todo, index, todos, setTodos, selected }) {
  const [newTodo, setNewTodo] = useState(todo);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = async e => {
    setNewTodo({ ...newTodo, completed: e.target.checked });

    await updateTodo(newTodo.id, {
      todo: newTodo.todo,
      completed: e.target.checked,
    });

    const res = await getTodos();

    if (res.status === 200) {
      switch (selected.cur) {
        case 'Active':
          setTodos([...res.data].filter(v => !v.isCompleted));
          break;
        case 'Completed':
          setTodos([...res.data].filter(v => v.isCompleted));
          break;
      }
    }

    if (selected.cur === 'Active' || selected.cur === 'Completed')
      setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
  };

  const handleUpdate = async e => {
    e.preventDefault();

    const res = await updateTodo(newTodo.id, {
      todo: newTodo.todo,
      completed: newTodo.completed,
    });

    if (res.status === 200) {
      todo.todo = newTodo.todo;
      setIsEdit(false);
    }
  };

  const handleDelete = async e => {
    e.preventDefault();

    const res = await deleteTodo(newTodo.id);

    if (res.status === 204) {
      setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
    }
  };

  return (
    <li
      className="list-group-item d-flex align-items-center justify-contents-between border-0 mb-2 rounded"
      style={{ backgroundColor: '#f4f6f7' }}
    >
      <input
        className="form-check-input me-2"
        type="checkbox"
        value=""
        aria-label="..."
        onChange={handleChange}
        checked={newTodo.completed}
        id={`todo${newTodo.id}`}
      />
      {isEdit ? (
        <>
          <Input
            label=""
            placeholder="할일을 입력해주세요 ..."
            param={{
              value: newTodo.todo,
              onChange: e => {
                const {
                  target: { value },
                } = e;

                setNewTodo({ ...newTodo, todo: value });
              },
              type: 'text',
              name: 'newTodo',
            }}
            valid={newTodo !== null}
            errMsg=""
          />
          <Button
            type="todo cancel"
            onClick={() => setIsEdit(!isEdit)}
            disabled={false}
          >
            취소
          </Button>
        </>
      ) : (
        <div className="flex-fill">
          <label className="form-check-label" htmlFor={`check${newTodo.id}`}>
            {newTodo.completed ? <s>{newTodo.todo}</s> : newTodo.todo}{' '}
          </label>
        </div>
      )}

      <Button
        type="todo modify"
        onClick={() => (isEdit ? handleUpdate : setIsEdit(!isEdit))}
        disabled={false}
      >
        수정
      </Button>
      <Button type="todo delete" onClick={handleDelete} disabled={false}>
        삭제
      </Button>
    </li>
  );
}
