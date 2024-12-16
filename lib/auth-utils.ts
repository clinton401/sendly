const generateRandomNumbers = (numLength = 6) => {
    const availableNumbers = "0123456789";
    let randomNumbers = "";
  
    for (let i = 0; i < numLength; i++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      randomNumbers += availableNumbers[randomIndex];
    }
    
    return randomNumbers;
  };
  

export const otpGenerator = (is10Mins?: boolean) => {
    const code = generateRandomNumbers();

    const additionNumber = is10Mins ? 600000 : 3_600_000;
    const expiresAt = new Date(Date.now() + additionNumber);

    return { code, expiresAt };
};

export const hasExpired = (expiresAt: Date): boolean => {
  return expiresAt < new Date(); 
};