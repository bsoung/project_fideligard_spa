import React from 'react';
import { Link } from 'react-router-dom';

const StockRow = ({ stock, showTrade }) => {
	return (
		<tr>
			<td>
				{stock.ticker}
			</td>
			<td>
				{stock.current}
			</td>
			<td>
				{stock.one}
			</td>
			<td>
				{stock.seven}
			</td>
			<td>
				{stock.thirty}
			</td>
			<td>
				<a onClick={() => showTrade(stock)}>Trade</a>
			</td>
		</tr>
	);
};

export default ({ onClickSort, stocks, symbolDesc, priceDesc, showTrade }) => {
	console.log(symbolDesc, 'inside stocks comp');

	const createCaret = (dataType, sortType, symbolType, symbolBool) => {
		if (symbolBool === true) {
			return (
				<a onClick={() => onClickSort(dataType, sortType, symbolType)}>
					<i className="fa fa-caret-up" aria-hidden="true" />
				</a>
			);
		} else {
			return (
				<a onClick={() => onClickSort(dataType, sortType, symbolType)}>
					<i className="fa fa-caret-down" aria-hidden="true" />
				</a>
			);
		}
	};

	return (
		<div>
			<table className="table">
				<thead>
					<tr>
						<th>
							Symbol
							{!symbolDesc
								? createCaret('ticker', 'desc', 'symbolDesc', symbolDesc)
								: createCaret('ticker', 'asc', 'symbolDesc', symbolDesc)}
						</th>
						<th>
							Price
							{!priceDesc
								? createCaret('current', 'desc', 'priceDesc', priceDesc)
								: createCaret('current', 'asc', 'priceDesc', priceDesc)}
						</th>
						<th>1d</th>
						<th>7d</th>
						<th>30d</th>
						<th>Trade?</th>
					</tr>
				</thead>
				<tbody>
					{stocks.map((stock, i) => {
						return <StockRow stock={stock} key={i} showTrade={showTrade} />;
					})}
				</tbody>
			</table>
		</div>
	);
};
