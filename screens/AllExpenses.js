import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpenseOutput/ExpensesOutput'
import { ExpenseContext } from '../store/expense-context'

const AllExpenses = () => {
 const expenseCtx= useContext(ExpenseContext)
  return (
    <ExpensesOutput expenses={expenseCtx.expenses} 
    expensesPeriod= "Total"  
    fallBackText ="No Expenses registered found!"/>
  )
}

export default AllExpenses