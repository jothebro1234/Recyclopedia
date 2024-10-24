import React, { useState } from 'react';
import Navbar from './Navbar';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getBase64 } from '../helpers/imageHelper';
import './select.css';

const Select = () => {
  const genAI = new GoogleGenerativeAI('AIzaSyABWevQovzTG8NZCP7KMSe8oJPeMxxo8NA');

  const [images, setImages] = useState([]);
  const [imageInlineData, setImageInlineData] = useState([]);
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  async function aiImageRun() {
    setLoading(true);
    setResponse('');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const responses = await Promise.all(imageInlineData.map(async (data) => {
      const result = await model.generateContent([
        "Reply in this format. Item1 : Recyclable/Non-Recyclable, Item2 : Recyclable/Non-Recyclable, Item3 : Recyclable/Non-Recyclable, Item4 : Recyclable/Non-Recyclable, Item5 : Recyclable/Non-Recyclable",
        data,
      ]);
      return result.response.text();
    }));

    setResponse(responses.join('\n\n'));
    setLoading(false);
  }

  const handleClick = () => {
    aiImageRun();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images];
    const newInlineData = [...imageInlineData];

    files.forEach((file) => {
      if (newImages.length < 5) {
        getBase64(file)
          .then((result) => {
            newImages.push(result);
            setImages(newImages);
          })
          .catch(e => console.log(e));

        fileToGenerativePart(file).then((data) => {
          newInlineData.push(data);
          setImageInlineData(newInlineData);
        });
      }
    });
  };

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  return (
    <div className="start-container">
      <Navbar />

      <div style={{ display: 'block' }}>
          <h1>Choose an image to start</h1>
          <div className="upload">
            <input id="choose" type='file' multiple onChange={handleImageChange} />
            <label className="item" id="upload" htmlFor="choose">Choose file</label> {/* Corrected htmlFor */}
            <button id="search" style={{ marginLeft: '20px' }} onClick={handleClick} disabled={loading}>
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>
      </div>

      <div className="image-gallery">
        {images.map((img, index) => (
          <div key={index} className="image-wrapper">
            <img src={img} alt={`Uploaded ${index + 1}`} className="uploaded-image" />
          </div>
        ))}
      </div>

      {loading && !aiResponse ? (
        <p className="loading-text">Loading ...</p>
      ) : (
        <div className="response-container">
          <p className="ai-response">{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default Select;