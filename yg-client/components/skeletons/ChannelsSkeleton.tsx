import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'
import "react-placeholder/lib/reactPlaceholder.css";

const customPlaceholder = (
	<div className="grid grid-cols-3 gap-3">
		{
			Array.from({length: 27}).map((_, index) => (
				<RectShape key={index} color='#E0E0E0' className="bg-white shadow-sm w-full h-32 items-center rounded-md" 
					style={{
						height: '150px'
					}}	
				/>
			))
		}
	</div>
)

const ChannelsSkelteton = ({children, ready}) => (
	<ReactPlaceholder customPlaceholder={customPlaceholder} showLoadingAnimation={true} ready={ready}>
		{children}
	</ReactPlaceholder>
)

export default ChannelsSkelteton