var WholeList = React.createClass({
  render:function(){
    return (
      <div>
      <h1> This is TO DO List </h1>
      <SearchBar />
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

ReactDOM.render(
  <WholeList />,
  document.getElementById('todoList')
)
