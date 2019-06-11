import firebase from 'react-native-firebase';
//Authentication by token
export async function Authentication() {
  const { currentUser } = firebase.auth();
  // this.setState({ currentUser });
  if (currentUser) {
    const objectToken = await currentUser.getIdToken();
    //  console.log('Her er objectToken: ', objectToken);
    // const token = JSON.stringify(objectToken);
    // console.log("her er token: " + token);
    // this.getProfileDetails(objectToken);
    return objectToken;
  }
}
