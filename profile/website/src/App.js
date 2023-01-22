import { Navbar, Footer, Welcome, Services, Transactions } from "./components";
const App = () => {
  return (
    <div>
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
  </div>
  )
}

export default App;