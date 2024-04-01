import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';

const A = () => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef();
  const [saveImg, setSaveImg] = useState();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL();
      // Perform action with croppedImage (e.g., save to server, display in UI)
      // console.log('Cropped image:', );
      setSaveImg(croppedImage)
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input type="range" min="1" max="3" step="0.01" value={scale} onChange={handleScaleChange} />
      {image && (
        <div>
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={scale}
            rotate={0}
          />
          <button onClick={handleSave}>Save</button>
          <img src={saveImg} alt="" />
        </div>
      )}
    </div>
  );
};

export default A;
