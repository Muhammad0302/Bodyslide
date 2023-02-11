import React, { useState, useRef, useContext } from "react";
import { Context } from "../../context/dataContext";
import ImageList from "../ImageList";
import add from "../../assets/icons/add.png";
import { useEffect } from "react";
import { uploadImages } from "../../axiosCalls";
const SpaPicture = () => {
	const { setImagesList, imagesList } = useContext(Context);

	const fileRef = useRef(null);
	const [picture1, setPicture1] = useState(null);
	const [picture2, setPicture2] = useState(null);
	const [picture3, setPicture3] = useState(null);
	const [picture4, setPicture4] = useState(null);
	const [picture5, setPicture5] = useState(null);
	const [pictureNo, setPictureNo] = useState(1);
	const [sizeMessage, setSizeMessage] = useState("");
	const [preview, setPreview] = useState([0, 0, 0, 0, 0]);

	console.log(preview);

	const handleFile = (event) => {
		var size = parseFloat(event.target.files[0].size / (1024 * 1024)).toFixed(
			2
		);
		var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
		const reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		if (pictureNo === 1) {
			setPicture1(event.target.files[0]);
			reader.onload = () => {
				setPreview((prevStates) => {
					const newStates = [...prevStates];
					newStates[0] = reader.result;
					return newStates;
				});
			};
		} else if (pictureNo === 2) {
			reader.onload = () => {
				setPreview((prevStates) => {
					const newStates = [...prevStates];
					newStates[1] = reader.result;
					return newStates;
				});
			};
		} else if (pictureNo === 3) {
			reader.onload = () => {
				setPreview((prevStates) => {
					const newStates = [...prevStates];
					newStates[2] = reader.result;
					return newStates;
				});
			};
		} else if (pictureNo === 4) {
			reader.onload = () => {
				setPreview((prevStates) => {
					const newStates = [...prevStates];
					newStates[3] = reader.result;
					return newStates;
				});
			};
		} else {
			reader.onload = () => {
				setPreview((prevStates) => {
					const newStates = [...prevStates];
					newStates[4] = reader.result;
					return newStates;
				});
			};
		}

		if (size > 10) {
			setSizeMessage("Please select image size less than 10 MB");
		} else if (!allowedExtensions.exec(event.target.files[0].name)) {
			setSizeMessage("File format should be in png, jpeg, jpg, gif");
		} else {
			let formData = new FormData();
			formData.append("files", event.target.files[0]);
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

		// else if (pictureNo === 2) {
		// 	setPicture2(event.target.files[0]);
		// } else if (pictureNo === 3) {
		// 	setPicture3(event.target.files[0]);
		// } else if (pictureNo === 4) {
		// 	setPicture4(event.target.files[0]);
		// } else {
		// 	setPicture5(event.target.files[0]);
		// }
	};

	return (
		<div
			style={{
				width: "106%",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<input
				type="file"
				hidden
				ref={fileRef}
				name="file"
				onChange={(event) => handleFile(event)}
			/>

			<div>
				<button
					type="button"
					onClick={() => {
						fileRef.current.click();
						setPictureNo(1);
					}}
					style={{
						height: "100px",
						width: "100px",
						backgroundColor: "white",
						border: "1px solid #EBEBEB",
						borderRadius: "5px",
					}}
				>
					{picture1 ? (
						<>
							{sizeMessage ? (
								<p style={{ color: "red", fontWeight: 500 }}> {sizeMessage} </p>
							) : (
								<>
									<img src={preview[0]} alt="preview" />
								</>
							)}
						</>
					) : (
						<img src={add} width="40" height="40" alt="add img" />
					)}
				</button>
				<span style={{ color: "black" }}>MAIN</span>
			</div>
			<div>
				<button
					type="button"
					onClick={() => {
						fileRef.current.click();
						setPictureNo(2);
					}}
					style={{
						height: "100px",
						width: "100px",
						backgroundColor: "white",
						border: "1px solid #EBEBEB",
						borderRadius: "5px",
					}}
				>
					{picture2 ? (
						<>
							{sizeMessage ? (
								<p style={{ color: "red", fontWeight: 500 }}> {sizeMessage} </p>
							) : (
								<>
									<img src={preview[1]} alt="preview" />
								</>
							)}
						</>
					) : (
						<img src={add} width="40" height="40" alt="add img" />
					)}
				</button>
			</div>
			<div>
				<button
					type="button"
					onClick={() => {
						fileRef.current.click();
						setPictureNo(3);
					}}
					style={{
						height: "100px",
						width: "100px",
						backgroundColor: "white",
						border: "1px solid #EBEBEB",
						borderRadius: "5px",
					}}
				>
					{picture3 ? (
						<>
							{sizeMessage ? (
								<p style={{ color: "red", fontWeight: 500 }}> {sizeMessage} </p>
							) : (
								<>
									<img src={preview[2]} alt="preview" />
								</>
							)}
						</>
					) : (
						<img src={add} width="40" height="40" alt="add img" />
					)}
				</button>
			</div>
			<div>
				<button
					type="button"
					onClick={() => {
						fileRef.current.click();
						setPictureNo(4);
					}}
					style={{
						height: "100px",
						width: "100px",
						backgroundColor: "white",
						border: "1px solid #EBEBEB",
						borderRadius: "5px",
					}}
				>
					{picture4 ? (
						<>
							{sizeMessage ? (
								<p style={{ color: "red", fontWeight: 500 }}> {sizeMessage} </p>
							) : (
								<>
									<img src={preview[3]} alt="preview" />
								</>
							)}
						</>
					) : (
						<img src={add} width="40" height="40" alt="add img" />
					)}
				</button>
			</div>
			<div>
				<button
					type="button"
					onClick={() => {
						fileRef.current.click();
						setPictureNo(5);
					}}
					style={{
						height: "100px",
						width: "100px",
						backgroundColor: "white",
						border: "1px solid #EBEBEB",
						borderRadius: "5px",
					}}
				>
					{picture5 ? (
						<>
							{sizeMessage ? (
								<p style={{ color: "red", fontWeight: 500 }}> {sizeMessage} </p>
							) : (
								<>
									<img src={preview[4]} alt="preview" />
								</>
							)}
						</>
					) : (
						<img src={add} width="40" height="40" alt="add img" />
					)}
				</button>
			</div>
		</div>
	);
};

export default SpaPicture;
