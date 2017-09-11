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

export default props => {
	return (
		<div>
			<h2>Stocks</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Symbol</th>
						<th>Price</th>
						<th>1d</th>
						<th>7d</th>
						<th>30d</th>
						<th>Trade?</th>
					</tr>
				</thead>
				<tbody>
					{props.stocks.map((stock, i) => {
						return <StockRow stock={stock} key={i} />;
					})}
				</tbody>
			</table>
		</div>
	);
};
