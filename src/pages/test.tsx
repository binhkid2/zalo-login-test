import AuthCheck from "../components/AuthCheck";

export default function Test() {
  return (
    <>
      <AuthCheck>
  <p>This line only authenticated user can see</p>
</AuthCheck>
    </>
  );
}