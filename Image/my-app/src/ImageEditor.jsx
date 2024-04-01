import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';

const ImageEditor = () => {
  const [image, setImage] = useState('');
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [cropArea, setCropArea] = useState({ x: 0.1, y: 0.1, width: 0.8, height: 0.8 }); // Initial crop area
  const editorRef = useRef(null);

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

  const handleSave = () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const dataURL = canvasScaled.toDataURL();
      // Now you can use the dataURL or send it to the server
      console.log(dataURL);
    }
  };

  const handleCropChange = (e) => {
    const { name, value } = e.target;
    setCropArea({ ...cropArea, [name]: parseFloat(value) });
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
            color={[255, 255, 255, 0.6]} // RGBA
            scale={scale}
            rotate={rotation}
            crossOrigin="anonymous"
            borderRadius={250}
            onLoadFailure={(error) => console.log('Avatar Editor Load Failed:', error)}
            onImageReady={() => console.log('Image Ready')}
            onImageChange={() => console.log('Image Changed')}
            onMouseUp={() => console.log('Mouse Up')}
            style={{ borderRadius: '50%' }}
            {...cropArea}
          />
          <div>
            <label>Scale:</label>
            <input
              type="range"
              min="1"
              max="2"
              step="0.01"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Rotation:</label>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value, 10))}
            />
          </div>
          <div>
            <label>Crop X:</label>
            <input
              type="text"
              value={cropArea.x}
              name="x"
              onChange={handleCropChange}
            />
          </div>
          <div>
            <label>Crop Y:</label>
            <input
              type="text"
              value={cropArea.y}
              name="y"
              onChange={handleCropChange}
            />
          </div>
          <div>
            <label>Crop Width:</label>
            <input
              type="text"
              value={cropArea.width}
              name="width"
              onChange={handleCropChange}
            />
          </div>
          <div>
            <label>Crop Height:</label>
            <input
              type="text"
              value={cropArea.height}
              name="height"
              onChange={handleCropChange}
            />
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
