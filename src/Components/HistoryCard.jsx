// import required packages
import React from 'react'

const HistoryCard = ({ data, sNo }) => {

    // get data and time
    const timeStamp = new Date(data.createdAt);
    const date = `${timeStamp.getDate()}-${timeStamp.getMonth() + 1}-${timeStamp.getFullYear()}`
    const time = `${timeStamp.getHours()}:${timeStamp.getMinutes()}:${timeStamp.getSeconds()}`

    return (
        <>
            <tr className='text-center'>
                <td>{sNo}</td>
                <td>
                    <a href={data.shortUrl} target='_blank'>{data.shortUrl}</a>
                </td>
                <td>
                    <a href={data.longUrl} target='_blank'>{data.longUrl}</a>
                </td>
                <td>{data.clicked}</td>
                <td>{date}</td>
                <td>{time}</td>
            </tr>
        </>
    )
}

export default HistoryCard