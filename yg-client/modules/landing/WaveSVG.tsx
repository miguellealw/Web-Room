function WaveSVG({width, height, ...props}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width="1439"
      // height="522"
			// viewBox="0 0 30 522"
			viewBox={`0 0 ${width} ${height}`}
      fill="none"
			preserveAspectRatio="xMidYMid meet"
			{...props}
    >
      <path
        fill="#F31E1E"
        fillOpacity="0.2"
        fillRule="evenodd"
        d="M0 52.481l60-13.12C120 26.241 240 0 360 0s240 26.24 360 106.837c120 80.596 240 215.548 360 256.783 120 41.236 240-13.12 300-41.235l60-26.241V701H0V52.481z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default WaveSVG;
