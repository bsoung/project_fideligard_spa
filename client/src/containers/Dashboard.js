import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/stockActions';
import Stocks from '../components/Stocks';
import Portfolio from '../components/Portfolio';
import _ from 'lodash';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filteredStocks: [],
			symbolDesc: false
		};
	}

	componentWillReceiveProps(nextProps) {
		const currentProps = this.state.filteredStocks;
		console.log(nextProps, '???');

		if (!_.isEqual(currentProps, nextProps)) {
			this.setState({
				filteredStocks: nextProps.stocks
			});
		}
	}

	onClickSort = (optionsArray, sortType) => {
		let copy = Object.assign({}, this.state);
		let sortedArr = _.orderBy(copy.filteredStocks, optionsArray, sortType);
		console.log(copy.filteredStocks, 'original', sortedArr, 'sorted');
		this.setState({
			filteredStocks: sortedArr
		});

		if (sortType === 'asc') {
			this.setState({
				symbolDesc: false
			});
		} else {
			this.setState({
				symbolDesc: true
			});
		}
	};

	render() {
		console.log(this.state.filteredStocks);
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
								<h2>Portfolio</h2>
								<Portfolio />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default Dashboard;
// <Slider min={0} max={20} defaultValue={3} handle={Handle} />
