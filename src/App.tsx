/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList';
import { FilterList } from './components/FilterList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const findTodos = async () => {
    const loadedTodos = await getTodos(user?.id) || null;

    setTodoList(loadedTodos);
  };

  // const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log('submited');
  //   pushTodo('dd', user?.id);
  // };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    findTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {user && (
          <section className="todoapp__main" data-cy="TodoList">
            <TodoList todos={todoList} />
          </section>
        )}

        {todoList.length === 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <FilterList itemCount={todoList.length} />
          </footer>
        )}
      </div>

      {todoList.length !== 0 && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
          />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>
      )}
    </div>
  );
};
