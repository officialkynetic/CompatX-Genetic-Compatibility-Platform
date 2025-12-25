import React from 'react';
import {  Favorite, Warning, Groups } from '@mui/icons-material';

const LearnMore = () => {
  const faqs = [
    {
      question: "What is sickle cell disease?",
      answer: "Sickle cell disease is a genetic blood disorder where red blood cells become crescent-shaped, causing pain, anemia, and other complications. It's inherited when both parents pass on the sickle cell gene."
    },
    {
      question: "Why is genotype compatibility important?",
      answer: "When two carriers (AS) have a child, there's a 25% chance the child will have sickle cell disease (SS). Knowing your genotype helps make informed decisions about relationships and family planning."
    },
    {
      question: "Can people with sickle cell trait (AS) get married?",
      answer: "Yes, but if both partners are AS, they should seek genetic counseling. Options include prenatal testing, IVF with embryo screening, or adoption."
    },
    {
      question: "What does blood group compatibility mean?",
      answer: "While not directly related to sickle cell, blood group compatibility (especially Rh factor) is important for pregnancy to prevent hemolytic disease in newborns."
    }
  ];

  const genotypes = [
    { type: 'AA', meaning: 'Normal', risk: 'No sickle cell' },
    { type: 'AS', meaning: 'Carrier (Trait)', risk: 'Can pass to children' },
    { type: 'SS', meaning: 'Sickle Cell Disease', risk: 'Has the disease' },
    { type: 'AC', meaning: 'Hemoglobin C Trait', risk: 'Can combine with S' },
    { type: 'SC', meaning: 'Sickle-C Disease', risk: 'Milder form of sickle cell' }
  ];

  return (
    <div>
      <h1 className="page-title">Learn About Genetic Compatibility</h1>
      
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* <School style={{ fontSize: '2.5rem', color: '#1976d2' }} /> */}
          <h2>Why This Matters</h2>
        </div>
        <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
          Genetic compatibility awareness can prevent the birth of children with sickle cell disease, 
          reducing suffering and healthcare costs. In Nigeria alone, over 150,000 children are born with 
          sickle cell disease annually, most of which could be prevented through awareness and testing.
        </p>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Groups /> Genotype Meanings
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {genotypes.map((item) => (
            <div key={item.type} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '1rem',
              background: item.type === 'AA' ? '#e8f5e9' : '#fff3e0'
            }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{item.type}</div>
              <div>{item.meaning}</div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>{item.risk}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Favorite /> Compatibility Guidelines
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <h4 style={{ color: '#2e7d32' }}> Safe Matches</h4>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>AA + AA (Perfect match)</li>
              <li>AA + AS (Children may be carriers)</li>
              <li>AA + SS (All children will be carriers)</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: '#d32f2f' }}>Risky Matches</h4>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>AS + AS (25% risk of SS child)</li>
              <li>AS + SS (50% risk of SS child)</li>
              <li>AC + AC (Risk of CC disease)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Warning /> Frequently Asked Questions
        </h3>
        <div style={{ marginTop: '1rem' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#1976d2' }}>Q: {faq.question}</h4>
              <p style={{ lineHeight: '1.6' }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ background: '#e3f2fd' }}>
        <h3>Important Disclaimer</h3>
        <p style={{ lineHeight: '1.6' }}>
          This application provides educational information about genetic compatibility 
          and is not a substitute for professional medical advice, diagnosis, or treatment. 
          Always seek the advice of your physician or qualified health provider with any 
          questions you may have regarding medical conditions.
        </p>
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
           Get tested! Know your genotype before making lifelong decisions.
        </p>
      </div>
    </div>
  );
};

export default LearnMore;