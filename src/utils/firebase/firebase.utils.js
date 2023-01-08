import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signInWithEmailAndPassword,
	// signInWithRedirect,
	signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

// const { } = useContext(UserContext);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCSsn358KsZjPqT6A0WCf4U-AkDy4v4q4c",
	authDomain: "crown-clothing-db-4898f.firebaseapp.com",
	projectId: "crown-clothing-db-4898f",
	storageBucket: "crown-clothing-db-4898f.appspot.com",
	messagingSenderId: "453083291674",
	appId: "1:453083291674:web:513447b479833089a071a3",
};
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// PROVIDER(S)
// create Google Auth Provider for Google account sign-ins
const provider_Google = new GoogleAuthProvider();
provider_Google.setCustomParameters({
	prompt: "select_account",
});

// Authentication
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider_Google);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider_Google); // redirect not sending data to firebase Auth in Firebase Console

// create Database object
export const db = getFirestore();

// COLLECTIONS
//  creating collections
export const addCollectionDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey),
		batch = writeBatch(db);
	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());

		batch.set(docRef, object);
	});

	await batch.commit();
};
// retrieving collections
export const getCategoriesAndDocuments = async (collectionKey) => {
	const collectionRef = collection(db, collectionKey.toLowerCase());
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const categoryArray = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

	return categoryArray;
};

// Create user in firestore database and return signed in credentials from userDocRef
export const createUserDocRefFromAuth = async (userAuth) => {
	if (!userAuth) return;
	// console.log("userAuth:", userAuth);

	// create a user object with data from the provider
	const userDocRef = doc(db, "users", userAuth.uid); // (database, 'collection string', aUniqueID/recordKey)
	// console.log("userDocRef:", userDocRef);

	//getDoc(userDocRef) checks the firestore database for the existence of this userDocRef
	const userSnapShot = await getDoc(userDocRef);
	// console.log("userSnapShot:", userSnapShot);
	// console.log("userSnapShot exists:", userSnapShot.exists());

	// if user does not already exist then create the user document
	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth,
			createdAt = new Date(),
			updatedAt = new Date();

		//create user using setDoc
		try {
			await setDoc(userDocRef, { displayName, email, updatedAt, createdAt });
		} catch (error) {
			console.log("Error creating the user:", error.message);
		}
	}

	return userDocRef;
};

// use this function in an onClick of a signIn button
export const logGoogleUsersWithPopUp = async () => {
	const { user } = await signInWithGooglePopup();
	const userAuth = user;
	// console.log("firebase.utils: logGoogleUsersWithPopUp: userAuth", userAuth);
	await createUserDocRefFromAuth(userAuth);
	return userAuth;
};

// Create user With email and password
export const createAuthUserWithEmailAndPassword = async (email, password, displayName) => {
	if (!email || !password) return;

	try {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
		const userAuth = { ...user, displayName: displayName };
		// console.log("createAuthUserWithEmailAndPassword userAuth: ", userAuth);

		await createUserDocRefFromAuth(userAuth);
		return userAuth;
	} catch (error) {
		if (error.code === "auth/email-already-in-use") {
			alert("Email already registered to a current user. Use a differnt email address.");
		}
		console.log("There was an error trying to create this user with email and password:", error);
	}
};

// sign in with email and password
export const signInUsingEmailAndPassword = async (email, password) => {
	if (!email || !password) {
		alert("Missing email and/or password.");
		return;
	}

	try {
		const { user } = await signInWithEmailAndPassword(auth, email, password);
		var userAuth = user;

		userAuth = await getUserDisplayNameFromeFireStore(userAuth);

		// console.log("signInUsingEmailAndPassword: userAuth:", userAuth);
		return userAuth;
	} catch (error) {
		switch (error.code) {
			case "auth/user-not-found":
				alert("User not found.");
				break;
			case "auth/wrong-password":
				alert("Incorrect password.");
				break;
			default:
				console.log("There was an error trying to create this user with email and password:", error);
		}
	}
};
export const getUserDisplayNameFromeFireStore = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);
	var userSnapShot = await getDoc(userDocRef);
	var displayName;
	// console.log("firebase.utils: getUserDisplayNameFromeFireStore: userSnapShot.data() 1:", userSnapShot.data());

	//if displayName is null, set time out to give firestore some time to finish storing data
	if (!userSnapShot.exists()) {
		setTimeout(async () => {
			userSnapShot = await getDoc(userDocRef);
			displayName = await userSnapShot.data().displayName;
			console.log(
				"firebase.utils: getUserDisplayNameFromeFireStore: userSnapShot.data() 2:",
				userSnapShot.data()
			);
		}, 5000);
	} else displayName = await userSnapShot.data().displayName;

	return (userAuth = { ...userAuth, displayName });
};

// sign out user
export const signOutUser = async () => await signOut(auth);

// auth state change listener
export const onAuthStateChangedListener = (callBack) => {
	if (!callBack) return;

	return onAuthStateChanged(auth, callBack);
};
