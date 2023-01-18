import PropTypes from 'prop-types';

function Controls({ markAllAsRead, markAllAsUnread }) {
  return (
    <div className="controls-container">
      <button
        type="button"
        onClick={ markAllAsRead }
      >
        Marcar todas como lida
      </button>

      <button
        type="button"
        onClick={ markAllAsUnread }
      >
        Marcar todas como não lida
      </button>
    </div>
  );
}

Controls.propTypes = {
  markAllAsRead: PropTypes.func.isRequired,
  markAllAsUnread: PropTypes.func.isRequired,
};

export default Controls;