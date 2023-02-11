import React, { useState } from "react";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const DummyUpload = () => {
	const [images, setImages] = useState([]);

	const handleFileUpload = async (event, index) => {
		const file = event.target.files[0];
		if (!file) {
			return;
		}

		if (file.size > MAX_IMAGE_SIZE) {
			alert(
				`Image size must be less than 10 MB. Selected file size: ${(
					file.size /
					1024 /
					1024
				).toFixed(2)} MB`
			);
			return;
		}

		if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
			alert(`Invalid image type. Allowed types: .jpg, .jpeg, .png, .gif`);
			return;
		}

		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await fetch("https://bodyslides.ca/api/upload-image", {
				method: "POST",
				body: formData,
			});
			const { url } = await response.json();
			setImages((prevImages) => {
				const newImages = [...prevImages];
				newImages[index] = { url };
				return newImages;
			});
		} catch (error) {
			console.error(error);
			alert("An error occurred while uploading the image");
		}
	};

	return (
		<div style={{ display: "flex", justifyContent: "space-between" }}>
			{Array.from({ length: 5 }).map((_, index) => (
				<div key={index} style={{ width: "20%", textAlign: "center" }}>
					<label
						htmlFor={`file-input-${index}`}
						style={{ width: "100%", height: "100%", cursor: "pointer" }}
					>
						<input
							type="file"
							accept=".jpg, .jpeg, .png, .gif"
							onChange={(event) => handleFileUpload(event, index)}
							style={{ display: "none" }}
							id={`file-input-${index}`}
						/>
						{images[index] ? (
							<img
								src={images[index].url}
								alt=""
								style={{ width: "100%", height: "100%" }}
							/>
						) : (
							<button style={{ width: "100%", height: "100%" }}>
								Upload image
							</button>
						)}
					</label>
				</div>
			))}
		</div>
	);
};

export default DummyUpload;
