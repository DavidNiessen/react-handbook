const Stats = ({ items }) => {
	const numItems = items.length;

	if (!numItems)
		return (
			<p className="stats">
				<em>Start adding some items to your packing list 🚀</em>
			</p>
		);

	const numPacked = items.filter(item => item.packed).length;
	const percentage = Math.round((numPacked / numItems) * 100);

	return (
		<footer className="stats">
			<em>
				{percentage === 100
					? 'You got everything ready to go! ✈️'
					: `💼 You have ${numItems} items on your list, 
					and you already packed ${numPacked} (${percentage}%)`}
			</em>
		</footer>
	);
};

export default Stats;
