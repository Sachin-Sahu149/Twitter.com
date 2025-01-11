
function PageNotFound() {
    return (
      <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full  text-center py-4">
          <h1 className="text-4xl font-bold ">404</h1>
        </div>
        <div className="p-4 text-center">
          <p className="text-lg text-gray-400 mb-4">Oops! The page you’re looking for doesn’t exist.</p>
          <a
            href="/"
            className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
          >
            Go Back to Home
          </a>
        </div>
      </div>
    );
}

export default PageNotFound;