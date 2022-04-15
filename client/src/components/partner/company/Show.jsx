import '../../../styles/partner/_showTickets.css';
import ShowTicketsControl from '../../../container/partner/company/ShowControl';

const ShowTickets = () => {
  return (
    <div className="tickets">
      <table className="tickets__table">
        <thead className="tickets__head">
          <tr>
            <th>STT</th>
            <th>Mã công ty</th>
            <th>Tên công ty</th>
            <th>Email</th>
            <th>Sđt</th>
            <th>Địa chỉ</th>
            <th colSpan="2"></th>
          </tr>
        </thead>
        <tbody className="tickets__body">
          <ShowTicketsControl />
        </tbody>
      </table>
    </div>
  )
}

export default ShowTickets;