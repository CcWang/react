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
			//console.log(p.name);
			if(p.name.indexOf(this.props.filterText) === -1 || (!p.stocked && this.props.inStockOnly)){
				return;
			}
			if (this.props.deleted[p.name]){
				return;
			}
			if (p.category !==lastCategory){
				rows.push(<ProductCategory category={p.category} key={p.category} />);
			}
			rows.push(<ProductRow product={p} key={p.name} deleteP={this.props.deleteP}/>);
			lastCategory=p.category;
		}.bind(this));

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
	delete_p:function(){
		this.props.deleteP(this.props.product.name)
	},

	render:function(){
	// if this.props.product.stocked is True, return return whatever after '?' but before ':', else return whatever after ':'
	var name = this.props.product.stocked ?
		this.props.product.name :
		(
		<span style={{color:'red'}}>
			{this.props.product.name}
		</span>
		)

		return(
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
				<td><button style={{color:'red'}} onClick={this.delete_p} >X</button></td>
			</tr>
		);
	}
});

var SearchBar = React.createClass({

	handleChange:function(){
	//called parent onUserInput function, to set the state value, then the state value pass to product list as this.props values
		this.props.onUserInput(
			this.refs.filterTextInput.value,
			this.refs.inStockOnlyInput.checked
		);
		console.log(this.refs.filterTextInput.value,
			this.refs.inStockOnlyInput.checked)
	},

  render: function() {
    return (
      <form>
        <input type="text"
        	placeholder="Search..."
        	value={this.props.filterText}
        	ref="filterTextInput"
        	onChange={this.handleChange}
        />
        <p>
          <input
          	type="checkbox"
          	checked={this.props.inStockOnly}
          	ref="inStockOnlyInput"
          	onChange={this.handleChange}/>
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
			inStockOnly:false,
			deleted: {}
		};
	},
	handleUserInput:function(filterText,inStockOnly){
		this.setState({
			filterText:filterText,
			inStockOnly:inStockOnly
		});
	},
	handleDelete:function(product_name){
		var deleted = this.state.deleted;
		deleted[product_name] = 1;
		this.setState({
			deleted: deleted
		},function(){
			console.log(this.state.deleted)
		}.bind(this))
	},
	render:function(){
		return(
			<div>
				<SearchBar
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
					onUserInput={this.handleUserInput}
				/>
				<ProductList
					products={this.props.hello}
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
					deleted={this.state.deleted}
					deleteP={this.handleDelete}

				/>
			</div>
		);
	}
});

ReactDOM.render(
	<ProductsFile hello={PRODUCTS}/>,
	document.getElementById('content')
);
