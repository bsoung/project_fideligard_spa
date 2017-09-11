import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/stockActions';
import Stocks from '../components/Stocks';
import Portfolio from '../components/Portfolio';
import Trade from '../components/Trade';
import _ from 'lodash';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filteredStocks: [],
			symbolDesc: false,
			priceDesc: false,
			showPortfolio: true,
			stock: {}
		};
	}

	componentWillReceiveProps(nextProps) {
		const currentProps = this.state.filteredStocks;

		if (!_.isEqual(currentProps, nextProps)) {
			this.setState({
				filteredStocks: nextProps.stocks
			});
		}
	}

	onClickSort = (dataType, sortType, symbolType) => {
		let copy = Object.assign({}, this.state);
		let sortedArr = _.orderBy(copy.filteredStocks, [dataType], sortType);

		this.setState({
			filteredStocks: sortedArr
		});

		if (sortType === 'asc') {
			this.setState({
				[symbolType]: false
			});
		} else {
			this.setState({
				[symbolType]: true
			});
		}
	};

	showTrade = stock => {
		return this.setState({
			stock,
			showPortfolio: false
		});
	};

	render() {
		const { showPortfolio, stock } = this.state;
		return (
			<div className="container">
				<div className="row-fluid">
					<div className="col-xs-5">
						<h2>Stocks</h2>
						<label htmlFor="filter">Search:</label>
						<input
							type="text"
							id="filter"
							name="filter"
							placeholder="filter stocks"
							onChange={this.props.updateFilterValue}
						/>
						<Stocks
							stocks={this.state.filteredStocks}
							symbolDesc={this.state.symbolDesc}
							onClickSort={this.onClickSort}
							showTrade={this.showTrade}
						/>
					</div>
					<div className="col-xs-7">
						<div className="row-fluid">
							<form>
								<div>
									<label htmlFor="datePicker">Date:</label>
									<input
										type="date"
										id="datePicker"
										name="datePicker"
										min="2016-01-01"
										max="2016-12-31"
										onChange={this.props.onChangeDate}
									/>
								</div>
							</form>
							<div>
								{showPortfolio
									? <Portfolio profile={this.props.profile} />
									: <Trade
											stock={stock}
											selectedDate={this.props.selectedDate}
										/>}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
