import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="notfound-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="notfound-img"
      />
      <h1 className="failure-heading">Page Not Found</h1>
      <p className="failure-description">
        we're sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
