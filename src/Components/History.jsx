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
        console.log(response.data);

        // updata state
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
                </>
              ) : (
                <h5 className='pt-5 text-center'>There is no analytics.</h5>
              )
            }
          </div>
        ) : (
          <h5 className='pt-5 text-center'>Loading...</h5>
        )
      }
    </>
  )
}

export default History