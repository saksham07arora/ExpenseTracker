import React, { useState } from 'react';
import axios from 'axios';
import { ChatIcon } from '@heroicons/react/outline'; // Tailwind hero icons for chat icon

const KnowledgeBaseQuery = () => {
  const [conversationStarted, setConversationStarted] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [chatbotVisible, setChatbotVisible] = useState(false); // To toggle chatbot visibility

  const questions = [
    "What are the main features of your app?",
    "How can I add my income?",
    "Can I view my income separately from expenses?",
    "How do I categorize my income sources?",
    "How can I view my total income for the month?",
    "Can I track my income and expenses together?",
    "What can I see in the Dashboard?",
    "How can I track my income and expenses by day, week, or month?",
    "How do the pie chart and line chart help in visualizing my spending?",
    "How can I check my total balance?",
    "Can I delete an income entry and expense?",
    "Can I compare my income vs. expenses over a specific time period?",
    "Can I receive insights on my income and expenses?",
    "How do I track my savings?"
  ];

  const fetchAnswer = async (question) => {
    const subscriptionKey = 'a3b4bb61cbe54b26bda60d6b065df9d8'; // Replace with your key
    const projectName = 'faq';
    const apiVersion = '2021-10-01';
    const deploymentName = 'test';

    const apiUrl = `https://trackinstance.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=${projectName}&api-version=${apiVersion}&deploymentName=${deploymentName}`;

    const requestBody = {
      top: 1,
      question: question,
      includeUnstructuredSources: true,
      confidenceScoreThreshold: 0.5,
      answerSpanRequest: {
        enable: true,
        topAnswersWithSpan: 1,
        confidenceScoreThreshold: 0.5,
      },
    };

    try {
      setLoading(true);
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.answers && response.data.answers.length > 0) {
        const answer = response.data.answers[0].answer;
        setConversationHistory([...conversationHistory, { question, answer }]);
        setError('');
      } else {
        setConversationHistory([...conversationHistory, { question, answer: 'No answers found.' }]);
      }

      setLoading(false);
    } catch (error) {
      setError('Failed to fetch the answer.');
      setLoading(false);
    }
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    fetchAnswer(question);
  };

  const handleContinue = () => {
    setSelectedQuestion('');
    setConversationEnded(false);
  };

  const handleStop = () => {
    setConversationEnded(true);
  };

  return (
    <div className="relative">
      {/* Chatbot Icon (bottom-right) */}
      {!chatbotVisible && (
        <div
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition-transform transform hover:scale-110"
          onClick={() => setChatbotVisible(true)}
        >
          <ChatIcon className="h-6 w-6" />
        </div>
      )}

      {/* Chatbot UI */}
      {chatbotVisible && (
        <div className="fixed bottom-16 right-5 bg-white rounded-lg shadow-lg w-full max-w-md h-[70vh] overflow-hidden border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center bg-gray-100 p-3 rounded-t-lg border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Knowledge Base Chatbot</h2>
            <button
              onClick={() => setChatbotVisible(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              &#10005; {/* Close icon */}
            </button>
          </div>

          {/* Outer Scrollable Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Display conversation history */}
            <div className="space-y-4">
              {conversationHistory.map((entry, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <div className="self-start bg-gray-200 p-3 rounded-lg text-sm">
                    <strong>Q:</strong> {entry.question}
                  </div>
                  <div className="self-end bg-blue-500 text-white p-3 rounded-lg text-sm">
                    <strong>A:</strong> {entry.answer}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Display error messages */}
            {error && (
              <div className="text-red-500 text-center">
                <p>{error}</p>
              </div>
            )}

            {/* Display buttons and questions */}
            {!conversationStarted ? (
              <div className="p-3">
                <button
                  onClick={() => setConversationStarted(true)}
                  className="bg-blue-500 text-white w-full px-4 py-2 rounded-full hover:bg-blue-600 transition"
                >
                  Start the Conversation
                </button>
              </div>
            ) : (
              <>
                {!selectedQuestion && !conversationEnded && (
                  <div className="p-3 bg-gray-100 rounded-b-lg border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Questions</h3>
                    <ul className="space-y-2 max-h-40 overflow-y-auto">
                      {questions.map((q, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleQuestionClick(q)}
                            className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg p-2 text-left"
                          >
                            {q}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedQuestion && !conversationEnded && (
                  <div className="p-3 flex justify-between items-center bg-gray-100 rounded-b-lg border-t border-gray-200">
                    <button
                      onClick={handleContinue}
                      className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                    >
                      Continue Exploring
                    </button>
                    <button
                      onClick={handleStop}
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                    >
                      Stop Conversation
                    </button>
                  </div>
                )}

                {conversationEnded && (
                  <div className="p-3 text-center bg-gray-100 rounded-b-lg border-t border-gray-200">
                    <p className="text-gray-700">Thank you for using our knowledge base!</p>
                    <button
                      onClick={handleContinue}
                      className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-full hover:bg-blue-600 transition"
                    >
                      Continue Again
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBaseQuery;
