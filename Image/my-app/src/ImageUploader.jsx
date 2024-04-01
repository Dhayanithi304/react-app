import React, { useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import "./ResizableDiv.css";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const editorRef = useRef(null);
  const [saveImg, setSaveImg] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  const handleRotationChange = (e) => {
    const newRotation = parseInt(e.target.value, 10);
    setRotation(newRotation);
  };

  const handleSave = () => {
    if (editorRef.current) {
      console.log(editorRef.current);
      const canvas = editorRef.current.getImageScaledToCanvas();
      const dataURL = canvas.toDataURL();
      // Now you can use the dataURL or send it to the server
      setSaveImg(dataURL);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
        {image && (
          <div>
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={250}
              height={250}
              border={50}
              borderRadius={25}
              scale={scale}
              rotate={rotation}
            />
            <div>
              <label>Scale:</label>
              <input
                type="range"
                min="1"
                max="2"
                step="0.01"
                value={scale}
                onChange={handleScaleChange}
              />
            </div>
            <div>
              <label>Rotation:</label>
              <input
                type="range"
                min="0"
                max="360"
                value={rotation}
                onChange={handleRotationChange}
              />
            </div>
            <button onClick={handleSave}>Save</button>
          </div>
        )}
        <img src={saveImg} alt="" />
    </div>
  );
};

export default ImageUploader;


// import React, { useState, useRef } from "react";
// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";

// const ImageUploader = () => {
//   const [image, setImage] = useState(null);
//   const [croppedImage, setCroppedImage] = useState(null);
//   const cropperRef = useRef(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCrop = () => {
//     if (cropperRef.current) {
//       const crop = cropperRef.current 
//       console.error(crop);
//       setCroppedImage(crop.toDataURL());
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleImageChange} />
//       {image && (
//         <div>
//           <Cropper
//             ref={cropperRef}
//             src={image}
//             style={{ height: 400, width: "100%" }}
//             aspectRatio={1}
//             guides={true}
//             crop={handleCrop}
//           />
//           <button onClick={handleCrop}>Crop Image</button>
//         </div>
//       )}
//       {croppedImage && <img src={croppedImage} alt="Cropped Image" />}
//     </div>
//   );
// };

// export default ImageUploader;
