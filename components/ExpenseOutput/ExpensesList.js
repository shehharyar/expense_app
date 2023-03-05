import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem'


function renderExpenseItems(itemData){
    return (
        <ExpenseItem {...itemData.item}/>
    )
}

const ExpensesList = ({ expenses }) => {
  return (
   <FlatList data={expenses} 
   renderItem={renderExpenseItems} 
   keyExtractor={(item) => item.id } 
   /> 
  )
}

export default ExpensesList