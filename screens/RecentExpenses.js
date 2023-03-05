// import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpenseOutput/ExpensesOutput'
import ErrorOverLay from '../components/UI/ErrorOverLay'
import LoadingOverLay from '../components/UI/LoadingOverLay'
import { ExpenseContext } from '../store/expense-context'
import { getDateMinusDays } from '../util/date'
import { getExpense } from '../util/htttp'

const RecentExpenses = () => {
 const expensesCtx= useContext(ExpenseContext)
 const [Isfetching, setIsfetching] = useState(true)
 const [error, setError] = useState();

 useEffect(() => {

    async function getData(){
      setIsfetching(true)   
      try {
        const data =  await getExpense();
        expensesCtx.setExpense(data)
        
      } catch (error) {
        setError('Could not fetch expenses')
      }
      setIsfetching(false)
  // expensesCtx.addExpense(data)
   
  }

getData();

 }, [])

 
if(error && !Isfetching){
  return <ErrorOverLay message={error} />
}

if(Isfetching){
  return <LoadingOverLay/>
}

 const recentExpenses = expensesCtx.expenses.filter((expense)=> {
   
  const today = new Date()
  const date7DaysAgo = getDateMinusDays(today, 2)

  return (expense.date > date7DaysAgo) && (expense.date <= today);
 })  

  return (
   <ExpensesOutput expenses={recentExpenses} 
   expensesPeriod=" Last 7 days"
   fallBackText = "No expenses registered for the last 7 days" />
  )
}

export default RecentExpenses