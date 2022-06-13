import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyA3PlzMqzcD4oE0St2VWrxVHfj1UPmNWEs',
	authDomain: 'airport-tranfer.firebaseapp.com',
	projectId: 'airport-tranfer',
	storageBucket: 'airport-tranfer.appspot.com',
	messagingSenderId: '364995782555',
	appId: '1:364995782555:web:cb7c6f23afdee26faa233e',
	measurementId: 'G-EG2ME1RYR8',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);