import { StyleSheet } from "react-native";
const styles=StyleSheet.create({
    main:{
      backgroundColor:'#fff',
      flex:1
    },
    textInput:{
        fontSize:18,
        borderWidth:2,
        borderColor:'black',
        color:"black",
        margin:10,
    },
    label:{
        fontSize:20,
        marginTop:10,
        marginLeft:10,
        marginBottom:2,
        color:'black'
    },
    textInputs:{
        flex:4
    },
    button:{
        fontSize:40,
        margin:10,
    },
    buttons:{
        flex:2,
        // justifyContent:'flex-end'
    },
})

export default styles;