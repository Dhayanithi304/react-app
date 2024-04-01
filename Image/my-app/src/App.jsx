import A from './A'
import './App.css'
import AvatarCropper from './AvatarCropper'
import ImageCropper from './ImageCropper'
import ImageEditor from './ImageEditor'
import ImageUploader from './ImageUploader'

function App() {

  return (
    <>
    {/* <A/> */}
    <ImageUploader/>
    {/* <ImageCropper/> */}
    {/* <ImageEditor/> */}
    {/* <AvatarCropper/> */}
      </>
  )
}

export default App

// import React, { useState } from 'react';
// import './App.css'; // Import CSS for styling

// function App() {
//   const [state, setState] = useState({
//     width: 100,
//     height: 100,
//     top: 100,
//     left: 100,
//     rotateAngle: 0,
//     resizing: false,
//     rotating: false,
//     dragging: false,
//     startX: 0,
//     startY: 0,
//   });

//   const handleMouseDown = (e, action) => {
//     e.preventDefault();
//     const startX = e.clientX;
//     const startY = e.clientY;
//     setState({
//       ...state,
//       [action]: true,
//       startX,
//       startY,
//     });
//   };

//   const handleMouseUp = (e, action) => {
//     e.preventDefault();
//     setState({
//       ...state,
//       [action]: false,
//     });
//   };

//   const handleMouseMove = (e) => {
//     e.preventDefault();
//     const { startX, startY, width, height, left, top, rotateAngle, resizing, rotating, dragging } = state;

//     if (resizing) {
//       const deltaX = e.clientX - startX;
//       const deltaY = e.clientY - startY;
//       setState({
//         ...state,
//         width: Math.max(10, width + deltaX),
//         height: Math.max(10, height + deltaY),
//         startX: e.clientX,
//         startY: e.clientY,
//       });
//     } else if (rotating) {
//       const centerX = left + width / 2;
//       const centerY = top + height / 2;
//       const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
//       setState({
//         ...state,
//         rotateAngle: angle,
//       });
//     } else if (dragging) {
//       const deltaX = e.clientX - startX;
//       const deltaY = e.clientY - startY;
//       setState({
//         ...state,
//         left: left + deltaX,
//         top: top + deltaY,
//         startX: e.clientX,
//         startY: e.clientY,
//       });
//     }
//   };

//   return (
//     <div className="App" onMouseMove={handleMouseMove} onMouseUp={() => setState({ ...state, resizing: false, rotating: false, dragging: false })}>
//       <div
//         className="resizable"
//         style={{
//           width: `${state.width}px`,
//           height: `${state.height}px`,
//           top: `${state.top}px`,
//           left: `${state.left}px`,
//           transform: `rotate(${state.rotateAngle}rad)`,
//         }}
//       >
//         <div
//           className="handle top-left"
//           onMouseDown={(e) => handleMouseDown(e, 'resizing')}
//           onMouseUp={(e) => handleMouseUp(e, 'resizing')}
//         />
//         <div
//           className="handle top-right"
//           onMouseDown={(e) => handleMouseDown(e, 'resizing')}
//           onMouseUp={(e) => handleMouseUp(e, 'resizing')}
//         />
//         <div
//           className="handle bottom-left"
//           onMouseDown={(e) => handleMouseDown(e, 'resizing')}
//           onMouseUp={(e) => handleMouseUp(e, 'resizing')}
//         />
//         <div
//           className="handle bottom-right"
//           onMouseDown={(e) => handleMouseDown(e, 'resizing')}
//           onMouseUp={(e) => handleMouseUp(e, 'resizing')}
//         />
//         <div
//           className="handle rotate"
//           onMouseDown={(e) => handleMouseDown(e, 'rotating')}
//           onMouseUp={(e) => handleMouseUp(e, 'rotating')}
//         />
//         <div
//           className="handle drag"
//           onMouseDown={(e) => handleMouseDown(e, 'dragging')}
//           onMouseUp={(e) => handleMouseUp(e, 'dragging')}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import { Resizable, ResizableBox } from "react-resizable";

// const App = () => {
//   const [width, setWidth] = useState(100);
//   const [height, setHeight] = useState(100);
//   const [top, setTop] = useState(100);
//   const [left, setLeft] = useState(100);
//   const [rotateAngle, setRotateAngle] = useState(0);

//   const handleResize = (style) => {
//     const { top, left, width, height } = style;
//     setTop(Math.round(top));
//     setLeft(Math.round(left));
//     setWidth(Math.round(width));
//     setHeight(Math.round(height));
//   };

//   const handleRotate = (rotateAngle) => {
//     setRotateAngle(rotateAngle);
//   };

//   const handleDrag = (deltaX, deltaY) => {
//     setLeft(left + deltaX);
//     setTop(top + deltaY);
//   };

//   return (
//     <div
//       className="App"
//       style={{ backgroundColor: "red", width: "100%", height: "100%" }}
//     >
//       <Resizable
//         left={left}
//         top={top}
//         width={width}
//         height={height}
//         // rotateAngle={rotateAngle}
//         // onRotate={handleRotate}
//         onResize={handleResize}
//           // onDrag={handleDrag}
//       />
//       <ResizableBox
//     </div>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import { Resizable } from 'react-resizable';

// const App = () => {
//   const [file, setFile] = useState();
//   const [width, setWidth] = useState(100);
//   const [height, setHeight] = useState(100);
//   const [top, setTop] = useState(100);
//   const [left, setLeft] = useState(100);
//   const [rotateAngle, setRotateAngle] = useState(0);

//   const handleImage = (e) => {
//     setFile(URL.createObjectURL(e.target.files[0]));
//   };

//   const handleResize = (event, { size }) => {
//     const { width, height } = size;
//     setWidth(width);
//     setHeight(height);
//   };

//   const handleRotate = (event) => {
//     const newAngle = rotateAngle + 90; // Change the rotation angle as needed
//     setRotateAngle(newAngle);
//   };

//   const handleDrag = (event, { deltaX, deltaY }) => {
//     setLeft(left + deltaX);
//     setTop(top + deltaY);
//   };

//   return (
//     <div className="App">
//       <input type="file" onChange={handleImage}/>
//       <Resizable
//         width={width}
//         height={height}
//         onResize={handleResize}
//         draggableOpts={{ disabled: false }}
//         onDrag={handleDrag}
//       >
//         <img
//         src={file}
//           style={{
//           //   width: `${width}px`,
//           //   height: `${height}px`,
//           //   position: 'absolute',
//           //   top: `${top}px`,
//           //   left: `${left}px`,
//           //   border: '1px solid #ccc',
//           //   resize: 'both',
//           //   overflow: 'auto',
//           //   transform: `rotate(${rotateAngle}deg)`,
//           //   transformOrigin: 'top left',
//           width: "100%",
//           height: "100%"
//           }}
//         />
//       </Resizable>
//       <button onClick={handleRotate}>Rotate</button>
//     </div>
//   );
// };

// export default App;
