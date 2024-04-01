import React, { useState } from 'react';

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropRect, setCropRect] = useState(null);
  const [dragStart, setDragStart] = useState(null);

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

  const handleMouseDown = (e, side) => {
    const { clientX, clientY } = e;
    setDragStart({ x: clientX, y: clientY });
    setCropRect({ side, x: clientX, y: clientY, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (dragStart) {
      const { clientX, clientY } = e;
      const { x: startX, y: startY } = dragStart;
      const width = clientX - startX;
      const height = clientY - startY;
      setCropRect((prevCropRect) => ({
        ...prevCropRect,
        width: Math.abs(width),
        height: Math.abs(height),
      }));
    }
  };

  const handleMouseUp = () => {
    if (cropRect) {
      setCroppedImage(cropImage(image, cropRect));
    }
    setDragStart(null);
    setCropRect(null);
  };

  const cropImage = (image, cropRect) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;
    const { x, y, width, height } = cropRect;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
    return canvas.toDataURL();
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={image}
            alt="Uploaded"
            style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
          {cropRect && (
            <div
              style={{
                position: 'absolute',
                border: '2px dashed black',
                top: cropRect.y,
                left: cropRect.x,
                width: cropRect.width,
                height: cropRect.height,
              }}
            />
          )}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              cursor: 'nwse-resize',
              top: 0,
              left: 0,
            }}
            onMouseDown={(e) => handleMouseDown(e, 'top-left')}
          />
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              cursor: 'nesw-resize',
              top: 0,
              right: 0,
            }}
            onMouseDown={(e) => handleMouseDown(e, 'top-right')}
          />
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              cursor: 'nwse-resize',
              bottom: 0,
              left: 0,
            }}
            onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}
          />
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              cursor: 'nesw-resize',
              bottom: 0,
              right: 0,
            }}
            onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}
          />
        </div>
      )}
      {croppedImage && <img src={croppedImage} alt="Cropped" />}
    </div>
  );
};

export default ImageCropper;
