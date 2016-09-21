/* eslint no-undef: 0 */

// react implementation
const TodoApp = (state, id) => {
  ReactDOM.render(
    React.createElement('div', null,
      React.createElement(TodoInput, {value: state.todoInput}),
      React.createElement(Todos, {data: state.todos})
    ),
    document.getElementById(id)
  )
};

const TodoInput = React.createClass({
  getInitialState: function() {
    return { value: this.props.value };
  },
  render: function() {
    return React.createElement('form', {
      onSubmit: (e) => {
        e.preventDefault();
        store.dispatch({type: 'ADD_TODO', text: this.props.value});
        store.dispatch({type: 'UPDATE_INPUT', value: ''});
      }
    }, React.createElement('input', {
      id: 'todo-entry',
      value: this.props.value,
      placeholder: 'What todo?',
      onChange: ({ target: { value } }) =>
        store.dispatch({type: 'UPDATE_INPUT', value})
    }));
  }
});

const Todo = React.createClass({
  render: function() {
    return React.createElement('li', {
      onDoubleClick: ({target}) =>
        store.dispatch({type: 'REMOVE_TODO', text: target.textContent})
      }, this.props.data);
  }
});

const Todos = React.createClass({
  render: function() {
    const todos = this.props.data.map( todo =>
      React.createElement(Todo, {data: todo})
    );

    return React.createElement('ul', null, ...todos);
  }
});

// reducers
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.text];
    case 'REMOVE_TODO':
      var index = state.indexOf(action.text);
      return (index !== -1) ? [...state.slice(0,index),...state.slice(index+1)] : state;
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
const store = createStore(todoApp);

store.subscribe(() => TodoApp(store.getState(), 'todo-list'));

store.dispatch({type: 'ADD_TODO', text: 'hey'});
store.dispatch({type: 'ADD_TODO', text: 'ho'});
store.dispatch({type: 'ADD_TODO', text: 'lets go'});
store.dispatch({type: 'REMOVE_TODO', text: 'lets go'});
