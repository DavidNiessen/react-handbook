import { useState } from 'react';

const initialFriends = [
	{
		id: 118836,
		name: 'Clark',
		image: 'https://i.pravatar.cc/48?u=118836',
		balance: -7,
	},
	{
		id: 933372,
		name: 'Sarah',
		image: 'https://i.pravatar.cc/48?u=933372',
		balance: 20,
	},
	{
		id: 499476,
		name: 'Anthony',
		image: 'https://i.pravatar.cc/48?u=499476',
		balance: 0,
	},
];

const Button = ({ onClick, children }) => (
	<button className="button" onClick={onClick}>
		{children}
	</button>
);

const Friend = ({ friend, selectedFriend, onSelection }) => {
	const isSelected = friend.id === selectedFriend?.id;

	return (
		<li className={isSelected ? 'selected' : ''}>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>

			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name} {Math.abs(friend.balance)}€.
				</p>
			)}

			{friend.balance > 0 && (
				<p className="green">
					{friend.name} ows you {Math.abs(friend.balance)}€.
				</p>
			)}

			<Button onClick={() => onSelection(friend)}>
				{isSelected ? 'Close' : 'Select'}
			</Button>

			{friend.balance === 0 && <p>You and {friend.name} are even.</p>}
		</li>
	);
};

const FriendsList = ({ friends, selectedFriend, onSelection }) => (
	<ul>
		{friends.map(friend => (
			<Friend
				key={friend.id}
				friend={friend}
				selectedFriend={selectedFriend}
				onSelection={onSelection}
			/>
		))}
	</ul>
);

const FormAddFriend = ({ onAddFriend }) => {
	const [name, setName] = useState('');
	const [image, setImage] = useState('https://i.pravatar.cc/48');

	const handleSubmit = event => {
		event.preventDefault();

		if (!name || !image) return;

		const id = crypto.randomUUID();
		const newFriend = {
			id,
			name,
			image: `${image}?=${id}`,
			balance: 0,
		};
		onAddFriend(newFriend);

		setName('');
		setImage('https://i.pravatar.cc/48');
	};

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>👫 Friend name</label>
			<input
				type="text"
				value={name}
				onChange={event => setName(event.target.value)}
			/>

			<label>🌄 Image URL</label>
			<input
				type="text"
				value={image}
				onChange={event => setImage(event.target.value)}
			/>

			<Button>Add</Button>
		</form>
	);
};

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
	const [bill, setBill] = useState('');
	const [paidByUser, setPaidByUser] = useState('');
	const paidByFriend = bill ? bill - paidByUser : '';
	const [whoIsPaying, setWhoIsPaying] = useState('user');

	const handleSubmit = event => {
		event.preventDefault();

		if (!bill || !paidByUser) return;

		onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
	};

	const tryUpdateState = (inputValue, setState) =>
		Number.isInteger(inputValue) && setState(inputValue);

	return (
		<form className="form-split-bill" onSubmit={handleSubmit}>
			<h2>Split bill with {selectedFriend.name}</h2>

			<label>💰 Bill value</label>
			<input
				type="text"
				value={bill}
				onChange={event => tryUpdateState(+event.target.value, setBill)}
			/>

			<label>🧾 Your expenses</label>
			<input
				type="text"
				value={paidByUser}
				onChange={event => {
					let value = +event.target.value;
					value = value > bill ? paidByUser : value;

					tryUpdateState(value, setPaidByUser);
				}}
			/>

			<label>👫 {selectedFriend.name}'s expense</label>
			<input type="text" disabled value={paidByFriend} />

			<label>🤑 Who is paying the bill?</label>
			<select
				value={whoIsPaying}
				onChange={event => setWhoIsPaying(event.target.value)}
			>
				<option value="user">You</option>
				<option value="friens">{selectedFriend.name}</option>
			</select>

			<Button>Split bill</Button>
		</form>
	);
};

const App = () => {
	const [friends, setFriends] = useState(initialFriends);
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);

	const handleShowAddFriend = () =>
		setShowAddFriend(showAddFriend => !showAddFriend);
	const handleAddFriend = friend => {
		setFriends(friends => [...friends, friend]);
		setShowAddFriend(false);
	};
	const handleSelection = friend => {
		setSelectedFriend(current => (current?.id === friend.id ? null : friend));
		setShowAddFriend(false);
	};

	const handleSplitBill = value => {
		setFriends(friends =>
			friends.map(friend =>
				friend.id === selectedFriend.id
					? { ...friend, balance: friend.balance + value }
					: friend,
			),
		);

		setSelectedFriend(null);
	};

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					selectedFriend={selectedFriend}
					onSelection={handleSelection}
				/>
				{showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
				<Button onClick={handleShowAddFriend}>
					{showAddFriend ? 'Close' : 'Add friend'}
				</Button>
			</div>

			{selectedFriend && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
				/>
			)}
		</div>
	);
};

export default App;
