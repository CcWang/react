var WholeList = React.createClass({
  getInitialState:function(){
    return{
      tasksList:[{"name":"task1","completed":false,"pro":false}],
      showComplete:false,
      showUncomplete:false,
      filterText:'',
      msg:''
    };
  },
  handleAddTask:function(taskName){
    if(!taskName){
      this.setState({
      msg:'Did you enter any task??'
      })
      return;
    }
    var newTask={'name':taskName,'completed':false,"pro":false}
    var tasksListNew = this.state.tasksList
    tasksListNew.push(newTask)
    this.setState({
      tasksList:tasksListNew
    },function(){
      console.log(this.state.tasksList)
    }.bind(this));
  },
  handleComplete:function(taskName){
    var tasksListNew=this.state.tasksList
    tasksListNew.forEach(function(p){
      if (p.name ===taskName){
        p.completed = !(p.completed)
      }
    });
    this.setState({
      tasksList:tasksListNew
    })
  },
  handleRemove:function(taskName){
    var tasksListNew=this.state.tasksList
    for(var i=0;i<tasksListNew.length;i++){
      if (tasksListNew[i].name === taskName ) {
        tasksListNew.splice(i,1);
      }
    }
    this.setState({
      tasksList:tasksListNew
    })

  },
  handleShowComplete:function(checked){
      this.setState({
        showComplete:checked
      })
  },
  handleShowUncomplete:function(checked){
    this.setState({
      showUncomplete:checked
    })
  },
  handleFilter:function(text){

    this.setState({
      filterText:text
    })
  },
  handlePro:function(level,taskName){
    console.log(level)
    var tasksListNew=this.state.tasksList
    tasksListNew.forEach(function(p){
      if (p.name ===taskName){
        p.pro = level
      }
    });
    this.setState({
      tasksList:tasksListNew
    })

  },
  render:function(){
    return (
      <div>
        <h2>What is your main focus for today?</h2>
        <Alarm msg={this.state.msg}/>
        <div>
          <AddTask
          tasksList={this.state.tasksList} handleAddTask={this.handleAddTask}
        />
        </div>
        <div>
          <SearchBar
          tasksList={this.state.tasksList}
          showComplete={this.state.showComplete}
          showUncomplete={this.state.showUncomplete}
          handleShowComplete={this.handleShowComplete}
          handleShowUncomplete={this.handleShowUncomplete}
          filterText={this.state.filterText}
          handleFilter={this.handleFilter}
          />
        </div>
        <div id="todoList">
          <TodoList
            tasksList={this.state.tasksList}
            handleComplete={this.handleComplete}
            handleRemove={this.handleRemove}
            handlePro={this.handlePro}
            showComplete={this.state.showComplete}
            showUncomplete={this.state.showUncomplete}
            filterText={this.state.filterText}

          />
        </div>
      </div>
    );
  }
});
var Alarm = React.createClass({
  render:function(){
    return(
      <div id='alarm'>
      <p>{this.props.msg}</p>
      </div>
    );
  }
});
var SearchBar=React.createClass({
  handleComplete:function(){
    this.props.handleShowComplete(this.refs.checkedComplete.checked)
  },
  handleUncomplete:function(){
    this.props.handleShowUncomplete(this.refs.checkedUncomplete.checked)
  },
  filter:function(){
    this.props.handleFilter(this.refs.filterText.value)
  },
  render:function(){
    if (this.props.tasksList.length >=1) {
      return(
        <div id='searchBar'>
        <input
        type='text'
        placeholder='Search ...'
        value={this.props.filterText}
        ref='filterText'
        onChange={this.filter}
        />
        <p>
        <input type='checkbox'
        checked={this.props.showComplete}
        ref='checkedComplete'
        onChange={this.handleComplete}
        />
        Only show completed
        </p>
        <p>
        <input type='checkbox'
        checked={this.props.showUncomplete}
        ref='checkedUncomplete'
        onChange={this.handleUncomplete}
        />
        Only show uncompleted
        </p>
        </div>
      );

    }else{
      return null
    }
  }
});
var TodoList=React.createClass({
  render:function () {
    var rowU=[]
    var rowC=[]
    var rows=[]
    if (this.props.tasksList){
      this.props.tasksList.forEach(function(t){
        if (t.completed){
          if (this.props.filterText && t.name.indexOf(this.props.filterText) ===-1 ) {
            return;
          }else{
            console.log(t.pro)
            if(t.pro){
              if(t.pro ===1){
              rowC.push(<Task task={t} key={t.name} handleComplete={this.props.handleComplete}
                handleRemove={this.props.handleRemove} handlePro={this.props.handlePro} taskClass={'completed'}
                styleName={'proOne'}

                />)
              }
            }else{
              rowC.push(<Task task={t} key={t.name} handleComplete={this.props.handleComplete}
                handleRemove={this.props.handleRemove} handlePro={this.props.handlePro} taskClass={'completed'}

                />)

            }
          }

        }else{
          if (this.props.filterText && t.name.indexOf(this.props.filterText) ===-1) {
            return;
          }else{
            if(t.pro){
              if(t.pro===1){
                rowU.push(<Task task={t} key={t.name} handleComplete={this.props.handleComplete} handlePro={this.props.handlePro}
                  handleRemove={this.props.handleRemove}
                  />)
              }
            }else{
              rowU.push(<Task task={t} key={t.name} handleComplete={this.props.handleComplete} handlePro={this.props.handlePro}
                handleRemove={this.props.handleRemove}
                styleName={"proOne"}
                />)
            }
          }

        }
      }.bind(this));
      if (this.props.showUncomplete && this.props.showComplete ) {
        rows=[]
      }else if (this.props.showComplete) {
        console.log(rowC);
        rows=rowC
      }else if(this.props.showUncomplete){
        rows=rowU

      }else{
        console.log(rowU);
        rows.push(rowU,rowC)
      };
    };
    return(
      <div>
        <table className="table">
          <tbody>
          {rows}
          </tbody>
        </table>
      </div>
    );
  }
});
var Task = React.createClass({
  handleRemove:function(){
    this.props.handleRemove(this.props.task.name)
  },
  handleComplete:function(){
    this.props.handleComplete(this.props.task.name);
  },
  handlePro:function(level){
    this.props.handlePro(level,this.props.task.name);
  },
  render:function () {
    return(
      <tr className={this.props.taskClass}>
        <td>
          <p>
            <span className={this.props.styleName} onClick={()=>this.handlePro(1)}>! | </span>
            <span> !! | </span>
            <span> !!! </span>
          </p>
        </td>
        <td>
          <span
            className='glyphicon glyphicon-ok'
            onClick={this.handleComplete}>
          </span>
        </td>
        <td className="cc">
          {this.props.task.name}
        </td>
        <td>
          <span
            className='glyphicon glyphicon-remove'
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
  handleEnter:function(e){

    if (e.charCode == 13) {
        this.props.handleAddTask(this.refs.newTaskName.value);
         this.refs.newTaskName.value=''
      }
  },
  render:function(){
    return(
      <div id="addTask">
        <input type='text'
          placeholder='add task..' value={this.props.newTaskName}
          ref="newTaskName"
          onKeyPress={this.handleEnter}/>
        <button onClick={this.handleChange} >Add </button>
      </div>
    )
  }
});
ReactDOM.render(

  <WholeList />,
  document.getElementById('todoList')
)
