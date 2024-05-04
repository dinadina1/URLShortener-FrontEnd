// import required packages
import { useState } from 'react'
import { useFormik } from 'formik'
import { RiErrorWarningLine } from 'react-icons/ri'
import userServices from '../../Services/userService'

// formik validation
const validate = values => {
  const errors = {}
  if (!values.longUrl) {
    errors.longUrl = 'Required'
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.longUrl)) {
    errors.longUrl = 'Invalid URL'
  }
  return errors
}

const Shortener = () => {

  // state for long url
  const [longUrl, setLongUrl] = useState('');

  // state for short
  const [shortUrl, setShortUrl] = useState('');

  // formik form
  const formik = useFormik({
    initialValues: {
      longUrl: ''
    },
    validate,
    onSubmit: async (values) => {

      // call api to generate short url
      const response = await userServices.generateShortUrl(values);

      // update state values
      setLongUrl(values.longUrl);
      setShortUrl(response.data.message);

      // clear values
      formik.resetForm();

    }
  })

  return (
    <>
      <div className="container p-5">
        <h1>URL Shortener</h1>
        <form onSubmit={formik.handleSubmit}>

          <label htmlFor='url-input' className='pb-2'>Enter a URL to shorten</label>

          <input className="form-control" type="text" placeholder="Ex. https://www.google.com" aria-label="url-input" id='url-input'
            name='longUrl'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.longUrl}
          />

          {/* display error message if url is invalid or empty */}
          {
            formik.touched.longUrl && formik.errors.longUrl ? (
              <small className='text-danger pb-2' style={{ display: "block" }}>
                <RiErrorWarningLine />
                {formik.errors.longUrl}
              </small>
            ) : null
          }

          <button type="button" className="btn btn-secondary mt-3 " onClick={formik.handleSubmit}>Generate</button>
        </form>

        {
          (shortUrl && longUrl) ? (
            <div className="card ps-0 pe-0 mt-5">
              <div className="card-body p-3 " style={{ textAlign: "left" }}>
                <p className="card-text">Original URL: <a href={longUrl} target='_blank'>{longUrl}</a></p>
                <p className="card-text">Short URL: <a href={shortUrl} target='_blank'>{shortUrl}</a></p>
              </div>
            </div>
          ) : null
        }

      </div>
    </>
  )
}

export default Shortener