const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image provided",
            });
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "expense-tracker/profiles" },
                (error, uploadedImage) => {
                    if (error) return reject(error);
                    resolve(uploadedImage);
                }
            );

            stream.end(req.file.buffer);
        });

        return res.status(200).json({
            success: true,
            imageUrl: result.secure_url,
            publicId: result.public_id,
        });
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Image upload failed",
        });
    }
};

module.exports = uploadImage;