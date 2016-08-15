/***
-ProductsFile
	-ProductSearch
	-ProductList
		-ProductCategory
		-ProductRow
***/
var PRODUCTS=[
	{category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  	{category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
	{category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
	{category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
	{category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
	{category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

var ProductSearch=React.createClass({
	render:function () {
		// body...
		return(
			<div className='productSearch'>
				<input type='text' placeholder='Search...' />
				<p>
				<input type='checkbox' />
				Only Show Products in Stcok</p>

			</div>
		);
	}
});
var ProductList=React.createClass({
	render:function(){
		var rows=[]
		var lastCategory = null;
		this.props.products.forEach(function(p){
			// console.log(p)
			if (p.category !==lastCategory){
				rows.push(<ProductCategory category={p.category} key={p.category} />);
			}
			rows.push(<ProductRow product={p} key={p.name} />);
			lastCategory=p.category;
			console.log(rows);
		});
		return(
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
					
				</thead>
				<tbody>
				{rows}
				</tbody>
			</table>
		);
	}
});
var ProductCategory = React.createClass({
	render:function(){
		return (
			<tr>
				<th>{this.props.category}</th>
			</tr>
		);
	}
});
var ProductRow = React.createClass({
	render:function(){
	// if this.props.product.stocked is True, return return whatever after '?' but before ':', else return whatever after ':'
	var name = this.props.product.stocked ? this.props.product.name:<span style={{color:'red'}}> {this.props.product.name} </span>
		return(
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		);
	}
});
var SearchBar = React.createClass({
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      
      </form>
    );
  }
});
var ProductsFile = React.createClass({
	getInitialState:function(){
		return{
			filterText:'',
			inStockOnly:false
		};
	},
	render:function(){
		return(
			<div>
				<SearchBar 
					filterText={this.state.filterText} 
					inStockOnly={this.state.inStockOnly}
				/>
				<ProductList products={this.props.hello}/>
			</div>
		);
	}
});

ReactDOM.render(
	<ProductsFile hello={PRODUCTS}/>,
	document.getElementById('content')
);