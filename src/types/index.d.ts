type User = {
  username: string | null;
  password: string | null;
};

type TodoParam = {
  todo: string;
  completed: boolean;
};

type Todo = {
  id: number;
  userId: number;
} & TodoParam;

type Selected = {
  prev: string;
  cur: string;
};
