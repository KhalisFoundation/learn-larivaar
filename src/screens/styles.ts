
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  drawerLabel: {
    fontSize: 20,
    fontWeight: 'normal'
  },
  drawerItem: {
    borderBottomWidth:1,
    borderBottomColor: '#ccc'
  },
  txtBox: {
    flex:1, 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection: 'row'
  },
  inputBox: {
    padding:5, 
    color: '#666', 
    paddingHorizontal:10, 
    borderColor:'#ccc', 
    borderWidth:1, 
    marginHorizontal:5
  },
  FontBtnHdr: {
    flex:1,
    flexDirection: 'row'
  }
});