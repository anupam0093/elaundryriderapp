// uploadFile.ts

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebaseConfig'; // Import Firebase Storage

export const uploadFile = async (fileUri: string, fileName: string): Promise<string> => {
  try {
    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `uploads/${fileName}`);
    
    // Fetch the file data
    const response = await fetch(fileUri);
    const blob = await response.blob();
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, blob);
    console.log('Uploaded a blob or file!', snapshot);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('File available at', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
