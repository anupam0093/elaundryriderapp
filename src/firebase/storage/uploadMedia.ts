import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';

export const uploadFiles = async (fileUris: string[], storeIdFolder: string[], folder: string[], subfolder: string[], fileNames: string[]): Promise<string[]> => {
  try {
    const downloadURLs: string[] = [];

    for (let i = 0; i < fileUris.length; i++) {
      const fileUri = fileUris[i];
      const fileName = fileNames[i];

      const storageRef = ref(storage, `${storeIdFolder}/${folder}/${subfolder}/${fileName}`);
      const response = await fetch(fileUri);

      if (!response.ok) {
        throw new Error(`Failed to fetch file from ${fileUri}`);
      }

      const blob = await response.blob();
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      downloadURLs.push(downloadURL);
    }

    return downloadURLs;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};
