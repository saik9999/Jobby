import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similar} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similar

  return (
    <li className="job-item-bg-similar">
      <div className="job-title-con">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="jobs-img"
        />
        <div>
          <h1 className="job-item-head">{title}</h1>
          <div className="rating-con">
            <AiFillStar className="star" />
            <p className="job-item-head">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description">Description</h1>
      <p className="description-1">{jobDescription}</p>
      <div className="location-con">
        <div className="loc-con">
          <MdLocationOn size="25" color="#ffffff" />
          <p className="location">{location}</p>
        </div>
        <div className="loc-con">
          <BsFillBriefcaseFill size="25" color="#ffffff" />
          <p className="location">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
