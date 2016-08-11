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

	rawMarkup:function(){
		var md=new Remarkable();
		var rawMarkup = md.render(this.props.children.toString());

		return {__html: rawMarkup};
	},
	render:function(){
		
		return (
			<div className='comment'>
			<h2 className='commentAuthor'>
				{this.props.author}
			</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()}/>
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

ReactDOM.render(
	// begin with an uppercase letter
	// means line 8 var CommentBox the whole thing, not the class name
	<CommentBox data={data}/>,
	document.getElementById('content')
);