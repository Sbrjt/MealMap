function Card({ heading, text }) {
	return (
		<div className='bg-white rounded-2xl shadow-md p-6 hover:scale-105 hover:shadow-lg duration-300'>
			<h3 className='text-xl font-semibold mb-2'>{heading}</h3>
			<p className='text-gray-600'>{text}</p>
		</div>
	)
}

export default Card
