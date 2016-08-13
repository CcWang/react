/***
- Comment BOX
	-CommentList
		-Comment
	-CommentForm
***/
var data =[
	{id:1, author:"Pete Hunt", text:"This is one comment"},
	{id:2, author:"Jordan Walke", text:"This is *another* comment"}
];

var CommentBox=React.createClass({
	render: function () {
		return (
			// classname begin with an lower case
			<div className='commentBox'>
				<CommentForm />
				<h1>Hello, This is a commnet box. Tring React</h1>
				<CommentList data={this.props.data} />
			</div>
		);
	}
});
var CommentList = React.createClass({
  render: function() {
  	var commentNodes = this.props.data.map(function(comment){
  		return (
  			<Comment author={comment.author} key={comment.id}>
  				{comment.text}
  			</Comment>
  		);
  	});
    return (
      <div className="commentList" >
        Hello, world! I am a CommentList.
        {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({

	render:function(){
		
		return (
			<div className='comment'>
			<h2 className='commentAuthor'>
				{this.props.author}
			</h2>
				{this.props.children}
			</div>
		);
	}
});

//get information then save to server 
var CommentForm = React.createClass({
	getInitialState:function(){
		return {author:'',text:''};
	},
	handleAuthorChange:function(e){
		this.setState({author:e.target.value});
	},
	handleTextChange:function(e){
		this.setState({text:e.target.value});
	},
	handleSubmit:function(e){
	//Call preventDefault() on the event to prevent the browser's default action of submitting the form.


		e.preventDefault();
		var author=this.state.author.trim();
		var text=this.state.text.trim();
		if (!text || !author){
			return;
		}
		console.log(text,author);
		this.setState({author:'',text:''});
	},
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <p> Adding more comment </p>
        <input type='text' placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
        <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
        <input type="submit" value="post" />
      </form>
    );
  }
});

ReactDOM.render(
	// begin with an uppercase letter
	// means line 8 var CommentBox the whole thing, not the class name
	<CommentBox data={data}/>,
	document.getElementById('content')
);