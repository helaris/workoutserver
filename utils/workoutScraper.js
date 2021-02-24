const puppeteer = require('puppeteer');
const saveToJSON = require('./scraperToJSON');


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  let workout = [];

  await page.goto(
    'https://www.muscleandstrength.com/workouts/3-day-whole-body-toning-workout.html'
  );

  await page.waitForSelector('div.content');

  const title = await page.evaluate(() => {
    const elem = document.querySelector('h1.no-header');
    return elem?.textContent;
  })

  const shortDescription = await page.evaluate(() => {
    const elem = document.querySelector('div.field-item.even');
    return elem?.textContent;
  })

  const imageSrc = await page.evaluate(() => {
    const elem = document.querySelector('img.lazyloaded');
    return elem.src ?? null;
  })

  const mainGoal = await page.evaluate(() => {
    const elem = document.querySelector('.data-row:nth-child(1) > label');
    return elem?.textContent;
  })

  const mainGoalDesc = await page.evaluate(() => {
    const elem = document.querySelector('.field-name-field-main-goal .field-item');
    return elem?.textContent;
  })

  const workoutType = await page.evaluate(() => {
    const elem = document.querySelector('.data-row:nth-child(2) > label');
    return elem?.textContent;
  })
  const workoutTypeDesc = await page.evaluate(() => {
    const elem = document.querySelector('.field-name-field-workout-type .field-item');
    return elem?.textContent;
  })
  const trainingLevel = await page.evaluate(() => {
    const elem = document.querySelector('.data-row:nth-child(3) > label');
    return elem?.textContent;
  })
  const trainingLevelDesc = await page.evaluate(() => {
    const elem = document.querySelector('.field-name-field-experience-level .field-item');
    return elem?.textContent;
  })
  const programDuration = await page.evaluate(() => {
    const elem = document.querySelector('.data-row:nth-child(4) > label');
    return elem?.textContent;
  })
  const programDurationDesc = await page.evaluate(() => {
    const elem = document.querySelector('.data-row:nth-child(4)');
    return elem?.textContent.match(/\d.*/).toString().trim();
  })
  const daysPerWeek = await page.evaluate(() => {
    const elem = document.querySelector('.data-row:nth-child(5) > label');
    return elem?.textContent;
  })
  const daysPerWeekDesc = await page.evaluate(() => {
    const elem = document.querySelector('.field-name-field-days-per-week .field-item');
    return elem?.textContent;
  })
  const timePerWorkout = await page.evaluate(() => {
    const elem = document.querySelector('.data-row:nth-child(6) > label');
    return elem?.textContent;
  })
  const timePerWorkoutDesc = await page.evaluate(() => {
    const elem = document.querySelector('.data-row:nth-child(6)');
    return elem?.textContent.match(/\d.*/).toString().trim();
  })

  const equipmentRequired = await page.evaluate(() => {
    const elem = document.querySelector('.data-row:nth-child(7) > label');
    return elem?.textContent;
  })
  const equipmentRequiredDesc = await page.evaluate(() => {
    const elem = document.querySelector('.data-row:nth-child(7) > .field-type-list-text');
    return elem?.textContent;
  })
  const workoutSummary = [
    {
      title: mainGoal,
      description: mainGoalDesc
    },
    {
      title: workoutType,
      description: workoutTypeDesc
    },
    {
      title: trainingLevel,
      description: trainingLevelDesc
    },
    {
      title: programDuration,
      description: programDurationDesc
    },
    {
      title: daysPerWeek,
      description: daysPerWeekDesc
    },
    {
      title: timePerWorkout,
      description: timePerWorkoutDesc
    },
    {
      title: equipmentRequired,
      description: equipmentRequiredDesc
    }
  ]

  workout.push({
    title,
    shortDescription,
    imageSrc,
    workoutSummary
  })

  console.log(workout);

  await browser.close();
  await saveToJSON('workout', workout);
})();