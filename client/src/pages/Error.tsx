// import notFoundImage from "./assets/CatLady.png"; // Cant seem to find the image after building

function ErrorPage() {
  return (
    <div className="bg-gray-400 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-orange-600 mb-4">Oops!</h1>
        <p className="text-xl text-gray-700 mb-2">An error has occurred!</p>
        <p className="text-lg text-gray-600 mb-8">
          We're sorry for the inconvenience. Please try again later.
        </p>
        {/* <img
          src={notFoundImage}
          alt="404 Not Found"
          className="w-3/4 max-w-lg mx-auto shadow-lg rounded"
        /> */}
      </div>
    </div>
  );
}

export default ErrorPage;
