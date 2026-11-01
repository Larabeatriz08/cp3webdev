export default function App() {
  return (
    <main className="min-h-screen bg-background p-8 text-foreground">
      <h1 className="text-4xl font-bold">Paleta de cores</h1>
      <p className="mt-2 text-muted">Texto secundário (muted)</p>

      <div className="mt-6 flex gap-4">
        <button className="rounded-lg bg-brand-orange px-5 py-2 font-semibold text-black">
          Botão laranja
        </button>
        <button className="rounded-lg bg-brand-pink px-5 py-2 font-semibold text-black">
          Botão rosa
        </button>
      </div>

      <div className="mt-6 rounded-lg border border-line bg-surface p-4">
        Card com a cor de superfície
      </div>
    </main>
  )
}
