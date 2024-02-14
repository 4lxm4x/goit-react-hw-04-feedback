import React, { useState } from 'react';
import Statistics from 'components/Statistics/Statistics';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [noStatistics, setStatistics] = useState(true);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = total => {
    const positiveFeedbackPercentg = Math.round((good / total) * 100, 0);
    return positiveFeedbackPercentg;
  };

  const onHandleFeedback = e => {
    setStatistics(false);
    e.preventDefault();
    const optionButton = e.target.name;

    switch (optionButton) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
    }
  };

  const total = countTotalFeedback();
  const positiveFeedback = countPositiveFeedbackPercentage(total);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        flexDirection: 'column',
        margin: '60px',
        border: '2px solid black',
        boxSizing: 'border-box',
        paddingBottom: '20px',
      }}
    >
      <Section title="Please Leave Feedback">
        <br />
        <FeedbackOptions
          options={['Good', 'Neutral', 'Bad']}
          onLeaveFeedback={onHandleFeedback}
        />
      </Section>

      {noStatistics ? (
        <Section title="Statistics">
          <Notification message="There is no feedback" />
        </Section>
      ) : (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positiveFeedback}
          />
        </Section>
      )}
    </div>
  );
}
