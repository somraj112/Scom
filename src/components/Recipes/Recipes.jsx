import { useEffect, useState } from "react";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  const API_KEY =
    import.meta.env.VITE_SPOONACULAR_API_KEY ||
    "3b52ff80550f419aa46ca62d16d4ef43";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/random?number=100&apiKey=${API_KEY}`
        );
        const data = await res.json();
        setRecipes(data.recipes || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recipes", err);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [API_KEY]);

  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl text-orange-500 font-medium">
        Loading delicious recipes for you...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-green-700 text-center mb-10">
        Explore Recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-52 object-cover rounded-t-2xl"
            />

            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-bold text-green-800 mb-2 line-clamp-2">
                {recipe.title}
              </h2>

              <div className="text-sm text-gray-600 mb-4">
                ⏱️ Ready in {recipe.readyInMinutes} minutes
              </div>

              <a
                href={`https://spoonacular.com/recipes/${recipe.title
                  .toLowerCase()
                  .replace(/ /g, "-")}-${recipe.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors text-center"
              >
                View Recipe →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center items-center space-x-2">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
          disabled={currentPage === 1}
        >
          ← Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 rounded-full border ${
              currentPage === index + 1
                ? "bg-orange-500 text-white"
                : "bg-white text-green-700 border-green-500 hover:bg-green-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Recipes;
