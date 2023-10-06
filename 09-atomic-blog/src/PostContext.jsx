import { createContext, useContext, useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';

const createRandomPost = () => {
	return {
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body: faker.hacker.phrase(),
	};
};

const PostContext = createContext();

const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState(() =>
		Array.from({ length: 30 }, () => createRandomPost()),
	);
	const [searchQuery, setSearchQuery] = useState('');

	const searchedPosts =
		searchQuery.length > 0
			? posts.filter(post =>
					`${post.title} ${post.body}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
			  )
			: posts;

	const handleAddPost = post => {
		setPosts(posts => [post, ...posts]);
	};

	const handleClearPosts = () => {
		setPosts([]);
	};

	const value = useMemo(
		() => ({
			posts: searchedPosts,
			onClearPosts: handleClearPosts,
			onAddPost: handleAddPost,
			searchQuery,
			setSearchQuery,
		}),
		[searchQuery, searchedPosts],
	);

	return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

const usePosts = () => useContext(PostContext);

export { PostProvider, usePosts };
