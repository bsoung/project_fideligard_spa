import React from 'react';

const StockRow = ({ profile }) => {
	return (
		<tr>
			<td>
				{profile.totalCapital}
			</td>
			<td>
				{profile.totalCapital}
			</td>
			<td>what is investing</td>
			<td>:)</td>
			<td>:|</td>
			<td>:(</td>
		</tr>
	);
};

export default ({ profile }) => {
	return (
		<div className="portfolio">
			<h2>Portfolio</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Cost Basis</th>
						<th>Current Value</th>
						<th>Profit/Loss</th>
						<th>1d</th>
						<th>7d</th>
						<th>30d</th>
					</tr>
				</thead>
				<tbody>
					<StockRow profile={profile} />
				</tbody>
			</table>
		</div>
	);
};
