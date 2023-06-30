import { checkForName } from "../src/client/js/nameChecker";

describe('checkForName', () => {
  test('should return true if inputText is not empty', () => {
    const inputText = 'Hello';
    const result = checkForName(inputText);
    expect(result).toBe(true);
  });

  test('should return false if inputText is empty', () => {
    const inputText = '';
    const result = checkForName(inputText);
    expect(result).toBe(false);
  });
});