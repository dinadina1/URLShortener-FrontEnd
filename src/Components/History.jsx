// import required packages
import React, { useEffect, useState } from 'react'
import userServices from '../../Services/userService'
import HistoryCard from './HistoryCard';

const History = () => {

  // state for analytics data
  const [analytics, setAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFound, setIsDataFound] = useState(true);

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const response = await userServices.getAnalytics();

        // update state
        setAnalytics(response.data);
        setIsLoading(true);

      } catch (err) {
        console.log(err);
        setIsLoading(true)
        setIsDataFound(false);
      }
    }
    getAnalytics();
  }, []);

  return (
    <>
      {
        isLoading ? (
          <div className="container">

            {
              isDataFound ? (
                <>
                  <h1>Analytics</h1>

                  <div className='overflow-auto'>
                    <table className="table table-striped border">
                      <thead>
                        <tr className='text-center'>
                          <th>S.No</th>
                          <th>ShortURL</th>
                          <th>OriginalURL</th>
                          <th>Clicks</th>
                          <th className='w-25'>CreatedOn</th>
                          <th>CreatedAt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          analytics.map((item, index) => (
                            <HistoryCard key={index} data={item} sNo={index + 1} />
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <h5 className='pt-5 text-center'>There is no analytics.</h5>
              )
            }
          </div>
        ) : (
          <div className="container" style={{ height: "90vh" }}>
            <div className="d-flex justify-content-center pt-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default History