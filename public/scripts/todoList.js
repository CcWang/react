var WholeList = React.createClass({
  getInitialState:function(){
    return{
      tasksList:[{'name':'this is tasks1','completed':false}]
    };
  },
  handleAddTask:function(taskName){
    console.log('taskName',taskName)
    var newTask={'name':taskName,'completed':false}
    console.log('new Task',newTask)
    var tasksListNew = this.state.tasksList.push(newTask)
    console.log('new Task list',tasksListNew)
    this.setState({
      tasksList:[{'name':'this is tasks1','completed':false},{'name':'this is taks2','completed':false}]
    },function(){
      console.log(this.state.tasksList)
    }.bind(this));
  },
  render:function(){
    return (
      <div>
      <h1> This is TO DO List </h1>
      <SearchBar tasksList={this.state.tasksList}/>
      <TodoList tasksList={this.state.tasksList}/>
      <AddTask
        tasksList={this.state.tasksList} handleAddTask={this.handleAddTask}
      />
      </div>
    );
  }
});
var SearchBar=React.createClass({
  render:function(){
    return(
      <form>
        <input type='text' placeholder='Search your to do list...'/>
        <p>
          <input type='checkbox'/>
          Only show completed
        </p>
        <p>
          <input type='checkbox'/>
          Only show uncompleted
        </p>
      </form>
    );
  }
});
var TodoList=React.createClass({
  render:function () {
    var row=[]
    if (this.props.tasksList){
      this.props.tasksList.forEach(function(t){
        row.push(<Task task={t} key={t.name}/>)
      }.bind(this));
    };
    return(
      <table>
        <tbody>
          {row}
        </tbody>
      </table>
    );
  }
});
var Task = React.createClass({
  handleRemove:function(){
    console.log('remove')
  },
  render:function () {
    return(
      <tr><td> <span className='glyphicon glyphicon-ok' style={{color:'grey'}}></span> {this.props.task.name} <span className='glyphicon glyphicon-remove' style={{color:'grey'}} onClick={this.handleRemove}></span></td></tr>
    );
  }
});

var AddTask = React.createClass({
  handleChange:function(){
    this.props.handleAddTask(this.refs.newTaskName.name);
    //console.log(this.refs.newTaskName.value)
  },
  render:function(){
    return(
      <div>
        <input type='text'
          placeholder='add task..' value={this.props.newTaskName}
          ref="newTaskName"/>
        <button className="btn btn-primary" onClick={this.handleChange}>Add </button>
      </div>
    )
  }
});
ReactDOM.render(
  <WholeList />,
  document.getElementById('todoList')
)
