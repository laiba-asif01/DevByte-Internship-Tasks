import React from 'react';
import PropTypes from 'prop-types';

export default function InstanceController({
                                               id,
                                               name,
                                               status,
                                               load,
                                               category,
                                               onToggleStatus,
                                               onRemove
                                           }) {
    const isOnline = status === 'online';

    return (
        <article className={`instance-card ${isOnline ? 'border-active' : 'border-inactive'}`}>
            <div className="card-top">
                <span className={`category-tag ${category.toLowerCase()}`}>{category}</span>
                <button
                    className="delete-btn"
                    onClick={() => onRemove(id)}
                    aria-label={`Remove ${name}`}
                >
                    &times;
                </button>
            </div>

            <div className="card-body">
                <h3 className="instance-title">{name}</h3>

                <div className="load-bar-wrapper">
                    <div className="load-info">
                        <span>Core Load:</span>
                        <span className={load > 75 ? 'text-red' : isOnline ? 'text-green' : ''}>
              {isOnline ? `${load}%` : 'STANDBY'}
            </span>
                    </div>
                    <div className="load-track">
                        <div
                            className="load-fill"
                            style={{
                                width: isOnline ? `${load}%` : '0%',
                                backgroundColor: load > 75 ? 'var(--error-accent)' : 'var(--accent-primary)'
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="card-footer">
        <span className="status-label">
          <span className={`status-dot ${isOnline ? 'bg-green' : 'bg-gray'}`}></span>
            {status.toUpperCase()}
        </span>
                <button
                    className={`toggle-action-btn ${isOnline ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => onToggleStatus(id)}
                >
                    {isOnline ? 'Shutdown' : 'Spin Up'}
                </button>
            </div>
        </article>
    );
}

InstanceController.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['online', 'offline']).isRequired,
    load: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    onToggleStatus: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};