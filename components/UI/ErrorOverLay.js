import { Text, StyleSheet, View, Button } from "react-native";
import { GlobalStyles } from "../../constants/Styles";
export default function ErrorOverLay( { message, onConfirm } ){
    return(
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An Error Occured!</Text>        
            <Text style ={styles.text}>{message}</Text>

</View>
    )
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: "center",
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text:{
        color: "white",
        textAlign : 'center',
        marginBottom: 8
    },
    title:{
        fontSize: 16,
        fontWeight: 'Bold'
    }
})