import React, { useState, useContext } from "react";
import { Context } from "../context/dataContext";
import { useEffect } from "react";
import { uploadImages } from "../axiosCalls";

const ImageList = ({
	file,
	sizeMessage,
	setSizeMessage,
	fieldValue,
	setLogourl,
}) => {
	const [preview, setPreview] = useState(null);
	const { setImagesList, imagesList } = useContext(Context);

	console.log(imagesList);

	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		setPreview(reader.result);
	};

	var size = parseFloat(file.size / (1024 * 1024)).toFixed(2);
	var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

	const uploadListImages = () => {
		if (size > 10) {
			setLogourl("");
			setSizeMessage("Please select image size less than 10 MB");
		} else if (!allowedExtensions.exec(file.name)) {
			setLogourl("");
			setSizeMessage("File format should be in png, jpeg, jpg, gif");
		} else {
			console.log(fieldValue);

			let formData = new FormData();
			formData.append("files", fieldValue);
			uploadImages(formData)
				.then((res) => {
					setImagesList((prevState) => [
						...prevState,
						{ img: res.data.data[0].img },
					]);
				})
				.catch((err) => {
					console.log(err);
				});

			setSizeMessage("");
		}
	};

	useEffect(() => {
		uploadListImages();
	}, [fieldValue]);

	return (
		<div>
			{sizeMessage ? (
				<p style={{ color: "red", fontWeight: 500 }}> {sizeMessage} </p>
			) : (
				<>{preview ? <img src={preview} alt="preview" /> : "loading.."}</>
			)}
		</div>
	);
};
export default ImageList;
