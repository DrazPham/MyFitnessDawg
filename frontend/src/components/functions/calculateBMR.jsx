const calculateBMR = (gender, weight, height, age) => {
    weight = parseFloat(weight);
    height = parseFloat(height);
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  export default calculateBMR;