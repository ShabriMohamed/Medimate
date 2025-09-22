import React, { useState } from 'react';
import './FaqBot.css';
import botIcon from './assets/icons8-chatbot-94.png'; 

const FaqBot = () => {
  const questionsAndAnswers = [
    {
      question: 'How To use the DiseasePrediction?',
      answer: 'Select symptoms from the dropdown list.Click the "Predict Disease" button to send the selected symptoms to the backend and receive a prediction.The predicted disease or any error message will be displayed on the screen.Use the "Clear" button to reset the form and try again.'
    },
    {
      question: 'How to search for medicine by uploading an image?',
      answer: 'To search for medicine by uploading an image, drag and drop an image of the medicine package into the designated area on the website. Alternatively, you can click on the designated area to open a file selection dialog and choose an image of the medicine package from your device. Once the image is uploaded, the system will process it and provide related information about the medicine.'
    },
    {
      question: 'What is Medimate?',
      answer: 'Medimate is your trusted online destination for comprehensive healthcare information and resources. Their mission is to provide accessible, accurate, and up-to-date healthcare information to individuals worldwide, empowering them to make informed decisions about their health and well-being. Medimate is committed to promoting health literacy, fostering a supportive online community, and advocating for the well-being of its users. They continuously strive to improve and expand their resources to meet the evolving needs of their audience.'
    }
  ];

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const handleClick = (index) => {
    setSelectedQuestionIndex(selectedQuestionIndex === index ? null : index);
  };

  return (
    <div className="faq-bot-container">
      <div className="faq-bot-header">
        <div className="bot-icon">
          <img src={botIcon} alt="Bot Icon" />
        </div>
        <div className="bot-status">
          <span className="bot-name">Support Bot</span>
          <span className="bot-status-online">Online</span>
        </div>
      </div>
      <div className="faq-bot">
        <h2>Please Select Your Question</h2>
        <div className="faq">
          {questionsAndAnswers.map((item, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => handleClick(index)}
              >
                {item.question}
              </div>
              {selectedQuestionIndex === index && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqBot;