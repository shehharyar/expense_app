import { View, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/Styles'


// const DUMMY_EXPENSES =[
//     {
//         id : 'e1',
//         description: 'A book',
//         amount : 14.59,
//         date: new Date('2021-12-29')
//     },
//     {
//         id : 'e2',
//         description: 'SSD + RAM',
//         amount : 61.23,
//         date: new Date('2022-07-31')
//     },
//     {
//         id : 'e3',
//         description: 'Macbook Air Pro',
//         amount : 100.99,
//         date: new Date('2022-12-09')
//     },
//     {
//         id : 'e4',
//         description: 'Clothes',
//         amount : '29.90',
//         date: new Date('2022-09-11')
//     },
//     {
//         id : 'e5',
//         description: 'A book',
//         amount : 45.00,
//         date: new Date('2022-11-09')
//     },
// ] 

const ExpensesOutput = ({ expenses, expensesPeriod, fallBackText }) => {

  

  let content = <Text style={styles.infoText}>{fallBackText}</Text>


  if(expenses.length > 0 ){
    content= <ExpensesList expenses={expenses}/>
  }

  

    return (
    <View style={styles.container}>
       <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
       {content}
    </View>
  )
}

export default ExpensesOutput;
const styles= StyleSheet.create({
    container :{
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText:{
        color: "white",
        fontSize: 16,
        marginTop: 32,
        textAlign: "center"
    }
})