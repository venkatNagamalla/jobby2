import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Headers from '../Headers'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class EachJob extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobDetails: {}}

  componentDidMount() {
    this.getEachJobDetails()
  }

  getModifiedData = obj => ({
    companyLogoUrl: obj.company_logo_url,
    companyWebsiteUrl: obj.company_website_url,
    employmentType: obj.employment_type,
    jobDescription: obj.job_description,
    location: obj.location,
    packagePerAnnum: obj.package_per_annum,
    rating: obj.rating,
    id: obj.id,
    title: obj.title,
  })

  getEachJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        jobDetails: this.getModifiedData(data.job_details),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        skills: data.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        similarJobs: data.similar_jobs.map(eachJob =>
          this.getModifiedData(eachJob),
        ),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="each-job-loader-container">
      <Loader type="ThreeDots" height={50} width={50} color="#ffffff" />
    </div>
  )

  renderEachJobFailure = () => (
    <div className="each-job-failure-container">
      <img
        className="jobs-failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={() => this.getEachJobDetails()}
        className="retry-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  //   complete the below function

  renderEachJobSuccess = () => {
    const {jobDetails} = this.state
    console.log(jobDetails)
  }

  //   complete the above function

  renderSwitchStatements = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderEachJobFailure()
      case apiStatusConstants.success:
        return this.renderEachJobSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Headers />
        <div className="each-job-container">
          {this.renderSwitchStatements()}
        </div>
      </>
    )
  }
}

export default EachJob
