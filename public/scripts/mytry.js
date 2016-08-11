/***
- Comment BOX
	-CommentList
		-Comment
	-CommentForm
***/

var CommentBox=React.createClass({
	render: function () {
		return (
			// classname begin with an lower case
			<div className='commentBox'>
				<CommentForm />
				<h1>Hello, This is a commnet box. Tring React</h1>
				<CommentList />
			</div>
		);
	}
});
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList" >
        Hello, world! I am a CommentList.
        <Comment author="Pete Hunt">This is one comment </Comment>
        <Comment author="Jordan Walke">This is *another* comment </Comment>
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});
var Comment = React.createClass({
	render:function(){
		var md=new Remarkable();
		return (
			<div className='comment'>
			<h2 className='commentAuthor'>
				{this.props.author}
			</h2>
				{md.render(this.props.children.toString())}
			</div>
		);
	}
});
ReactDOM.render(
	// begin with an uppercase letter
	// means line 8 var CommentBox the whole thing, not the class name
	<CommentBox />,
	document.getElementById('content')
);