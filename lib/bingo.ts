export function generateBingoCard(): number[] {
  const card: number[] = [];
  
  // Define ranges for each column
  const ranges = [
    [1, 15],   // B column
    [16, 30],  // I column
    [31, 45],  // N column
    [46, 60],  // G column
    [61, 75]   // O column
  ];
  
  // Generate 5 numbers for each column
  for (let col = 0; col < 5; col++) {
    const [min, max] = ranges[col];
    const numbers: number[] = [];
    
    // Generate 5 unique random numbers for this column
    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    
    // Add numbers to card (by row)
    for (let row = 0; row < 5; row++) {
      card[row * 5 + col] = numbers[row];
    }
  }
  
  // Set center square as FREE space
  card[12] = 0;
  
  return card;
}