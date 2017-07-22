//Libs
import React from 'react';
import ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Clock} from './Clock';
import $ from 'jquery';

var TODOS = [
  {
    topic: "Get Started",
    description: "Write Your First To-Do by clicking on Add To-Do...",
    Priority: "Low",
    id: 1,
  },
];
var nextId = 2;

var Header = React.createClass ({

  propTypes: {
    title: React.PropTypes.string.isRequired,
  },


  getDefaultProps: function() {
    return {
      title: "To-Do",
    };
  },

  getInitialState: function() {
    return {
      text: "",
    };

  },

  onTextChange: function(event) {
  const text = event.target.value;
  this.setState({text: text});
  },

onAddClick: function() {
  const isVisible = $('.formPaper').slideToggle();
  return {
    isVisible,
  };
},

onSubmit: function(e) {
  e.preventDefault();
},

  render: function() {
  return (
        <div className="head">

            <div className="head-name">{this.props.title}</div>
            <div className="time"><Clock /></div>
            <div className="search">
              <form onSubmit={this.onSubmit}>
                  <input type="text" placeholder="Search To-Do" className="header-input" value={this.state.text} onChange={this.onTextChange} />
                  <input type="submit" value="Search" id="search-input" onClick={this.onSearchClick}/>
              </form>
            </div>
            <div className="new-todo">
                  <button className="addButton" type="submit" value="Add To-Do" onClick={this.onAddClick} >Add To-Do</button>
            </div>
        </div>
     );
   }
});

/*--------To-do Renderer-----------------------------------------------*/

function ToDoRenderer(props) {

    return (
          <div className="todocard cardhide">
              <div className="remove-todo" onClick={props.OnRemove}>✖</div>
              <div className="cardhead">
                <h2>{props.topic}</h2>
              </div>
              <div className="carddesc">
                <p>{props.description}</p>
              </div>
              <div className="cardprior cardhide">
                 <p>{props.Priority}</p>
              </div>
          </div>

          );
      }

ToDoRenderer.propTypes = {
  topic: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  Priority: React.PropTypes.string.isRequired,
  OnRemove: React.PropTypes.func.isRequired,
};

/*----Add To-Do's -----------------------------------------------------*/

var AddToDoForm = React.createClass ({

  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },

      getInitialState: function() {
        return {
          topic: "",
          description: "",
          Priority: "",
      };
    },

      onTopicChange: function(event) {
        const newTopic = event.target.value;
        this.setState({topic: newTopic});
      },

      onDescriptionChange: function(event) {
        const newDesc = event.target.value;
        this.setState({description: newDesc});
      },

      onPriorityChange: function(event) {
        let color;
        const newPrior = event.target.value;
        this.setState({Priority: newPrior});
        if(newPrior==="Low") {
          color = $('.formPaper').css("background-color", "lightgreen");
        }else if(newPrior==="Medium") {
          color = $('.formPaper').css("background-color", "yellow");
        }else if(newPrior==="High"){
          color = $('.formPaper').css("background-color", "tomato");
        }else {
          color = $('.formPaper').css("background-color", "lightgrey");
        }
        return {
          color
        };
      },

      onCancel: function() {
        const isHidden = $('.formPaper').slideToggle();
        this.setState({topic: ""}, {description: ""}, {Priority: ""});
        return {
            isHidden

          };
      },

      onSubmit: function(event) {
         event.preventDefault();
         this.props.onAdd(this.state.topic, this.state.description, this.state.Priority);
         this.setState({topic: ""});
         this.setState({description: ""});
         this.setState({Priority: ""});

         $('.formPaper').slideToggle();

      },

      render: function() {
              return (
                <div className="addForm" >
                  <form className="formPaper" onSubmit={this.onSubmit}>
                          <div className="formPaperHead">
                            <h2 id="form-heading">Add To-Do</h2>
                          </div>


                          <div className="formPaperBody">
                            <div className="topic-field">
                              <label>Title :</label>
                              <input type="text" id="title-input" value={this.state.topic} onChange={this.onTopicChange}/>
                            </div>

                            <div className="desc-field">
                              <label id="desc-label">Description :</label>
                              <textarea rows="7" cols="55" id="description-input" value={this.state.description} onChange={this.onDescriptionChange} >
                                  Description
                              </textarea>
                            </div>

                            <div className="choices">
                              <label >Priority :</label>
                              <select onChange={this.onPriorityChange}>
                                <option value="blank" >-----</option>
                                <option value="Low" >Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                              </select>
                            </div>
                          </div>


                          <div className="form-buttons">
                            <button type="button" id="form-submit-button" onClick={this.onSubmit}>Submit</button>
                            <button type="button" id="form-cancel-button" onClick={this.onCancel}>Cancel</button>
                          </div>
                  </form>
                </div>
              );
      }


});

var Application = React.createClass ({

  propTypes: {
    initialTodos: React.PropTypes.arrayOf(React.PropTypes.shape({
      topic: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
      id: React.PropTypes.number.isRequired,
      Priority: React.PropTypes.string.isRequired,
    })).isRequired,
  },

  getDefaultProps: function() {
    return {
      initialTodos: [
              {
                topic: "Get Started",
                description: "Write Your First To-Do by clicking on Add To-Do...",
                Priority: "Low",
                id: 1,
              },

            ]

      };
  },

  getInitialState: function() {
    return {
      todos: this.props.initialTodos,
    };
  },

  onRemoveToDo: function(index) {
    this.state.todos.splice(index, 1);
    this.setState(this.state);
  },


  onToDoAdd: function(topic, description, Priority) {
    console.log('Todo added:', topic);
    this.state.todos.push({
      topic: topic,
      description: description,
      Priority: Priority,
      id: nextId,
    });
    this.setState(this.state);
    nextId += 1;
  },

  render: function() {
    return (
        <div className="application">
            <Header title={this.props.title} />

            <div className="todolist">

                <h2 id="recenttodo-heading">Recent To-Do</h2>
                  <div className="sort">
                    <div className="sort-red" onClick={this.OnRedClick}></div>
                    <div className="sort-yellow" onClick={this.OnYellowClick}></div>
                    <div className="sort-green" onClick={this.OnGreenClick}></div>
                  </div>

                    {this.state.todos.map(function(todo, index) {
                    return (
                    <ToDoRenderer
                    topic={todo.topic}
                    description={todo.description}
                    key={todo.id}
                    Priority={todo.Priority}
                    OnRemove={function() {this.onRemoveToDo(index)}.bind(this)} />
                    );
                  }.bind(this))}
            </div>

            <AddToDoForm onAdd={this.onToDoAdd}/>

        </div>
        );
  }
});

ReactDOM.render(<Application  />, document.getElementById('container'));
