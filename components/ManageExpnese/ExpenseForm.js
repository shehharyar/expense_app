import { useState } from 'react';
import { View, StyleSheet, Text, Alert} from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/Styles';

function ExpneseForm ({onCancel,submitButtonLabel, onSubmit, defaultValues }) {
    const [ inputs, setInputs ] = useState(
        {
    amount : 
            { value : defaultValues ? defaultValues.amount.toString() : '',
            //    isValid : true   // defaultValues ? true : false 
            isValid: true
            },
        
    date : 
        { value : defaultValues ? getFormattedDate(defaultValues.date) :'' ,
            isValid : true
            },

    description: { value : defaultValues ? defaultValues.description : '',
                   isValid : true }
        }
    )
        function inputChangeHandler(inputIdentifier, enteredValues) {
            setInputs((currValues) => {
                return {
                     ...currValues,
                    [inputIdentifier] : { value : enteredValues, isValid : true},
                }
         })
     }

     function submitHandler(){
        const expenseData ={
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        
        const amountIsvalid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = new Date(expenseData.date).toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0
    
        if( !amountIsvalid || !dateIsValid || !descriptionIsValid) {
           // Alert.alert('Invalid Input', "Check Your Input")
           setInputs((curInputs) =>{
           return {
            amount : { value : curInputs.amount.value , isValid : amountIsvalid},
            date :{ value : curInputs.date.value ,isValid : dateIsValid},
    description: { value : curInputs.description.value, isValid : descriptionIsValid }
}

         })         
           return;
        }
        
        onSubmit(expenseData);
    }
    
    const formIsInvalid =
    !inputs.amount.isValid || 
    !inputs.date.isValid || 
    !inputs.description.isValid;


    // let txt= ""
    // if(formIsInvalid){
    //        txt= "Please check your inputs"
    // }
    // console.log(txt);

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
            <Input style={styles.inputRow} 
            inValid= {!inputs.amount.isValid}
            label="Amount" textInputConfig={ {
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                
                value: inputs.amount.value
            } }/>
            <Input style={styles.inputRow} 
            inValid={!inputs.date.isValid} 
            label="Date" textInputConfig={ {
                placeholder: "YYYY-MM-DD",
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value
            } }/>
                
            </View>
            <Input label="Description" 
            inValid={!inputs.description.isValid}
            textInputConfig={ {
                multiline : true,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description.value,

                // autoCapitalize: "none",
                // autoCorrect: false //by-default is true
                        } }/>
        {formIsInvalid &&(<Text style={styles.errorText}>Please check your inputs</Text>)}                
        
<View style={styles.Buttons}>
          <Button mode="flat" onPress={onCancel} style={styles.button}>
            Cancel
          </Button>
          <Button  style={styles.button} onPress={submitHandler} >
            {submitButtonLabel}            
          </Button>
        </View>
        </View>
    )
}

export default ExpneseForm;

const styles = StyleSheet.create({
   
    form:{
        marginTop: 40
    },
   title:{
    fontSize: 24,
    color: 'white',
    marginVertical:24,
    textAlign:'center',
    fontWeight: 'bold'
   },
    inputsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    inputRow:{
        flex:1
    },
    Buttons:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center'
    },
    button:{
      minWidth: 120,
      marginHorizontal:8
    },
    errorText:{
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
  
})