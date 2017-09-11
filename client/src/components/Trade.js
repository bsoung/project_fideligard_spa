import React, { Component } from 'react';

export default class Trade extends Component {
	constructor() {
		super();

		this.state = {
			quantity: 1
		};
	}

	onChangeQuantity = e => {
		this.setState({
			quantity: Number(e.target.value)
		});
	};

	render() {
		return (
			<div className="trade">
				<h2>Trade</h2>
				<form>
					<div className="form-group">
						<label htmlFor="ticker">Ticker:</label>
						<input
							type="ticker"
							className="form-control"
							id="ticker"
							name="ticker"
							value={this.props.stock.ticker}
							readOnly="readOnly"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="sel1">Buy/Selll:</label>
						<select className="form-control" id="sel1">
							<option>Buy</option>
							<option>Sell</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="quantity">Quantity:</label>
						<input
							type="number"
							className="form-control"
							id="quantity"
							name="quantity"
							onChange={this.onChangeQuantity}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="date">Date:</label>
						<input
							type="date"
							className="form-control"
							id="date"
							name="date"
							value={this.props.selectedDate}
							readOnly="readOnly"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="price">Price:</label>
						<input
							type="number"
							className="form-control"
							id="price"
							name="price"
							value={this.props.stock.current}
							readOnly="readOnly"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="price">Cost:</label>
						<input
							type="number"
							className="form-control"
							id="price"
							name="price"
							value={this.props.stock.current * this.state.quantity}
							readOnly="readOnly"
						/>
					</div>

					<button type="submit" className="btn btn-success">
						Purchase
					</button>
				</form>
			</div>
		);
	}
}
