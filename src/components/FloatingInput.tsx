const FloatingInput = () => {
  return (
    <div className="relative mt-4">
      <input
        type="text"
        id="username"
        className="border-white border focus:border-2 focus:border-sky-400 rounded-md w-full h-16 p-2 pt-6 peer outline-none"
      />
      <label
        htmlFor="username"
        className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 transition-all duration-300 peer-focus:-top-0 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:-translate-y-0"
      >
        Username
      </label>
    </div>
  );
};

export default FloatingInput;
