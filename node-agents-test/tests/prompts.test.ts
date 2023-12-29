import { expect, test, describe } from 'vitest';
import { promptTest } from '../src';

describe('Prompt Test', async () => {
  test('generates event email for employees', async () => {
    const results: any = await promptTest();

    expect(JSON.parse(results).stats.successes).toBe(1);
  });
});
