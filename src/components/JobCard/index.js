import {FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    id,
    title,
  } = jobDetails
  return (
    <Link className="link" to={`/jobs/${id}`}>
      <li className="job-card">
        <div className="logo-title-container">
          <img className="logo" src={companyLogoUrl} alt="company logo" />
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <FaStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-emp-package-container">
          <div className="location-emp-container">
            <div className="job-card-icon-container">
              <IoLocationSharp className="job-card-icon" />
              <p className="job-card-icon-desc">{location}</p>
            </div>
            <div className="job-card-icon-container">
              <BsBriefcaseFill className="job-card-icon" />
              <p className="job-card-icon-desc">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="desc-side-heading">Description</h1>
        <p className="job-card-desc">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
