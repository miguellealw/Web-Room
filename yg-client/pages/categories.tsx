import AuthedLayout from './authed_layout'


const Categories : React.FC = () => {

	return (
		<AuthedLayout>
			<div className="py-10">
				<h1 className="pb-10 text-5xl font-bold">Your Categories</h1>
			</div>
		</AuthedLayout>
	)

}

export default Categories