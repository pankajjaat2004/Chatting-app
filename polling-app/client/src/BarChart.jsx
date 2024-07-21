// ./src/BarChart.jsx

import * as React from 'react';
import {
	BarChart
} from '@mui/x-charts/BarChart';

export default function Bar({ socket }) {
	const [DT, setData] = React.useState([]);

	React.useEffect(() => {
		socket.on('update', (frameworks) => {

			const newData = []
			for (const key in frameworks) {
				if (frameworks.hasOwnProperty(key)) {
					const { votes, label } = frameworks[key];
					newData.push(votes)

				}
			}
			setData(newData)
		})

	}, [])

	const updateVote = (id) => {
		socket.emit('vote', id)
	}

	return (
		<>
			{/* <h4>Most Popular Backend Frameworks 2024</h4> */}
			<div className='bar'>
				<BarChart
					width={800}
					height={350}
					series={[
						{
							data: DT.length > 0 ?
								DT : [0, 0, 0, 0, 0],
							id: 'uvId', label: 'Votes'
						},
					]}
					xAxis={[{
						data: ["Akshay Kumar", "Salman Khan",
							"Amir Khan", "Heritik Roshan", "Ranveer Singh"],
						scaleType: 'band'
					}]}
				/>
			</div>
			<h1 style={{color:'green'}}>Which actor is more famous?</h1>
			<div className='btn'>
				<button className='myButton'
					onClick={() => updateVote(0)}>
					Akshay Kumar
				</button>
				<button className='myButton'
					onClick={() => updateVote(1)}>
					Salman Khan
				</button>
				<button className='myButton'
					onClick={() => updateVote(2)}>
					Amir Khan
				</button>
				<button className='myButton'
					onClick={() => updateVote(3)}>
					Heritik Roshan
				</button>
				<button className='myButton'
					onClick={() => updateVote(4)}>
					Ranveer Singh
				</button>
			</div>
		</>
	);
}
