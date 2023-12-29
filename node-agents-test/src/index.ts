import fs from 'node:fs';
import promptfoo from 'promptfoo';
import { sql } from './db';

export const promptTest = async () => {
  const getPrompts = await sql('SELECT * FROM prompts');
  const getVars = await sql('SELECT * FROM vars');

  if (!getPrompts.rows?.length || !getVars.rows?.length) {
    throw new Error('No prompts or variables found!');
  }

  const preparePrompts = getPrompts.rows.map((res: any) => ({
    role: 'user',
    content: res.prompt,
  }));

  let vars = {};

  getVars.rows.forEach((res: any) => {
    vars[res.key] = res.value;
  });

  const prompts: any = [
    [
      {
        role: 'system',
        content: 'Seja extremamente brincalhão e informal.',
      },
      ...preparePrompts,
    ],
  ];

  const providers = [
    /* 'openai:gpt-4-1106-preview', */ 'openai:gpt-3.5-turbo-1106',
  ];
  const tests: any = [
    {
      vars,
      assert: [
        {
          type: 'javascript',
          value: (output) => {
            const pass = output.includes('programador');
            return {
              pass,
              score: pass ? 1.0 : 0.0,
              reason: pass
                ? 'Output contained substring "programador"'
                : 'Output did not contain substring "programador"',
            };
          },
        },
      ],
    },
  ];

  const results = await promptfoo.evaluate(
    {
      prompts,
      providers,
      tests,
    },
    {
      maxConcurrency: 2,
    },
  );

  const resultsString = JSON.stringify(results, null, 2);
  fs.writeFileSync('./src/result-test/output.json', resultsString);

  return resultsString;
};
