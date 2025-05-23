import {auth,database} from '../config/firebaseConfig';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import {ref,set,get} from 'firebase/database';
import axios from 'axios';

export const registerUser = async (username,email,password)=>{
    try{
        const useCredential = await createUserWithEmailAndPassword(auth,email,password);
        const user = useCredential.user;
        console.log(user)
        await set(ref(database,"users/"+user.uid),{
            username,
            email,
            joinDate:Date.now()
        })
        console.log(user);
        return {username,email,uid:user.uid};
    }catch(err){
        if(err instanceof Error){
            throw new Error(err.message);
        }else{
            throw new Error('An Unexpected Error Occured');
        }
    }
}

export const loginUser = async (email,password)=>{
    try{
        console.log(email,password)
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        console.log(userCredential)
        const user = userCredential.user;
        console.log(user.uid)
        const snapshot = await get(ref(database,'users/'+user.uid));
        console.log(snapshot)
        if(snapshot.exists()){
            console.log(snapshot.val())
            return {username:snapshot.val().username,email:snapshot.val().email,uid:user.uid}
        }else{
            return false;
        }
    }catch(err){
        if(err instanceof Error){
            console.log(err)
            throw new Error(err.message);
        }else{
            throw new Error('An Unexpected Error Occured')
        }
    }
}



export const uploadImage = async (images, uid) => {
    try {
        const imageUrls = [];
        for (const image of images) {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'ml_default');
            formData.append('public_id', `productImages/${uid}_${image.name}`);

            const response = await axios.post('https://api.cloudinary.com/v1_1/drif27bxa/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const downloadURL = response.data.secure_url;
            imageUrls.push(downloadURL);
        }
        console.log('Uploaded image URLs:', imageUrls);
        return imageUrls;
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('An Unexpected Error Occurred');
        }
    }
};


export const uploadProduct = async (data,images, uid) => {
    try {
        console.log(data,images,uid)
        const imageUrls = await uploadImage(images, uid);

        await set(ref(database, 'products/' + Date.now()), {...data,images:imageUrls}); 
        console.log('Product uploaded successfully:', data);
        return data; 
    } catch (err) {
        if (err instanceof Error) {
            console.log(err);
            throw new Error(err.message); 
        } else {
            throw new Error('An Unexpected Error Occurred');
        }
    }
};


export const getAllProducts = async () => {
    try {
      const snapshot = await get(ref(database, 'products/'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (typeof data === 'object' && data !== null) {
            const productsArray = Object.entries(data).map(([id, product]) => ({
              id, 
              ...product
            }));
            console.log(data);
            console.log(productsArray);
            return productsArray;
          }
          return data;
      } else {
        console.log('No products');
        return [];
      }
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An Unexpected Error Occurred');
      }
    }
  };
  