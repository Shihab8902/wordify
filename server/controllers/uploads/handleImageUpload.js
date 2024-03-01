const blogCollection = require("../../model/blogModel");

require("dotenv").config();
const cloudinary = require('cloudinary').v2;


const handleImageUpload = async (req, res, next) => {

    const data = req.body;


    //Cloudinary Configs
    cloudinary.config({
        secure: true,
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });


    //Cloudinary options
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    const videoOptions = {
        type: 'upload',
        resource_type: 'video',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    }


    try {
        // Upload the image to cloudinary
        const imageResult = await cloudinary.uploader.upload(data.image, options);
        if (imageResult) {
            data.image = imageResult.secure_url;
        }

        // upload the video
        const videoResult = await cloudinary.uploader.upload(data.videoLink, videoOptions);
        console.log(videoResult);
        if (videoResult) {
            data.videoLink = videoResult.secure_url;
        }
        //Save the blog post
        await blogCollection.create(data);
        res.send({ message: "success" });



    }
    catch (error) {
        next(error);
    }



};







module.exports = handleImageUpload;