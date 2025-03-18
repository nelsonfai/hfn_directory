'use client'
import { db,storage } from '@/firebase/config';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const useFirebase = () => {
  // Function to create a new member
  const createMember = async (memberData) => {
    try {
      const docRef = await addDoc(collection(db, 'members'), memberData);
      console.log('Document written with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  };

  // Function to get all members
  const getMembers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'members'));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error;
    }
  };

  // Function to get a single member by ID
  const getMemberById = async (id) => {
    try {
      const docRef = doc(db, 'members', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('No such document!');
      }
    } catch (error) {
      console.error('Error fetching member:', error);
      throw error;
    }
  };

  // Function to update a member
  const updateMember = async (id, updatedData) => {
    try {
      const docRef = doc(db, 'members', id);
      await updateDoc(docRef, updatedData);
      console.log('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  };

  // Function to delete a member
  const deleteMember = async (id) => {
    try {
      const docRef = doc(db, 'members', id);
      await deleteDoc(docRef);
      console.log('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  };

  // Function to upload an image to Firebase Storage
  const uploadImage = async (file, folder = 'member_images') => {
    try {
      const fileRef = ref(storage, `${folder}/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File uploaded successfully:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  // Function to delete an image from Firebase Storage
  const deleteImage = async (imageUrl) => {
    try {
      if (!imageUrl) return;
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      console.log('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  };

  return { createMember, getMembers, getMemberById, updateMember, deleteMember, uploadImage, deleteImage };
};

export default useFirebase;
