import React, { useState } from 'react';
import { Box, HStack, Input, Button, Text, VStack } from '@chakra-ui/react';

const GradeCalculator = () => {
  const [grades, setGrades] = useState([{ grade: '', weight: '' }]);
  const [finalGrade, setFinalGrade] = useState(null);

  const handleChange = (index, field, value) => {
    const newGrades = [...grades];
    newGrades[index][field] = value;
    setGrades(newGrades);
  };

  const addGrade = () => {
    setGrades([...grades, { grade: '', weight: '' }]);
  };

  const calculateFinalGrade = () => {
    let totalWeight = 0;
    let weightedSum = 0;

    grades.forEach(({ grade, weight }) => {
      const numericGrade = parseFloat(grade);
      const numericWeight = parseFloat(weight);

      if (!isNaN(numericGrade) && !isNaN(numericWeight)) {
        weightedSum += numericGrade * numericWeight;
        totalWeight += numericWeight;
      }
    });

    if (totalWeight > 0) {
      setFinalGrade((weightedSum / totalWeight).toFixed(2));
    } else {
      setFinalGrade(null);
    }
  };

  return (
    <Box padding="4" bg="#000" color="#fff">
      <VStack spacing={4}>
        <h2>Grade Calculator</h2>
        {grades.map((item, index) => (
          <HStack key={index} spacing={4}>
            <Input
              type="number"
              placeholder="Grade"
              value={item.grade}
              onChange={(e) => handleChange(index, 'grade', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Weight"
              value={item.weight}
              onChange={(e) => handleChange(index, 'weight', e.target.value)}
            />
          </HStack>
        ))}
        <Button onClick={addGrade} colorScheme="teal">
          Add Grade
        </Button>
        <Button onClick={calculateFinalGrade} colorScheme="green">
          Calculate Final Grade
        </Button>

        {finalGrade !== null && (
          <Text fontSize="xl" mt={4}>
            Final Grade: {finalGrade}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default GradeCalculator;