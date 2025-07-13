import React, { useState, useEffect } from 'react';


const Posts = () => {
  // State to store the fetched posts
  const [posts, setPosts] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to manage error status
  const [error, setError] = useState(null);
  // State for current page number, starting from 1
  const [currentPage, setCurrentPage] = useState(1);
  // Number of posts to display per page
  const postsPerPage = 10;

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Set loading to true before fetching
        setLoading(true);
        const response = await fetch('https://dummyjson.com/posts');
        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // The API returns an object with a 'posts' array
        setPosts(data.posts);
      } catch (err) {
        // Catch and set any errors during fetching
        setError(err.message);
      } finally {
        // Set loading to false after fetching (whether successful or not)
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Get current posts for the displayed page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="text-xl font-semibold text-gray-700">Loading posts...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 p-4">
        <div className="text-xl font-semibold text-red-700">Error: {error}</div>
        <div className="text-gray-600 mt-2">Please try again later.</div>
      </div>
    );
  }

  // Render the posts gallery
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <header className="bg-gradient-to-r from-purple-600 to-pink-700 p-6 shadow-lg rounded-b-xl">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            <span className="block">My Posts Feed</span>
          </h1>
          <p className="mt-2 text-lg text-purple-100">
            Discovering interesting articles and thoughts
          </p>
        </div>
      </header>

      <main className="container mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="p-4 flex-grow flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {post.body}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {post.reactions.likes} Likes
                  </span>
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17.828 14.828a4 4 0 01-5.656 0L10 13.657l-1.172 1.171a4 4 0 11-5.656-5.656L10 2.343l6.828 6.829a4 4 0 010 5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {post.reactions.dislikes} Dislikes
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {posts.length > postsPerPage && (
          <nav className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>
            <ul className="flex space-x-2">
              {[...Array(totalPages).keys()].map((number) => (
                <li key={number + 1}>
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === number + 1
                        ? 'bg-purple-700 text-white'
                        : 'bg-purple-200 text-purple-800 hover:bg-purple-300'
                    } transition-colors duration-200`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </nav>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center mt-8 rounded-t-xl">
        <p>&copy; {new Date().getFullYear()} Posts Feed Demo. All rights reserved.</p>
        <p className="text-sm text-gray-400">Data from dummyjson.com</p>
      </footer>
    </div>
  );
};

export default Posts;
