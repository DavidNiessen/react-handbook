import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';

const createRandomPost = () => {
	return {
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body: faker.hacker.phrase(),
	};
};

const SearchPosts = ({ searchQuery, setSearchQuery }) => (
	<input
		value={searchQuery}
		onChange={e => setSearchQuery(e.target.value)}
		placeholder="Search posts..."
	/>
);

const Results = ({ posts }) => <p>🚀 {posts.length} atomic posts found</p>;

const Header = ({ posts, onClearPosts, searchQuery, setSearchQuery }) => (
	<header>
		<h1>
			<span>⚛️</span>The Atomic Blog
		</h1>
		<div>
			<Results posts={posts} />
			<SearchPosts searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<button onClick={onClearPosts}>Clear posts</button>
		</div>
	</header>
);

const FormAddPost = ({ onAddPost }) => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		if (!body || !title) return;
		onAddPost({ title, body });
		setTitle('');
		setBody('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={title}
				onChange={e => setTitle(e.target.value)}
				placeholder="Post title"
			/>
			<textarea
				value={body}
				onChange={e => setBody(e.target.value)}
				placeholder="Post body"
			/>
			<button>Add post</button>
		</form>
	);
};

const List = ({ posts }) => (
	<ul>
		{posts.map((post, i) => (
			<li key={i}>
				<h3>{post.title}</h3>
				<p>{post.body}</p>
			</li>
		))}
	</ul>
);

const Posts = ({ posts }) => (
	<section>
		<List posts={posts} />
	</section>
);

const Archive = memo(({ archiveOptions, onAddPost }) => {
	const [posts] = useState(() =>
		Array.from({ length: 10000 }, () => createRandomPost()),
	);
	const [showArchive, setShowArchive] = useState(archiveOptions.show);

	return (
		<aside>
			<h2>{archiveOptions.title}</h2>
			<button onClick={() => setShowArchive(s => !s)}>
				{showArchive ? 'Hide archive posts' : 'Show archive posts'}
			</button>

			{showArchive && (
				<ul>
					{posts.map((post, i) => (
						<li key={i}>
							<p>
								<strong>{post.title}:</strong> {post.body}
							</p>
							<button onClick={onAddPost}>Add as new post</button>
						</li>
					))}
				</ul>
			)}
		</aside>
	);
});

const Main = ({ posts, onAddPost }) => (
	<main>
		<FormAddPost onAddPost={onAddPost} />
		<Posts posts={posts} />
	</main>
);

const Footer = () => <footer>&copy; by The Atomic Blog ✌️</footer>;

const App = () => {
	const [posts, setPosts] = useState(() =>
		Array.from({ length: 30 }, () => createRandomPost()),
	);
	const [searchQuery, setSearchQuery] = useState('');
	const [isFakeDark, setIsFakeDark] = useState(false);

	const handleAddPost = useCallback(post => {
		setPosts(posts => [post, ...posts]);
	}, []);

	const handleClearPosts = () => {
		setPosts([]);
	};

	useEffect(() => {
		document.documentElement.classList.toggle('fake-dark-mode');
	}, [isFakeDark]);

	const searchedPosts =
		searchQuery.length > 0
			? posts.filter(post =>
					`${post.title} ${post.body}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
			  )
			: posts;

	const archiveOptions = useMemo(() => {
		return {
			show: false,
			title: `Post archive in addition to ${posts.length}`,
		};
	}, [posts.length]);

	return (
		<section>
			<button
				onClick={() => setIsFakeDark(fakeDark => !fakeDark)}
				className="btn-fake-dark-mode"
			>
				{isFakeDark ? '☀️' : '🌙'}
			</button>
			<Header
				posts={searchedPosts}
				onClearPosts={handleClearPosts}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			<Main posts={searchedPosts} onAddPost={handleAddPost} />
			<Archive archiveOptions={archiveOptions} onAddPost={handleAddPost} />
			<Footer />
		</section>
	);
};

export { App };
