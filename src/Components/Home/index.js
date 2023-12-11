import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickJobs = () => {
    const {history} = props
    return history.push('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find The job That Fits Your Life</h1>
        <p className="para">
          Millions of people are searching for jobs, salary information ,
          company reviews.Find the job that fits you well.
        </p>
        <button type="button" className="find-btn" onClick={onClickJobs}>
          Find jobs
        </button>
      </div>
    </>
  )
}

export default Home
