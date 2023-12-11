//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const HoldDetailsChat = ({ hold }) => {
  return (
    <div
      key={hold._id}
      className="d-flex justify-content-between"
      style={{ border: '1px solid grey', padding: '10px', margin: '10px' }}
    >
      <div
        className="md-10"
        style={{
          fontFamily: 'Poppins',
          fontSize: '14px',
        }}
      >
        <p className="mb-1" style={{ color: '#c00' }}>
          {hold.productId.name}
        </p>
        <p>
          <strong>Item Id: </strong>
          {hold.productId.itemId}
          <br></br>
          <strong>Category: </strong>
          {hold.productId.category}
          <br></br>
          <strong>StorePlace: </strong>
          {hold.productId.storePlace}
          <br></br>
          <strong>price: </strong>
          {hold.productId.price}
          <br></br>
          <strong>when hold it: </strong>
          {formatDistanceToNow(new Date(hold.createdAt), {
            addSuffix: true,
          })}
        </p>
        <p>
          <a href={hold.productId.realUrl} target="_blank" rel="noreferrer">
            View details
          </a>
        </p>
        {hold.isCancelled && (
          <>
            <i className="fa-solid fa-ban" style={{ color: '#ca0000' }}></i>
            <p
              style={{
                color: '#ca0000',
                fontWeight: 'bold',
              }}
            >
              Cancelled
            </p>
            {hold.messageToUser ? (
              <p style={{ color: '#ca0000' }}>
                <i
                  className="fa-solid fa-message"
                  style={{ marginRight: '5px' }}
                ></i>
                {hold.messageToUser}
              </p>
            ) : (
              ''
            )}
            <i className="fa-solid fa-ban" style={{ color: '#ca0000' }}></i>
          </>
        )}
      </div>
      <div className="d-flex flex-column align-items-center">
        {hold.productId.image && (
          <img
            src={hold.productId.image}
            alt={hold.productId.name}
            style={{ maxWidth: '100px', maxHeight: '100pxpx' }}
          />
        )}
        {hold.isCancelled && (
          <p style={{ color: '#ca0000', fontSize: '12px' }}>
            <i className="fa-solid fa-ban"></i>
            Hold Cancelled
          </p>
        )}
      </div>
    </div>
  );
};

export default HoldDetailsChat;
