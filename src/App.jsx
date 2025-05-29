import ThresholdsTable from "./ThresholdsTable"

function App() {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-10 px-2">
      <h1>Cambridge International (CIE) AS & A-Level Grade Boundaries Dataset (2021 – 2025)</h1>
      <div className='text-[grey] mb-6'>
        <p>Website developed by <a href="https://github.com/Sadness7311">Sadness7311</a>, Dataset provided by <a href="https://github.com/ChessMastermind/">ChessMastermind</a>.</p>
      </div>
      <ThresholdsTable />
    </div>
  )
}

export default App