import { instance } from '../instance';
import storage from '../store';

export async function getTodos() {
  //const token = storage.get('token');
  const res = await instance.get('/todos');

  return res;
}

export async function addTodo(todo: string) {
  //const token = storage.get('token');
  const res = await instance.post(
    '/todos/add',
    { todo: todo },
    {
      headers: {
        //Authorization: 'Bearer ' + token,
        ContentType: 'application/json',
      },
    }
  );

  return res;
}

export async function updateTodo(id: number, todo: TodoParam) {
  //const token = storage.get('token');
  const res = await instance.put('/todos/' + id, todo, {
    headers: {
      //Authorization: 'Bearer ' + token,
      ContentType: 'application/json',
    },
  });

  return res;
}

export async function deleteTodo(id: number) {
  const token = storage.get('token');
  const res = await instance.delete('/todos/' + id, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return res;
}
