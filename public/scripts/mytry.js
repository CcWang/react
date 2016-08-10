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
				<h1>Hello, This is a commnet box. Tring React</h1>
			</div>
		);
	}
});
ReactDOM.render(
	// begin with an uppercase letter
	<CommentBox />,
	document.getElementById('content')
);