import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, addDoc, query, where, collection, getDocs, Timestamp  } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyB4vyPSRfczsOJ8mcMijtXmjxufL9h8xio",
  authDomain: "emmalou-28473.firebaseapp.com",
  projectId: "emmalou-28473",
  storageBucket: "emmalou-28473.appspot.com",
  messagingSenderId: "1098198895990",
  appId: "1:1098198895990:web:759dec2fa242cc43767e57"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export default db;

export async function getAllItems() {
  const miColec = collection(db,'items');
  const itemsSnapshot = await getDocs(miColec);

  return itemsSnapshot.docs.map(doc => {
      return {
      ...doc.data(),
      id: doc.id
      }
})};

export async function getItemsByCategory(categoryid){
  const miColec = collection(db,'items');
  const queryItem = query(miColec, where("category", '==', categoryid));
  const itemSnapshot = await getDocs(queryItem);

  return itemSnapshot.docs.map(doc => {
      return {
      ...doc.data(),
      id: doc.id
      }
  
})};

export async function getItem(id){
  const miColec = collection(db,'items');
  const itemRef = doc(miColec, id);
  const itemSnapshot = await getDoc(itemRef);

  
      return {
      ...itemSnapshot.data(),
      id: itemSnapshot.id
      }
  
};

export async function createBuyOrder(orderData){
  const buyTimeStamp = Timestamp.now();
  const orderWithDate = {
      ...orderData,
      date: buyTimeStamp
  };
  const miColec = collection(db,'buyOrders');
  const orderDoc = await addDoc(miColec, orderWithDate);
  return orderDoc.id;   
}