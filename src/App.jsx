import Springs from "./spring/Springs.jsx";
import styles from "./App.module.css"
import RandomCircles from "./matter/RandomCircles.jsx";
function App() {

  return (
    <div className={styles.container}>
      {/*<Springs />*/}
        <RandomCircles />
    </div>
  )
}

export default App
