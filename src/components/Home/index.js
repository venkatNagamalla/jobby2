import {Link} from 'react-router-dom'
import Headers from '../Headers'
import './index.css'

const Home = () => (
  <>
    <Headers />
    <div className="home-container">
      <h1 className="home-heading">Find The Job That Fits Your Life</h1>
      <p className="home-desc">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="find-jobs-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
