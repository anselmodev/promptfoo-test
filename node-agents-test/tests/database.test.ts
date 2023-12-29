import { expect, test, describe } from 'vitest';
import { sql } from '../src/db';

describe('Database Prompts', async () => {
  test('save prompts on database', async () => {
    const promptValue =
      'Gere um e-mail informal para convocação de colaboradores da empresa {{companyName}} a participarem de um evento sobre {{eventName}}. O e-mail deve conter os seguintes detalhes: Só serão aceitos colaboradores com o mínino de {{experienceAge}} anos de experiência. É obrigatório que venham vestidos de {{clothingName}} para manter o anonimato. O vancedor além de receber um prêmio de {{award}}, deverá fazer uma doação de {{donation}} porcento do total recebido. Escreva uma piada sobre {{joke}} no final da mensagem.';

    const newPrompt = await sql(
      `INSERT INTO prompts(prompt) VALUES ('${promptValue}') RETURNING id`,
    );

    expect(newPrompt.rows).toHaveLength(1);
  });

  test('save variables on database', async () => {
    const eventName = "('eventName', 'programação'),";
    const companyName = "('companyName', 'RD Station'),";
    const joke = "('joke', 'programador'),";
    const clothingName = "('clothingName', 'máscaras'),";
    const experienceAge = "('experienceAge', '3'),";
    const award = "('award', 'R$ 1.500,00'),";
    const donation = "('donation', '15')";

    const newPrompt = await sql(
      'INSERT INTO vars(key, value) VALUES' +
        eventName +
        companyName +
        joke +
        clothingName +
        experienceAge +
        award +
        donation +
        'RETURNING id',
    );

    expect(newPrompt.rows).toHaveLength(7);
  });

  test('get prompts from database', async () => {
    const results = await sql('SELECT * FROM prompts');

    expect(results.rows.length).toBeGreaterThanOrEqual(1);
  });

  test('get variables from database', async () => {
    const results = await sql('SELECT * FROM vars');

    expect(results.rows.length).toBeGreaterThanOrEqual(7);
  });
});
