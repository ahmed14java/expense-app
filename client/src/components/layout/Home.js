import React, { Component } from 'react'
import FloatButton from '../FloatButton';
import AddForm from '../AddForm';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getExpense } from '../../actions/expense_actions';
import Spinner from './Spinner';
import ExpenseItem from '../ExpenseItem';
import MonthSelector from '../MonthSelector';
import moment from 'moment';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: moment().month()
    };
  }
  componentDidMount = () => {
    this.getExpense();
  }

  onSelectMonth(month){
   this.setState({selected: month});
   this.getExpense(month);
  }

  getExpense(month){
    const { getExpense } = this.props;
    getExpense(month);
  }
  

  render() {
    const {selected} = this.state;
    const { fetching , expense } = this.props;
    if (fetching) {
      console.log(fetching);
      
      return(<Spinner />);
    }
    return (
      <div style={{marginTop: 30}}>
        <MonthSelector onSelectMonth={this.onSelectMonth.bind(this)} selected={selected} />
        <h3>Expense List</h3>
        <hr />


        {expense.map((item) => (
          <ExpenseItem key={item._id} expenseItem={item} />
        ))}
        <AddForm />
      </div>
    )
  }
}

Home.propTypes = {
  getExpense: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  fetching: state.expense.fetching,
  expense: state.expense.expense
})

export default connect(mapStateToProps , {getExpense})(Home);