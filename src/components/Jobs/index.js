import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profileConstantsApi = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  searchEmpty: 'NO_JOBS',
}

class Jobs extends Component {
  state = {
    userDetails: '',
    profileApiStatus: profileConstantsApi.initial,
    jobsApiStatus: profileConstantsApi.initial,
    packageLpa: '',
    searchInput: '',
    jobsList: [],
    checkEmploymentType: [],
  }

  componentDidMount() {
    this.gettingProfile()
    this.gettingJobs()
  }

  onChangeEmploymentType = event => {
    const {checkEmploymentType} = this.state
    if (event.target.checked === true) {
      this.setState({
        checkEmploymentType: [...checkEmploymentType, event.target.value],
      })
    } else {
      const value = checkEmploymentType.filter(
        each => each !== event.target.value,
      )
      this.setState({checkEmploymentType: value})
    }
    setTimeout(() => {
      this.gettingJobs()
    }, 0)
  }

  gettingProfile = async () => {
    this.setState({profileApiStatus: profileConstantsApi.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userDetails: updatedData,
        profileApiStatus: profileConstantsApi.success,
      })
    } else {
      this.setState({profileApiStatus: profileConstantsApi.failure})
    }
  }

  onFailureProfile = () => {
    this.gettingProfile()
  }

  failureProfile = () => (
    <div className="failure-profile-bg">
      <button
        onClick={this.onFailureProfile()}
        className="retry-btn"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  profileView = () => {
    const {userDetails} = this.state
    const {name, profileImageUrl, shortBio} = userDetails

    return (
      <div className="profile-con">
        <img src={profileImageUrl} alt="profile" className="profile" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="profile-loader" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileRender = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case profileConstantsApi.inProgress:
        return this.renderLoadingView()
      case profileConstantsApi.failure:
        return this.failureProfile()
      case profileConstantsApi.success:
        return this.profileView()
      default:
        return null
    }
  }

  failureView = () => (
    <div className="failure-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
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

  onFailureJobs = () => {
    this.gettingJobs()
  }

  gettingJobs = async () => {
    this.setState({jobsApiStatus: profileConstantsApi.inProgress})
    const {checkEmploymentType, packageLpa, searchInput} = this.state
    const employmentId = checkEmploymentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentId}&minimum_package=${packageLpa}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const updatedJobsList = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      if (updatedJobsList.length === 0) {
        this.setState({jobsApiStatus: profileConstantsApi.searchEmpty})
        console.log(updatedJobsList)
      } else {
        this.setState({
          jobsList: updatedJobsList,
          jobsApiStatus: profileConstantsApi.success,
        })
      }
    } else {
      this.setState({jobsApiStatus: profileConstantsApi.failure})
    }
  }

  renderLoadingView = () => (
    <div className="profile-loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  noJobsView = () => (
    <div className="failure-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-img"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  jobsView = () => {
    const {jobsList} = this.state
    return jobsList.map(eachItem => (
      <JobItem jobDetails={eachItem} key={eachItem.id} />
    ))
  }

  jobsRender = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case profileConstantsApi.inProgress:
        return this.renderLoadingView()
      case profileConstantsApi.failure:
        return this.failureView()
      case profileConstantsApi.success:
        return this.jobsView()
      case profileConstantsApi.searchEmpty:
        return this.noJobsView()
      default:
        return null
    }
  }

  onSearchChange = event => {
    this.setState({searchInput: event.target.value})
    setTimeout(() => {
      this.gettingJobs()
    }, 0)
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.gettingJobs()
    }
  }

  onClickSearch = () => {
    this.gettingJobs()
  }

  onChangeLpa = event => {
    this.setState({packageLpa: event.target.value})
  }

  render() {
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="jobs-bg-con">
          <div className="search-input-con-mobile">
            <input
              placeholder="Search"
              className="search-input"
              type="search"
              onChange={this.onSearchChange}
              onKeyDown={this.onKeyDown}
            />
            <div className="search-icon-con">
              <BsSearch onClick={this.onClickSearch} className="search-icon" />
            </div>
          </div>
          <div className="profile-bg-con">
            {this.profileRender()}
            <hr />
            <div className="filter-con">
              <p className="filter-head">Type of Employment</p>
              <ul className="ul-con">
                {employmentTypesList.map(each => (
                  <li className="li-item">
                    <input
                      className="input"
                      id={each.employmentTypeId}
                      type="checkbox"
                      value={each.employmentTypeId}
                      onChange={this.onChangeEmploymentType}
                    />
                    <label
                      htmlFor={each.employmentTypeId}
                      className="filter-options"
                      key={each.employmentTypeId}
                    >
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
              <hr />
              <p className="filter-head">Salary Range</p>
              <ul className="ul-con">
                {salaryRangesList.map(each => (
                  <li className="li-item">
                    <input
                      className="input"
                      id={each.salaryRangeId}
                      type="radio"
                      value={each.salaryRangeId}
                      onChange={this.onChangeLpa}
                      name="salary range"
                    />
                    <label
                      htmlFor={each.salaryRangeId}
                      className="filter-options"
                      key={each.salaryRangeId}
                    >
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-con">
            <div className="search-input-con">
              <input
                placeholder="Search"
                className="search-input"
                type="search"
                onChange={this.onSearchChange}
                onKeyDown={this.onKeyDown}
              />
              <div className="search-icon-con">
                <button
                  className="search-btn"
                  type="button"
                  testid="searchButton"
                >
                  <BsSearch
                    onClick={this.onClickSearch}
                    className="search-icon"
                  />
                </button>
              </div>
            </div>
            <ul className="jobs-ul">{this.jobsRender()}</ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
