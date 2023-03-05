import { createContext, useReducer } from "react";
// const DUMMY_EXPENSES =[
// {
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

export const ExpenseContext=createContext({
    expenses :[],
    addExpense  : ({description, date, amount}) =>{},
    setExpense : (expenses) => {},
    deleteExpense: (id) =>{},
    updateExpense : (id, {description, date, amount}) =>{}
}) 

function expensesReducer (state, action){
    
        switch(action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            // return [{...action.payload, id :id}, ...state]
            return [action.payload, ...state];
            case 'SET':
                const inverted = action.payload.reverse();
                return inverted;
            case 'UPDATE':
            const updateableExpenseIndex = state.findIndex(
                (expense)=> expense.id === action.payload.id
                );
            let updateableExpense = state[updateableExpenseIndex]
            let updatedItem ={ ...updateableExpense, ...action.payload.data}
            let updatedExpenses = [...state];
            updatedExpenses[updateableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload)
          default:
        return state;
    }
      
}


function ExpenseContextProvider ({children}){
    
    const [expenseState, dispatch]=useReducer(expensesReducer, []);
   
    function addExpense(expenseData){
    dispatch({type : 'ADD', payload: expenseData})
    }
   
    function setExpense (expense){
        dispatch( { type : "SET" , payload : expense} )
    }
    function deleteExpense(id){
        dispatch({type : "DELETE", payload :  id})
    }
   
    function updateExpense (id, expenseData){
        dispatch({type: "UPDATE" , payload: { id : id, data : expenseData } })
    }

    const value ={
        expenses: expenseState,
        addExpense: addExpense,
        setExpense: setExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }
    return (
        <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
    )
}

export default ExpenseContextProvider;