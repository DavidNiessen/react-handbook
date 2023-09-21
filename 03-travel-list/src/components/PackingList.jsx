import { useState } from 'react';
import Item from './Item';

const PackingList = ({ items, onDeleteItem, onToggleItem, onClearItems }) => {
	const [sortBy, setSortBy] = useState('input');

	let sortedItems;

	switch (sortBy) {
		case 'description': {
			sortedItems = items
				.slice()
				.sort((a, b) => a.description.localeCompare(b.description));
			break;
		}
		case 'packed': {
			sortedItems = items.slice().sort((a, b) => a.packed - b.packed);
			break;
		}
		default:
			sortedItems = items;
	}

	return (
		<div className="list">
			<ul className="list">
				{sortedItems.map(item => (
					<Item
						key={item.id}
						item={item}
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
					></Item>
				))}
			</ul>

			<div className="actions">
				<select
					value={sortBy}
					onChange={event => setSortBy(event.target.value)}
				>
					<option value="input">Sort by input order</option>
					<option value="description">Sort by description</option>
					<option value="packed">Sort by packed status</option>
				</select>

				<button onClick={onClearItems}>Clear list</button>
			</div>
		</div>
	);
};

export { PackingList };
