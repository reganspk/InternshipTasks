import auth from '@react-native-firebase/auth';
export const SignUp = (email, password) => {
  console.log(email, password, 'jellsdaf');
  return new Promise((resolve, reject) => {
    console.log('lasjflsajfl');
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        resolve('User account created & signed in!');
      })
      .catch(error => {
        /* if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error); */
        reject(error, 'yeah');
      });
  });
};

export const SignIn = (email, password) => {
  console.log(email, password, 'jellsdaf');
  return new Promise((resolve, reject) => {
    console.log('lasjflsajfl');
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resolve('User account Signed In!');
      })
      .catch(error => {
        /* if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error); */
        reject(error, 'yeah');
      });
  });
};
