// NonCommunicableDiseases.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import './NonCommunicableDiseases.css'; 

const NonCommunicableDiseases = () => {
    return (
        <section className="ncd-section">
            <div className="container">
                <h2 className="section-title">Non-Communicable Diseases Awareness</h2>
                <div className="ncd-grid">
                    {/* Diabetes Section */}
                    <div className="ncd-card">
                        <img src="https://images.pexels.com/photos/6941879/pexels-photo-6941879.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Diabetes" className="ncd-image" />
                        <div className="ncd-content">
                            <h3 className="ncd-title">Diabetes Awareness</h3>
                            <p className="ncd-description">Learn about diabetes, its risk factors, symptoms, and management.</p>
                            <Link to="/diabetes" className="ncd-link">Read More</Link> {/* Update to Link */}
                        </div>
                    </div>

                    {/* Cholesterol Section */}
                    <div className="ncd-card">
                        <img src="https://images.unsplash.com/photo-1618939304347-e91b1f33d2ab?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cholesterol" className="ncd-image" />
                        <div className="ncd-content">
                            <h3 className="ncd-title">Cholesterol Awareness</h3>
                            <p className="ncd-description">Understand cholesterol levels, types, and how to maintain healthy levels.</p>
                            <Link to="/cholesterol" className="ncd-link">Read More</Link> {/* Update to Link */}
                        </div>
                    </div>

                    {/* Hypertension Section */}
                    <div className="ncd-card">
                        <img src="https://images.pexels.com/photos/8460093/pexels-photo-8460093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Hypertension" className="ncd-image" />
                        <div className="ncd-content">
                            <h3 className="ncd-title">Hypertension Awareness</h3>
                            <p className="ncd-description">Explore hypertension, its causes, risk factors, and lifestyle changes to manage it.</p>
                            <Link to="/hypertension" className="ncd-link">Read More</Link> {/* Update to Link */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NonCommunicableDiseases;
