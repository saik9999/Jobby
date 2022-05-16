import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    lifeAtCompany: {},
    skills: [],
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.gettingJob()
  }

  onFailureJobs = () => {
    this.gettingJob()
  }

  gettingJob = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        rating: data.job_details.rating,
        packagePerAnnum: data.job_details.package_per_annum,
        title: data.job_details.title,
      }

      const updatedLifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      const updatedSkills = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedJobDetails,
        lifeAtCompany: updatedLifeAtCompany,
        skills: updatedSkills,
        similarJobs: updatedSimilarJobs,
      })
    }
  }

  renderLoadingView = () => (
    <div className="profile-loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successRender = () => {
    const {jobDetails, skills, lifeAtCompany, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-item-bg-con">
        <div className="job-item-bg-detail">
          <div className="job-title-con">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="description-con">
            <h1 className="job-item-head-detail">Description</h1>
            <a className="anchor" href={companyWebsiteUrl}>
              Visit
              <span className="spn">
                <FiExternalLink />
              </span>
            </a>
          </div>
          <p className="description-1-detail">{jobDescription}</p>
          <h1 className="job-item-head-detail">Skills</h1>
          <ul className="skills-con">
            {skills.map(each => (
              <li className="skill-li">
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skill-img"
                />
                <p className="skill-name">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-item-head-detail">Life at Company</h1>
          <div className="dec-con">
            <p className="description-1-detail">{description}</p>
            <img src={imageUrl} alt="life at company" />
          </div>
        </div>
        <h1 className="job-item-head-detail">Similar Jobs</h1>
        <ul className="similar-con">
          {similarJobs.map(each => (
            <SimilarJobs similar={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img-detail"
      />
      <h1 className="failure-heading">Oops! Something went wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.onFailureJobs} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.successRender()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="details-bg">
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
