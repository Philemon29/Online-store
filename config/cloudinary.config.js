const cloudinary = require('cloudinary').v2;


const{CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env

console.log(`the cloudinary cloud name is ${CLOUDINARY_CLOUD_NAME}`)
console.log(`the cloudinary api key is ${CLOUDINARY_API_KEY}`)
console.log(`the cloudinary api secret is ${CLOUDINARY_API_SECRET}`)
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

module.exports = cloudinary