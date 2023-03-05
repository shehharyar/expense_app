import { View, Text, StyleSheet, DrawerLayoutAndroid } from 'react-native'
import { useContext, useLayoutEffect} from 'react'
import { ExpenseContext } from '../store/expense-context';
import { useState } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/Styles';
import Button from '../components/UI/Button';
import ExpneseForm from '../components/ManageExpnese/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/htttp';
import LoadingOverLay from '../components/UI/LoadingOverLay';
import ErrorOverLay from '../components/UI/ErrorOverLay';

const ManageExpense = ( {route , navigation} ) => {
  const expenseCtx = useContext(ExpenseContext)
  
  const [Loading, setLoading] = useState(false)  
  
  const [error, setError] = useState();

  const editedExpenseId = route.params?.expenseID;
  const isEditing = !!editedExpenseId;

const selectedExpense =  expenseCtx.expenses.find(
  expense => expense.id === editedExpenseId
  )

useLayoutEffect(() => {
    navigation.setOptions ({
      title : isEditing ? "Edit Expense" :"Add Expense"
    }
    )
    
  }, [navigation, isEditing])

async function deleteExpenseHandler () {
 setLoading(true)
 try {
   await deleteExpense(editedExpenseId)
   expenseCtx.deleteExpense(editedExpenseId)
   navigation.goBack()
  
 } catch (error) {
  setError("Could not delete expense -- Please try again!")
  setLoading(false) 
}
}
  function cancelHandler(){
    navigation.goBack()
  }
  
 async function confirmHandler(expenseData) {
  setLoading(true) 
 try {
      if(isEditing)
        { 
        expenseCtx.updateExpense( editedExpenseId,expenseData)
        await updateExpense(editedExpenseId,expenseData)
        }
        else{
           const id =  await storeExpense(expenseData);
          expenseCtx.addExpense({...expenseData, id: id});
        }
       navigation.goBack()
  
 } 
 catch (error) {
  setError("Could not save data -- please try Again!")
  setLoading(false)
}
}


if(error && !Loading){
  return <ErrorOverLay message = {error}  />
}


if(Loading){
  return <LoadingOverLay/> 
}
  return (
    <View style={styles.container}>
      <ExpneseForm 
      submitButtonLabel={isEditing ? "Update" : 'Add'}
      onSubmit={confirmHandler}
      onCancel={cancelHandler}
      defaultValues={selectedExpense}
/>
  
      {
        isEditing && 
        (<View style={styles.deleteContainer}>
        <IconButton icon="trash" color={GlobalStyles.colors.error500} size={24} 
        onPress={deleteExpenseHandler}/>
      </View>
      )
      }
    </View>
  )
}

export default ManageExpense;


const styles= StyleSheet.create({
  container:{
    flex: 1,
    padding : 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer:{
    marginTop: 16,
    paddingTop : 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
   
  }
  
})