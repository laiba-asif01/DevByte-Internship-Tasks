import React from 'react';
import PropTypes from 'prop-types';

export default function MetricsGrid({ instances }) {
    const totalCount = instances.length;
    const activeCount = instances.filter(i => i.status === 'online').length;
    const averageLoad = totalCount > 0
        ? Math.round(instances.reduce((acc, curr) => acc + curr.load, 0) / totalCount)
        : 0;

    return (
        <section className="metrics-grid">
            <div className="metric-card">
                <span className="metric-val">{totalCount}</span>
                <span className="metric-lbl">Total Registered Nodes</span>
            </div>
            <div className="metric-card">
                <span className="metric-val text-green">{activeCount}</span>
                <span className="metric-lbl">Active Telemetry Pipes</span>
            </div>
            <div className="metric-card">
                <span className="metric-val text-indigo">{averageLoad}%</span>
                <span className="metric-lbl">Average Thread Load</span>
            </div>
        </section>
    );
}

MetricsGrid.propTypes = {
    instances: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            status: PropTypes.oneOf(['online', 'offline']).isRequired,
            load: PropTypes.number.isRequired,
            category: PropTypes.string.isRequired,
        })
    ).isRequired,
};