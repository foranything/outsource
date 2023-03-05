import { auth } from './config';
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  User,
  onAuthStateChanged,
  getAuth,
  signOut
} from 'firebase/auth';
import { assert } from '../util/assert';
import { Log } from '../config/log';

export namespace Auth {
  export async function handleGoogleLogin(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return new Promise<UserCredential>((resolve, reject) => {
      signInWithPopup(auth, provider)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  export async function handleSignOut(): Promise<void> {
    const auth = getAuth();
    signOut(auth);
  }

  export async function checkSignedIn(): Promise<User | undefined | null> {
    const auth = getAuth();
    return new Promise<User | undefined>((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject(user);
        }
      });
    });
  }

  export async function onClickSignInEvent(
    setUserData: React.Dispatch<React.SetStateAction<User | undefined>>
  ): Promise<void> {
    try {
      const { user } = await handleGoogleLogin();
      assert(user, `user is ${user}`);
      setUserData(user);
    } catch (error) {
      Log.printError(error);
    }
  }
}
