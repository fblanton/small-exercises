/* eslint no-undef: 0 */

//event listeners
// document.getElementById('todo-entry').addEventListener('change',
//  ({target}) => {
//    store.dispatch({type: 'ADD_TODO', text: target.value});
//    target.value = '';
//    target.blur(); // fix issue where safari doesn't show placeholder after value = ''
//    target.focus(); // fix issue where safari doesn't show placeholder after value = ''
//  }
// );

document.body.addEventListener('dblclick',
  ({target}) => {
    if (target.localName === 'li') {
      store.dispatch({type: 'REMOVE_TODO', text: target.textContent});
    }
  }
);

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

// react implementation
const myApp = (state, id) => {
  ReactDOM.render(
    React.createElement(TodoApp, {data: state}),
    document.getElementById(id)
  )
};

const TodoInput = React.createClass({
  getInitialState: function() {
    return { value: ''};
  },
  handleChange: function ({ target: { value } }) {
    this.setState({value: value});
  },
  render: function() {
    return React.createElement('input', {
      id: 'todo-entry',
      value: this.state.value,
      placeholder: 'What todo?',
      onChange: this.handleChange
    });
  }
});

const TodoApp = React.createClass({
  render: function() {
    return React.createElement('div', null,
      React.createElement(TodoInput),
      React.createElement(Todos, {data: this.props.data})
    );
  }
});

const Todo = React.createClass({
  render: function() {
    return React.createElement('li', null, this.props.data);
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

const { createStore } = Redux;
const store = createStore(todos);

store.subscribe(() => myApp(store.getState(), 'todo-list'));

store.dispatch({type: 'ADD_TODO', text: 'hey'});
store.dispatch({type: 'ADD_TODO', text: 'ho'});
store.dispatch({type: 'ADD_TODO', text: 'lets go'});
store.dispatch({type: 'REMOVE_TODO', text: 'lets go'});
