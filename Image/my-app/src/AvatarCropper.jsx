import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

function AvatarCropper() {
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      // Crop the canvas based on the selected area
      const croppedCanvas = document.createElement('canvas');
      const ctx = croppedCanvas.getContext('2d');
      croppedCanvas.width = 200; // Set the desired width
      croppedCanvas.height = 200; // Set the desired height
      ctx.drawImage(
        canvas,
        crop.x,
        crop.y,
        croppedCanvas.width * scale,
        croppedCanvas.height * scale,
        0,
        0,
        croppedCanvas.width,
        croppedCanvas.height
      );
      const croppedDataURL = croppedCanvas.toDataURL();
      // Send croppedDataURL to server or do something with it
      console.log(croppedDataURL);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && (
        <div>
          <AvatarEditor
            ref={(editor) => setEditor(editor)}
            image={image}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={scale}
            rotate={0}
            onPositionChange={setCrop}
            onMouseUp={() => setCrop(editor.getCroppingRect())}
          />
          <div>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarCropper;
