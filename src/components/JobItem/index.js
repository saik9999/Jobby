import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-item-bg">
      <Link to={`jobs/${id}`} className="nav-link">
        <div className="job-title-con">
          <img src={companyLogoUrl} alt="company logo" className="jobs-img" />
          <div>
            <h1 className="job-item-head">{title}</h1>
            <div className="rating-con">
              <AiFillStar className="star" />
              <p className="job-item-head">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-con">
          <div className="loc-con">
            <MdLocationOn size="25" color="#ffffff" />
            <span className="location">{location}</span>
          </div>
          <div className="loc-con">
            <BsFillBriefcaseFill size="25" color="#ffffff" />
            <span className="location">{employmentType}</span>
          </div>
          <p className="lpa">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description">Description</h1>
        <p className="description-1">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
