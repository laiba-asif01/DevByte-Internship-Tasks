import React, { useState, useEffect } from 'react';
import MetricsGrid from './components/MetricsGrid';
import InstanceController from './components/InstanceController';
import './App.css';

export default function App() {
    const [instances, setInstances] = useState([
        { id: 'inst-101', name: 'Paint Canvas Live', status: 'online', load: 34, category: 'App' },
        { id: 'inst-102', name: 'Blood Bank DB', status: 'online', load: 12, category: 'Module' },
        { id: 'inst-103', name: 'Smart Hostel API', status: 'offline', load: 0, category: 'Node' },
    ]);

    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const telemetryInterval = setInterval(() => {
            setInstances(prevInstances =>
                prevInstances.map(inst => {
                    if (inst.status === 'online') {
                        const variance = Math.floor(Math.random() * 11) - 5;
                        const newLoad = Math.max(5, Math.min(95, inst.load + variance));
                        return { ...inst, load: newLoad };
                    }
                    return inst;
                })
            );
        }, 3000);

        return () => clearInterval(telemetryInterval);
    }, []);

    const toggleInstanceStatus = (id) => {
        setInstances(prevInstances =>
            prevInstances.map(inst => {
                if (inst.id === id) {
                    const turningOnline = inst.status === 'offline';
                    return {
                        ...inst,
                        status: turningOnline ? 'online' : 'offline',
                        load: turningOnline ? 25 : 0
                    };
                }
                return inst;
            })
        );
    };

    const removeInstance = (id) => {
        setInstances(prevInstances => prevInstances.filter(inst => inst.id !== id));
    };

    const filteredInstances = instances.filter(inst => {
        if (activeTab === 'online') return inst.status === 'online';
        if (activeTab === 'offline') return inst.status === 'offline';
        return true;
    });

    return (
        <div className="telemetry-wrapper">
            <main className="dashboard-container">
                <header className="dashboard-header">
                    <div className="brand-group">
                        <span className="live-pulse"></span>
                        <h1>CoreEngine Suite</h1>
                    </div>
                    <p className="subtitle">Real-Time React Component State & Prop Controller</p>
                </header>

                <MetricsGrid instances={instances} />

                <nav className="filter-nav" aria-label="Instance State Filter">
                    {['all', 'online', 'offline'].map(tab => (
                        <button
                            key={tab}
                            className={`tab-trigger ${activeTab === tab ? 'active-tab' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </nav>

                <section className="instance-workspace">
                    <h2>Active Hardware Pipelines</h2>
                    {filteredInstances.length > 0 ? (
                        <div className="instance-grid">
                            {filteredInstances.map(inst => (
                                <InstanceController
                                    key={inst.id}
                                    id={inst.id}
                                    name={inst.name}
                                    status={inst.status}
                                    load={inst.load}
                                    category={inst.category}
                                    onToggleStatus={toggleInstanceStatus}
                                    onRemove={removeInstance}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            No active hardware pipelines match the selected filter.
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}