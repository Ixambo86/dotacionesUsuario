import { db } from "./firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";


// 📌 Obtener dotación, ausentismo y líderes de UAP desde Firestore
export const fetchFromFirebase = async (setDotacionUAP, setAusentismo, setDotaciones) => {
  try {
    
    const docRef = doc(collection(db, "dotaciones"), "turnos");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDotaciones(docSnap.data().dotaciones || {});
      setAusentismo(docSnap.data().ausentismo || []);
    }

    const uapRef = doc(collection(db, "dotaciones"), "uap");
    const uapSnap = await getDoc(uapRef);

    if (uapSnap.exists()) {
      setDotacionUAP(uapSnap.data().lista || []);
    }
    
  } catch (error) {
    console.error("Error al leer datos:", error);
  }
};

// 📌 Grabar dotación, ausentismo y líderes de UAP en Firestore
export const saveToFirebase = async (dotaciones, ausentismo, dotacionUAP) => {
  try {
    await setDoc(doc(collection(db, "dotaciones"), "turnos"), { dotaciones, ausentismo });
    await setDoc(doc(collection(db, "dotaciones"), "uap"), { lista: dotacionUAP });
    alert("Datos guardados");
  } catch (error) {
    console.error("Error al guardar:", error);
  }
};

