import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stockActions from '../actions/stockActions';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Header from '../components/Header';
import moment from 'moment';
import _ from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
      selectedDate: null
    };
  }

  componentDidMount() {
    if (!this.props.stockReducer.stocks.length) {
      this.props.actions.getStocks();
    }
  }

  updateFilterValue = e => {
    let input = e.target.value.toLowerCase();
    this.setState({
      filterText: input
    });
  };

  onDateChange = e => {
    let selectedDate = e.target.value;
    this.setState({
      selectedDate: selectedDate
    });
  };

  getStocks = () => {
    const date = this.state.selectedDate;
    const stockNameFilter = this.state.filterText;
    const stockArray = this.props.stockReducer.stocks;
    const filteredStocks = stockArray.filter(stock => {
      return stock.ticker.toLowerCase().indexOf(stockNameFilter) >= 0;
    });
    // group each filtered stock by ticker into a composite object
    const groupedStocks = _.groupBy(filteredStocks, f => f.ticker);

    // create an array based on the results of our mappedResults
    const mappedResults = _.map(groupedStocks, stockArray =>
      this.createStockObject(stockArray, date)
    );

    // remove all falsy values i.e null, 0, "", undefined, and NaN
    // deal with the fact that some dates return insufficient data
    return _.compact(mappedResults);
  };

  createStockObject = (stockTickerArray, relativeDate) => {
    if (relativeDate == null) {
      return null;
    }

    const dayCurrent = moment(relativeDate);
    const dayOne = moment(relativeDate).subtract(1, 'days');
    const daySeven = moment(relativeDate).subtract(7, 'days');
    const dayThirty = moment(relativeDate).subtract(30, 'days');

    // TODO: re-fuckin-factor
    const dayOneValue = stockTickerArray.filter(stock =>
      moment(stock.date).isSame(dayOne)
    )[0];
    const daySevenValue = stockTickerArray.filter(stock =>
      moment(stock.date).isSame(daySeven)
    )[0];
    const dayThirtyValue = stockTickerArray.filter(stock =>
      moment(stock.date).isSame(dayThirty)
    )[0];
    const dayCurrentValue = stockTickerArray.filter(stock =>
      moment(stock.date).isSame(dayCurrent)
    )[0];

    // TODO: handle weekends with no data
    return {
      ticker: stockTickerArray[0].ticker,
      current: dayCurrentValue ? dayCurrentValue.closingPrice : 'none',
      one:
        dayOneValue && dayCurrentValue
          ? this.processStockValue(
              dayOneValue.closingPrice - dayCurrentValue.closingPrice
            )
          : 'none',
      seven:
        daySevenValue && dayCurrentValue
          ? this.processStockValue(
              daySevenValue.closingPrice - dayCurrentValue.closingPrice
            )
          : 'none',
      thirty:
        dayThirtyValue && dayCurrentValue
          ? this.processStockValue(
              dayThirtyValue.closingPrice - dayCurrentValue.closingPrice
            )
          : 'none'
    };
  };

  processStockValue = stock => {
    if (stock > 0) {
      return `+${stock.toFixed(2)}`;
    } else {
      return stock.toFixed(2);
    }
  };

  render() {
    return (
      <div className="app">
        <Header />
        <Dashboard
          onDateChange={this.onDateChange}
          stocks={this.getStocks()}
          updateFilterValue={this.updateFilterValue}
        />
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(stockActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
