import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="home-heading">Find The job That Fits Your Life</h1>
      <p className="para">
        Millions of people are searching for jobs, salary information , company
        reviews.Find the job that fits you well.
      </p>
      <button type="button" className="find-btn">
        Find jobs
      </button>
    </div>
  </>
)

export default Home
