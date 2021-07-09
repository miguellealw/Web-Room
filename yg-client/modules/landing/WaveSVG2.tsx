function WaveSVG2({...props}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1440"
      height="592"
      fill="none"
			{...props}
    >
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

export default WaveSVG2;