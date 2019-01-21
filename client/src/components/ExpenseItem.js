import React from "react";
import { ListGroup, ListGroupItem , Badge } from "reactstrap";
import moment from 'moment';

function ExpenseItem({expenseItem}) {
  return (
    <ListGroup>
      <ListGroupItem>
          <div className='float-left' >
              <span style={{marginRight: 5}}> {expenseItem.description ? expenseItem.description : 'Expense Item'} </span>
              <Badge color="dark"> ${expenseItem.ammount} </Badge>
              <div className='text-muted'>
                  {moment(expenseItem.created).format('LL')}
              </div>
          </div>
          <div className='float-right' >
              <span> {expenseItem.description ? expenseItem.description : 'Expense Item'} </span>
          </div>
      </ListGroupItem>
    </ListGroup>
  );
}
export default ExpenseItem;
