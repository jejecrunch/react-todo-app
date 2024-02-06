import { useInput } from '../../hooks';
import { Button, Input } from '../common';
import { addTodo } from '../../services';

export default function TodoForm({ todos, setTodos }) {
  const newTodo = useInput({
    initVal: '',
    validation: v => typeof v === 'string',
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await addTodo(newTodo.value);

    if (res.status === 201) {
      setTodos([...todos, res.data]);
      newTodo.onReset();
    } else {
      alert(`다음과 같은 에러가 발생했습니다 !
      ${res}`);
    }
  };

  return (
    <form
      className="d-flex flex-row justify-content-center align-items-center mb-4"
      onSubmit={handleSubmit}
    >
      <Input
        label=""
        placeholder="할일을 입력해주세요"
        param={{
          value: newTodo.value,
          onChange: newTodo.onChange,
          type: 'text',
          name: 'newTodo',
        }}
        valid={true}
        errMsg=""
      />

      <Button type="todo" onClick={undefined} disabled={false}>
        {' '}
        +{' '}
      </Button>
    </form>
  );
}
