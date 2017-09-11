import React from 'react';

const StockRow = ({ stock }) => {
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
			<td>Trade</td>
		</tr>
	);
};

export default ({ onClickSort, stocks, symbolDesc }) => {
	console.log(stocks, 'inside stocks comp');

	const caretDown = (
		<a onClick={() => onClickSort(['ticker'], 'asc')}>
			<i className="fa fa-caret-down" aria-hidden="true" />
		</a>
	);
	const caretUp = (
		<a onClick={() => onClickSort(['ticker'], 'desc')}>
			<i className="fa fa-caret-up" aria-hidden="true" />
		</a>
	);
	return (
		<div>
			<table className="table">
				<thead>
					<tr>
						<th>
							Symbol
							{!symbolDesc ? caretUp : caretDown}
						</th>
						<th>Price</th>
						<th>1d</th>
						<th>7d</th>
						<th>30d</th>
						<th>Trade?</th>
					</tr>
				</thead>
				<tbody>
					{stocks.map((stock, i) => {
						return <StockRow stock={stock} key={i} />;
					})}
				</tbody>
			</table>
		</div>
	);
};
