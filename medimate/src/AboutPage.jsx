// AboutPage.jsx
import React, { useEffect, useState } from 'react';

const AboutPage = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('/about.html')
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error('Error fetching about.html:', error));
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default AboutPage;
