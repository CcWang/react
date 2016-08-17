var WholeList = React.createClass({
  getInitialState:function(){
    return{
      tasksList:[
        {'name':'this is tasks1','completed':false},
        {'name':'this is tasks2','completed':true}]
    };
  },
  handleAddTask:function(taskName){
    var newTask={'name':taskName,'completed':false}
    var tasksListNew = this.state.tasksList
    tasksListNew.push(newTask)
    this.setState({
      tasksList:tasksListNew
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
    var rowU=[]
    var rowC=[]

    if (this.props.tasksList){
      this.props.tasksList.forEach(function(t){
        console.log(t.name)
        if (t.completed){
          rowC.push(<TaskC task={t} key={t.name}/>)
        }else{
          rowU.push(<Task task={t} key={t.name}/>)

        }
      }.bind(this));
    };
    return(
      <table>
        <tbody>
          {rowU}
          {rowC}
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
      <tr>
        <td>
          <span
            className='glyphicon glyphicon-ok'
            style={{color:'grey'}}>
          </span> {this.props.task.name}
          <span
            className='glyphicon glyphicon-remove'
            style={{color:'grey'}}
            onClick={this.handleRemove}>

          </span>
        </td>
      </tr>
    );
  }
});
var TaskC = React.createClass({
  handleRemove:function(){
    console.log('remove')
  },
  render:function () {
    return(
      <tr style={{'background-color':'lightblue'}}>
        <td className="completed">
          <span
            className='glyphicon glyphicon-ok'
            style={{color:'grey'}}>
          </span> {this.props.task.name}
          <span
            className='glyphicon glyphicon-remove'
            style={{color:'grey'}}
            onClick={this.handleRemove}>

          </span>
        </td>
      </tr>
    );
  }
});

var AddTask = React.createClass({
  handleChange:function(){
    this.props.handleAddTask(this.refs.newTaskName.value);
    //console.log(this.refs.newTaskName.value)
    this.refs.newTaskName.value=''
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
