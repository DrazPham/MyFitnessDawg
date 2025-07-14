  const getActivityFactor = (level) => {
    switch (level) {
      case 'notVeryActive': return 1.2;
      case 'lightlyActive': return 1.375;
      case 'active': return 1.55;
      case 'veryActive': return 1.725;
      default: return 1.2;
    }
  };

  export default getActivityFactor;