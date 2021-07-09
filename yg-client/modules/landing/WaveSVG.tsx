// https://stackoverflow.com/questions/19484707/how-can-i-make-an-svg-scale-with-its-parent-container
function WaveSVG({ width, height, svgWidth, svgHeight, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      fill="none"
      // preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <path
        fill="#F31E1E"
        fillOpacity="0.2"
        fillRule="evenodd"
        d="M1 122.481l60-13.12C121 96.241 241 70 361 70s240 26.24 360 106.837c120 80.596 240 215.548 360 256.783 120 41.236 240-13.12 300-41.235l60-26.241V771H1V122.481z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#FF4848"
        fillOpacity="0.44"
        fillRule="evenodd"
        d="M-7 354.572l39.82-26.381c41.027-26.381 120.667-79.143 201.513-52.762 80.847 26.381 160.487 131.904 241.334 79.143C556.513 301.81 636.153 90.762 717 24.81 797.847-41.142 877.487 38 958.333 103.953c80.847 65.952 160.487 118.714 241.337 105.524 80.84-13.191 160.48-92.334 201.51-131.905L1441 38v554H-7V354.572z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default WaveSVG;
