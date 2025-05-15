function App() {
  return (
    <div className="card w-96 bg-base-100 card-xl shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Mominho a sua loja de bolinhos</h2>
        <p>Em construção</p>
        <div
          className="justify-end card-actions"
          onClick={() => window.open("https://github.com/projmominho/")}
        >
          <button className="btn btn-primary">Ver no github</button>
        </div>
      </div>
    </div>
  );
}

export default App;
