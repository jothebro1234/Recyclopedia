import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Start from './Start';
import './contact.css';
import Calculator from './Calculator';
import Map1 from '../components/map1';
import HowTo from './howto';

const Contact = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    step1: '',
    step2: '',
    step3: '',
    step4:'',
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [demographics, setDemographics] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleTotalAmount = (amount) => {
    setTotalAmount(amount);
  };

  const handleDemographics = (values) => {
    setDemographics(values);
  };

  const steps = [
    <div className="step1">
      <h1>How to start recycling!:</h1>
      <HowTo />
    </div>,
    <div>
      <h1>Upload some images</h1>
      <h2> and find out if they are recyclable</h2>
      <Start />
      
    </div>,
    <div className='step2'>
      <h1>Enter amounts</h1>
      <h2>Enter how much material have and we'll return an approximate valuation</h2>
      <Calculator 
        onCalculateTotal={handleTotalAmount} 
        onCalculateDemographics={handleDemographics} 
      />
      <h3 style={{ textAlign: 'center' }}>Total Amount: ${totalAmount.toFixed(2)}</h3>
    </div>,
    <div className='step3'>
      <h1>Impact</h1>
      <h2>By recycling you...</h2>
      {/* <h3>Impact:</h3> */}
      <div className='demographics-container'>
        {Object.entries(demographics).map(([item, value]) => (
          <div className='demographic-item' key={item}>
            {item}: {value}
          </div>
        ))}
      </div>
    </div>,
    <div className='step4' style={{ marginBottom: '0', marginTop: '10vh' }}>
      <h1>Recycling Centers</h1>
      <h2>Let's find the closest recycling centers</h2>
      <Map1 /> 
    </div>,
  ];

  return (
    <div className="cap">
      <Navbar />
      {steps[currentStep]}
      <div className='navigation-buttons'>
        <button style={{float: 'left'}} onClick={prevStep} disabled={currentStep === 0}>
          Previous
        </button>
        <button style={{float: 'right'}} onClick={nextStep} disabled={currentStep === steps.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Contact;


