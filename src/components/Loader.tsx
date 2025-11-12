export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="text-gray-300 text-lg animate-pulse">{message}</div>
    </div>
  );
}
