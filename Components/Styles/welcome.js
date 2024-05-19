import { StyleSheet } from "react-native";

const welcome = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 850,
    width: "100%",
    overflow: "scroll",
    margin:"auto",
  },
  input: {
    marginTop: 10,
    fontSize: 15,
    height: 45,
    textAlign: "center",
    width: "80%",
    color: "#000000",
    backgroundColor: "#DCDCDE",
    borderRadius: 10,
    alignItems:"center",
    // marginRight:10,
  },
  viewButtonSection: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
    justifyContent:"center",
    alignItems:"center",
    // left:6
      
  },
  viewButtonTop: {
    display: "flex",
    justifyContent:"center",
    alignItems:"center"
  }
});

export { welcome as styles };
