"use client"; // Error components must be Client components

export default function Error({ error, reset }) {
  return (
    <div className="mt-10 w-full h-screen text-2xl text-center flex flex-col justify-center items-center">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
