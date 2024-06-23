import { useSelector } from 'react-redux';
import './style.scss';

function Payout() {
  const { payouts } = useSelector((state) => state.websocket);
  const { payload: data } = payouts;

  return data && data.length > 0 ? (
    <div className='payout-wrapper'>
      <div className='payout-title'>Payout</div>
      <div className='payout-container'>
        <div className='payout'>
          <div className='payout-track'>
            {data.map((item, index) => (
              <div key={index} className='payout-item'>
                <span className='player'>{item.player}</span>
                <span>
                  {item.currency} {item.deposit}
                </span>
                <span className='up-arrow' />
                <span className='green'>
                  {item.currency} {item.withdraw}
                </span>
              </div>
            ))}
            {data.map((item, index) => (
              <div key={index + data.length} className='payout-item'>
                <span className='player'>{item.player}</span>
                <span>
                  {item.currency} {item.deposit}
                </span>
                <span className='up-arrow' />
                <span className='green'>
                  {item.currency} {item.withdraw}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Payout;
