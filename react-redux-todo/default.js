/* eslint no-undef: 0 */

// react implementation
const TodoApp = (state, id) => {
  ReactDOM.render(
    React.createElement('div', null,
      React.createElement(TodoForm, {value: state.todoInput}),
      React.createElement(Todos, {data: state.todos})
    ),
    document.getElementById(id)
  )
};

const TodoForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.props.value !== '') {
      store.dispatch({type: 'ADD_TODO', text: this.props.value});
      store.dispatch({type: 'UPDATE_INPUT', value: ''});
    }
  },
  render: function() {
    return React.createElement('form', {
      onSubmit: this.handleSubmit
    }, React.createElement(TodoInput, {value: this.props.value}));
  }
});

const TodoInput = React.createClass({
  handleChange: function({ target: { value } }) {
    store.dispatch({type: 'UPDATE_INPUT', value})
  },
  render: function() {
    return React.createElement('input', {
      id: 'todo-entry',
      value: this.props.value,
      placeholder: 'What todo?',
      onChange: this.handleChange
    });
  }
});

const removeTodo = (id) => ({ type: 'REMOVE_TODO', id });
const boundRemoveTodo = ({target: {id}}) => store.dispatch(removeTodo(id));

const toggleTodo = (id) => ({ type: 'TOGGLE_TODO', id });
const boundToggleTodo = ({target: {id}}) => store.dispatch(toggleTodo(id));

const Todo = React.createClass({
  render: function() {
    let classList = [];

    if (this.props.data.completed) { classList.push('completed'); }
    if (this.props.data.new) { classList.push('new'); }

    classList= classList.reduce((current, next) => current + ' ' + next);

    return React.createElement('li', {
      onDoubleClick: this.props.handleDoubleClick,
      onClick: this.props.handleClick,
      id: this.props.data.id,
      className: classList
      }, this.props.data.text);
  }
});

const Todos = React.createClass({
  render: function() {
    const list = this.props.data.map( todo =>
      React.createElement(Todo, {
        data: todo,
        handleDoubleClick: boundRemoveTodo,
        handleClick: boundToggleTodo
      })
    );

    return React.createElement('ul', null, list);
  }
});

// reducers
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {id: uuid.v4(), text: action.text, completed: false, new: true}];
    case 'REMOVE_TODO':
      var index = state.findIndex(todo => todo.id === action.id);
      return (index !== -1)
        ? [...state.slice(0,index),...state.slice(index+1)]
        : state;
    case 'TOGGLE_TODO':
      var index = state.findIndex(todo => todo.id === action.id);
      return (index !== -1)
        ? state.map(
          todo => (todo.id === action.id)
            ? Object.assign({}, todo, { completed: !todo.completed })
            : todo
          )
        : state;
    case 'TOGGLE_NEWNESS':
      var index = state.findIndex(todo => todo.id === action.id);
      return (index !== -1)
        ? state.map(
          todo => (todo.id === action.id)
            ? Object.assign({}, todo, { new: !todo.new })
            : todo
          )
        : state;
    default:
      return state;
  }
};

const todoInput = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_INPUT':
      return action.value;
    default:
      return state;
  }
};

const { createStore, combineReducers } = Redux;
const todoApp = combineReducers({ todos, todoInput })
//const store = createStore(todoApp);
let store = createStore(todoApp, window.devToolsExtension && window.devToolsExtension());

store.subscribe(() => TodoApp(store.getState(), 'todo-app'));

store.dispatch({type: 'ADD_TODO', text: 'hey'});
store.dispatch({type: 'ADD_TODO', text: 'ho'});
store.dispatch({type: 'ADD_TODO', text: 'lets go'});
store.dispatch({type: 'REMOVE_TODO', text: 'lets go'});
