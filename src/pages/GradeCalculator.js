import React, { useState } from 'react';
import { Box, Input, Button, Text, VStack } from '@chakra-ui/react';

const GradeCalculator = () => {
  const [currentGrades, setCurrentGrades] = useState([{ score: '', weight: '' }]);
  const [finalWeight, setFinalWeight] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [requiredFinalGrade, setRequiredFinalGrade] = useState(null);

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
    <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="md">
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">Grade Calculator</Text>

        {currentGrades.map((grade, index) => (
          <Box key={index} p={2} borderWidth={1} borderRadius="lg" backgroundColor="#1a1a1a">
            <Text>Grade {index + 1}</Text>
            <Input
              placeholder="Score (%)"
              value={grade.score}
              onChange={(e) => handleGradeChange(index, 'score', e.target.value)}
              type="number"
              mb={2}
            />
            <Input
              placeholder="Weight (%)"
              value={grade.weight}
              onChange={(e) => handleGradeChange(index, 'weight', e.target.value)}
              type="number"
            />
          </Box>
        ))}

        <Button onClick={addGrade} colorScheme="teal">Add Another Grade</Button>

        <Input
          placeholder="Final Exam Weight (%)"
          value={finalWeight}
          onChange={(e) => setFinalWeight(e.target.value)}
          type="number"
        />

        <Input
          placeholder="Desired Final Grade (0-100)"
          value={desiredGrade}
          onChange={(e) => setDesiredGrade(e.target.value)}
          type="number"
        />

        <Button onClick={calculateRequiredFinalGrade} colorScheme="blue">Calculate Required Final Grade</Button>

        {requiredFinalGrade !== null && (
          <Text fontSize="lg" mt={4}>
            You need to score <strong>{requiredFinalGrade.toFixed(2)}%</strong> on the final exam to achieve a grade of <strong>{desiredGrade}</strong> %.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default GradeCalculator;