const puppeteer = require('puppeteer');
const saveToJSON = require('./scraperToJSON');



(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  let workout = [];
  // const url = 'https://www.muscleandstrength.com/workouts/bodyweight';
  // const url = 'https://www.muscleandstrength.com/workouts/3-day-full-body-dumbbell-workout';
  // const url = 'https://www.muscleandstrength.com/workouts/3-day-whole-body-toning-workout.html';
  // await page.goto(url);


  const urls = [
    'https://www.muscleandstrength.com/workouts/3-day-full-body-dumbbell-workout',
    'https://www.muscleandstrength.com/workouts/3-day-whole-body-toning-workout.html',
    'https://www.muscleandstrength.com/workouts/3-day-full-body-kettlebell-workout',
    'https://www.muscleandstrength.com/workouts/3-day-at-home-womens-workout',
    'https://www.muscleandstrength.com/workouts/full-body-bodyweight-workout.html'
  ]
  // await page.waitForSelector('div.content');
  // await page.waitForSelector('div.item');

  // let urls = await page.evaluate(() => {
  //   return [...document.querySelectorAll("div.view-content a")].map(
  //     (node) => node.href
  //   );
  // });

  for (let url of urls) {

    await page.goto(url);

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
      return elem?.textContent.match(/\d.*/)?.toString()?.trim();
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
      return elem?.textContent.match(/\d.*/)?.toString()?.trim();
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

    const workoutDescription = await page.evaluate(() => {
      const elem1 = document.querySelector('.field-item p:nth-child(1)');
      const elem2 = document.querySelector('.field-item p:nth-child(2)');
      const elem3 = document.querySelector('.field-item p:nth-child(3)');
      return elem1?.textContent + elem2?.textContent?.trim() + elem3?.textContent;
    })

    const workoutOne = await page.evaluate(() => {
      const elemOne = document.querySelector('table.simpleTable tr:nth-child(2) a')?.textContent;
      const elemOneSet = document.querySelector('table.simpleTable tr:nth-child(2) > td:nth-child(2)')?.textContent.trim();
      const elemOneReps = document.querySelector('table.simpleTable tr:nth-child(2) > td:nth-child(3)')?.textContent.trim();
      const elemTwo = document.querySelector('table.simpleTable tr:nth-child(3) a')?.textContent;
      const elemTwoSet = document.querySelector('table.simpleTable tr:nth-child(3) > td:nth-child(2)')?.textContent.trim();
      const elemTwoReps = document.querySelector('table.simpleTable tr:nth-child(3) > td:nth-child(3)')?.textContent.trim();
      const elemThree = document.querySelector('table.simpleTable tr:nth-child(4) a')?.textContent;
      const elemThreeSet = document.querySelector('table.simpleTable tr:nth-child(4) > td:nth-child(2)')?.textContent.trim();
      const elemThreeReps = document.querySelector('table.simpleTable tr:nth-child(4) > td:nth-child(3)')?.textContent.trim();
      const elemFour = document.querySelector('table.simpleTable tr:nth-child(5) a')?.textContent;
      const elemFourSet = document.querySelector('table.simpleTable tr:nth-child(5) > td:nth-child(2)')?.textContent.trim();
      const elemFourReps = document.querySelector('table.simpleTable tr:nth-child(5) > td:nth-child(3)')?.textContent.trim();
      const elemFive = document.querySelector('table.simpleTable tr:nth-child(6) a')?.textContent;
      const elemFiveSet = document.querySelector('table.simpleTable tr:nth-child(6) > td:nth-child(2)')?.textContent.trim();
      const elemFiveReps = document.querySelector('table.simpleTable tr:nth-child(6) > td:nth-child(3)')?.textContent.trim();
      const elemSix = document.querySelector('table.simpleTable tr:nth-child(7) a')?.textContent;
      const elemSixSet = document.querySelector('table.simpleTable tr:nth-child(7) > td:nth-child(2)')?.textContent.trim();
      const elemSixReps = document.querySelector('table.simpleTable tr:nth-child(7) > td:nth-child(3)')?.textContent.trim();
      const elemSeven = document.querySelector('table.simpleTable tr:nth-child(8) a')?.textContent;
      const elemSevenSet = document.querySelector('table.simpleTable tr:nth-child(8) > td:nth-child(2)')?.textContent.trim();
      const elemSevenReps = document.querySelector('table.simpleTable tr:nth-child(8) > td:nth-child(3)')?.textContent.trim();

      return [
        {
          exercise: elemOne,
          sets: elemOneSet,
          reps: elemOneReps
        },
        {
          exercise: elemTwo,
          sets: elemTwoSet,
          reps: elemTwoReps
        },
        {
          exercise: elemThree,
          sets: elemThreeSet,
          reps: elemThreeReps
        },
        {
          exercise: elemFour,
          sets: elemFourSet,
          reps: elemFourReps
        },
        {
          exercise: elemFive,
          sets: elemFiveSet,
          reps: elemFiveReps
        },
        {
          exercise: elemSix,
          sets: elemSixSet,
          reps: elemSixReps
        },
        {
          exercise: elemSeven,
          sets: elemSevenSet,
          reps: elemSevenReps
        }
      ]
    })

    // const workoutTwo = await page.evaluate(() => {
    //   const elemOne = document.querySelector('.field-item h4:nth-child(2)')?.textContent;
    //   return elemOne;
    // })
    // console.log(workoutTwo)


    workout.push({
      title,
      shortDescription,
      imageSrc,
      workoutSummary,
      workoutDescription,
      workoutOne
    })

    console.log(workout);
  }

  await browser.close();
  await saveToJSON('workout', workout);
})();