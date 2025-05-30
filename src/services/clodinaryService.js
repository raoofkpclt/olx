import axios from "axios";

export const uploadImage = async (images) => {
    const formData = new FormData();
    images.forEach(file => {
        formData.append("file[]", file);
    });
    formData.append("upload_preset", "ml_default");
    try{
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/drif27bxa/image/upload",
          formData,
          {
              headers:{
                'Content-Type':'multipart/form-data'
              }
          }
        );
        console.log(response.data)
    }catch(err){
        if(err instanceof Error){
            console.log(err);
        }else{
            console.log('An Unexpected Error Occured');
        }
    }
};
