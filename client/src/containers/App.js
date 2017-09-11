import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stockActions from '../actions/stockActions';
import * as profileActions from '../actions/profileActions';
import { Link } from 'react-router-dom';
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
    this.props.profileActions.setTotalCapital(200000);
    if (!this.props.stockReducer.stocks.length) {
      this.props.stockActions.getStocks();
    }
  }

  onChangeDate = e => {
    let selectedDate = e.target.value;
    this.setState({
      selectedDate: selectedDate
    });
  };

  updateFilterValue = e => {
    let input = e.target.value.toLowerCase();
    this.setState({
      filterText: input
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
      this._createStockObject(stockArray, date)
    );

    // remove all falsy values i.e null, 0, "", undefined, and NaN
    // deal with the fact that some dates return insufficient data

    return _.compact(mappedResults);
  };

  _createStockObject = (stockTickerArray, relativeDate) => {
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
      current: dayCurrentValue
        ? dayCurrentValue.closingPrice.toFixed(2)
        : 'none',
      one:
        dayOneValue && dayCurrentValue
          ? this._processStockValue(
              dayOneValue.closingPrice - dayCurrentValue.closingPrice
            )
          : 'none',
      seven:
        daySevenValue && dayCurrentValue
          ? this._processStockValue(
              daySevenValue.closingPrice - dayCurrentValue.closingPrice
            )
          : 'none',
      thirty:
        dayThirtyValue && dayCurrentValue
          ? this._processStockValue(
              dayThirtyValue.closingPrice - dayCurrentValue.closingPrice
            )
          : 'none'
    };
  };

  _processStockValue = stock => {
    if (stock > 0) {
      return `+${stock.toFixed(2)}`;
    } else {
      return stock.toFixed(2);
    }
  };

  render() {
    console.log(this.props);
    const { isFetching, error, stocks } = this.props.stockReducer;

    const loadingMessage = <p>fetching stock data....</p>;
    const errorMessage = (
      <p>Oops! Something went wrong. Try refreshing the page</p>
    );

    const dashboard = (
      <Dashboard
        onChangeDate={this.onChangeDate}
        stocks={this.getStocks()}
        updateFilterValue={this.updateFilterValue}
        profile={this.props.profileReducer}
        selectedDate={this.state.selectedDate}
      />
    );
    return (
      <div className="app">
        <Header />
        {isFetching ? loadingMessage : dashboard}
        {error && errorMessage}
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  stockActions: bindActionCreators(stockActions, dispatch),
  profileActions: bindActionCreators(profileActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
