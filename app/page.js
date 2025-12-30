export default function TestPage({ params }) {
  return (
    <div>
      <h1>Paste ID</h1>
      <p>{params.id}</p>
    </div>
  );
}
