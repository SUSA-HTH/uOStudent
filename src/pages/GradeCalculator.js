import React, { useState, useEffect } from 'react';
import { Box, Input, Button, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const GradeCalculator = () => {
  const [currentGrades, setCurrentGrades] = useState([{ score: '', weight: '' }]);
  const [finalWeight, setFinalWeight] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [requiredFinalGrade, setRequiredFinalGrade] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedGrades = localStorage.getItem('currentGrades');
    const storedFinalWeight = localStorage.getItem('finalWeight');
    const storedDesiredGrade = localStorage.getItem('desiredGrade');

    if (storedGrades) setCurrentGrades(JSON.parse(storedGrades));
    if (storedFinalWeight) setFinalWeight(storedFinalWeight);
    if (storedDesiredGrade) setDesiredGrade(storedDesiredGrade);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentGrades', JSON.stringify(currentGrades));
    localStorage.setItem('finalWeight', finalWeight);
    localStorage.setItem('desiredGrade', desiredGrade);
  }, [currentGrades, finalWeight, desiredGrade]);

  const handleGradeChange = (index, field, value) => {
    const newGrades = [...currentGrades];
    newGrades[index][field] = value;
    setCurrentGrades(newGrades);
  };

  const addGrade = () => {
    setCurrentGrades([...currentGrades, { score: '', weight: '' }]);
  };

  const calculateRequiredFinalGrade = () => {
    let currentWeightedGrade = 0;
    let totalWeight = 0;

    currentGrades.forEach(grade => {
      const score = parseFloat(grade.score);
      const weight = parseFloat(grade.weight);
      if (!isNaN(score) && !isNaN(weight)) {
        currentWeightedGrade += (score * weight) / 100;
        totalWeight += weight;
      }
    });

    const remainingWeight = 100 - totalWeight;

    if (remainingWeight !== parseFloat(finalWeight)) {
      alert('The final weight does not match the remaining percentage.');
      return;
    }

    const desiredGradePercentage = parseFloat(desiredGrade);

    if (isNaN(desiredGradePercentage) || desiredGradePercentage < 0 || desiredGradePercentage > 100) {
      alert('Please enter a valid desired grade between 0 and 100.');
      return;
    }

    const requiredGrade = (desiredGradePercentage - currentWeightedGrade) / (remainingWeight / 100);

    setRequiredFinalGrade(requiredGrade);
  };

  return (
    <Box className="box" p={4}>
      <VStack spacing={4} align="stretch">
        <Text className="grade-title">Grade Calculator</Text>

        {currentGrades.map((grade, index) => (
          <Box key={index} className="box" p={2}>
            <Text>Grade {index + 1}</Text>
            <Input
              className="input"
              placeholder="Score (%)"
              value={grade.score}
              onChange={(e) => handleGradeChange(index, 'score', e.target.value)}
              type="number"
              mb={2}
            />
            <Input
              className="input"
              placeholder="Weight (%)"
              value={grade.weight}
              onChange={(e) => handleGradeChange(index, 'weight', e.target.value)}
              type="number"
            />
          </Box>
        ))}

        <Button className="button" onClick={addGrade}>Add Another Grade</Button>

        <Input
          className="input"
          placeholder="Final Exam Weight (%)"
          value={finalWeight}
          onChange={(e) => setFinalWeight(e.target.value)}
          type="number"
        />

        <Input
          className="input"
          placeholder="Desired Final Grade (0-100)"
          value={desiredGrade}
          onChange={(e) => setDesiredGrade(e.target.value)}
          type="number"
        />

        <Button className="button" onClick={calculateRequiredFinalGrade}>Calculate Required Final Grade</Button>

        {requiredFinalGrade !== null && (
          <Text className="result-text">
            You need to score <strong>{requiredFinalGrade.toFixed(2)}%</strong> on the final exam to achieve a grade of <strong>{desiredGrade}</strong>%.
          </Text>
        )}
      </VStack>

      <div className="bottom-nav">
        <button onClick={() => navigate('/dashboard')}>🏠</button>
        <button onClick={() => navigate('/calendar')}>📅</button>
        <button onClick={() => navigate('/grade-calculator')}>📖</button>
        <button>📝</button>
        <button onClick={() => navigate('/profile')}>👤</button>
      </div>
    </Box>
  );
};

export default GradeCalculator;