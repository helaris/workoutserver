const puppeteer = require('puppeteer');
const saveToJSON = require('./scraperToJSON');
const { v4 } = require('uuid');

(async () => {
  // const url = "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/body-part/chest/"
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  let exercises = [];
  await page.goto(
    "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/"
  );
  await page.waitForSelector("section.widget__link-list-section a");

  let urls = await page.evaluate(() => {
    return [
      ...document.querySelectorAll("section.widget__link-list-section a:nth-child(1)"),
    ].map((node) => node.href);
  });

  for (let url of urls) {
    await page.goto(url);

    let tryUrl = await page.evaluate(() => {
      return [
        ...document.querySelectorAll(".paginate__item > a")
      ].map((node) => node.href);
    })

    for (let url of tryUrl) {

      await page.goto(url);

      await page.waitForSelector(
        "section.exercise-card-grid.exercise-card-grid--3col a.exercise-card"
      );

      let urlGrid = await page.evaluate(() => {
        return [
          ...document.querySelectorAll(
            "section.exercise-card-grid.exercise-card-grid--3col a.exercise-card"
          ),
        ].map((node) => node.href);
      });


      for (let url of urlGrid) {
        await page.goto(url);

        try {
          await page.waitForSelector(
            "header.exercise-hero h1.exercise-hero__title"
          );
        } catch {
          console.log(
            "Couldn't find header.exercise-hero h1.exercise-hero__title"
          );
        }

        const title = await page.evaluate(() => {
          const elem = document.querySelector('.exercise-hero__title');
          return elem?.textContent;
        })

        const description = await page.evaluate(() => {
          const elem = document.querySelector('.exercise-post__step-content > p:nth-child(1)');
          return elem?.textContent;
        })

        const stepOne = await page.evaluate(() => {
          const elem = document.querySelector('.exercise-post__step-content > h2:nth-child(1)');
          return elem?.textContent;
        })

        const formattedStepOne =
          stepOne
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepOneDesc = await page.evaluate(() => {
          const elem = document.querySelector('.exercise-post__step-content > p:nth-child(2)');
          return elem?.textContent;
        })

        const formattedStepOneDesc =
          stepOneDesc
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepTwo = await page.evaluate(() => {
          const elem = document.querySelector('h2:nth-child(3)');
          return elem?.textContent;
        })

        const formattedStepTwo =
          stepTwo
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepTwoDesc = await page.evaluate(() => {
          const elem = document.querySelector('p:nth-child(4)');
          return elem?.textContent;
        })

        const formattedStepTwoDesc =
          stepTwoDesc
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepTwoOther = await page.evaluate(() => {
          const elem = document.querySelector('h2:nth-child(4)');
          return elem?.textContent;
        })

        const formattedStepTwoOther =
          stepTwoOther
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepTwoDescOther = await page.evaluate(() => {
          const elem = document.querySelector('p:nth-child(5)');
          return elem?.textContent;
        })

        const formattedStepTwoDescOther =
          stepTwoDescOther
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepThree = await page.evaluate(() => {
          const elem = document.querySelector('h2:nth-child(5)');
          return elem?.textContent;
        })

        const formattedStepThree =
          stepThree
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepThreeDesc = await page.evaluate(() => {
          const elem = document.querySelector('p:nth-child(6)');
          return elem?.textContent;
        })

        const formattedStepThreeDesc =
          stepThreeDesc
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepThreeOther = await page.evaluate(() => {
          const elem = document.querySelector('p:nth-child(6) + h2');
          return elem?.textContent;
        })

        const formattedStepThreeOther =
          stepThreeOther
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepThreeDescOther = await page.evaluate(() => {
          const elem = document.querySelector('p:nth-child(8)');
          return elem?.textContent;
        })

        const formattedStepThreeDescOther =
          stepThreeDescOther
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepFour = await page.evaluate(() => {
          const elem = document.querySelector('p:nth-child(6) + h2');
          return elem?.textContent;
        })

        const formattedStepFour =
          stepFour
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepFourDesc = await page.evaluate(() => {
          const elem = document.querySelector('h2:nth-child(7) + p');
          return elem?.textContent;
        })

        const formattedStepFourDesc =
          stepFourDesc
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepFourOther = await page.evaluate(() => {
          const elem = document.querySelector('p:nth-child(9) + h2');
          return elem?.textContent;
        })

        const formattedStepFourOther =
          stepFourOther
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepFourDescOther = await page.evaluate(() => {
          const elem = document.querySelector('p:nth-child(9) + h2 + p');
          return elem?.textContent;
        })

        const formattedStepFourDescOther =
          stepFourDescOther
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepFive = await page.evaluate(() => {
          const elem = document.querySelector('h2:nth-child(9)');
          return elem?.textContent;
        })

        const formattedStepFive =
          stepFive
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;


        const stepFiveDesc = await page.evaluate(() => {
          const elem = document.querySelector('p:nth-child(10)');
          return elem?.textContent;
        })

        const formattedStepFiveDesc =
          stepFiveDesc
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepFiveOther = await page.evaluate(() => {
          const elem = document.querySelector('p:nth-child(12) + h2');
          return elem?.textContent;
        })

        const formattedStepFiveOther =
          stepFiveOther
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const stepFiveDescOther = await page.evaluate(() => {
          const elem = document.querySelector('p:nth-child(12) + h2 + p');
          return elem?.textContent;
        })

        const formattedStepFiveDescOther =
          stepFiveDescOther
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;

        const exerciseTip = await page.evaluate(() => {
          const elem = document.querySelector('#exercise_tip');
          return elem?.textContent;
        })

        const formattedExerciseTip =
          exerciseTip
            ?.replace(/(\r\n|\n|\r)/gm, "")
            .replace(/ +(?= )/g, "")
            .trim() ?? null;


        const stepDescription = [
          {
            title: formattedStepOne,
            description: formattedStepOneDesc
          },
          {
            title: formattedStepTwo ?? formattedStepTwoOther,
            description: formattedStepTwoDesc ?? formattedStepTwoDescOther,
          },
          {
            title: formattedStepThree ?? formattedStepThreeOther,
            description: formattedStepThreeDesc === null || formattedStepThreeDesc === '' ? formattedStepThreeDescOther : formattedStepThreeDesc
          },
          {
            title: formattedStepFourOther ?? formattedStepFour,
            description: formattedStepFourDescOther ?? formattedStepFourDesc
          },
          {
            title: formattedStepFive ?? formattedStepFiveOther,
            description: formattedStepFiveDesc ?? formattedStepFiveDescOther,
          },
          {
            exerciseTip: formattedExerciseTip
          }
        ]

        const bodyPart = await page.evaluate(() => {
          const elem = document.querySelector('.exercise-info__term--body-part > dd');
          return elem?.textContent;
        })

        const category = await page.evaluate(() => {
          const elem = document.querySelector('.exercise-info__term--body-part > dd');
          return elem?.textContent.split(',').map(el => el.trim().toLowerCase().replace(/[^\w+].*$/, ''));
        })

        const equipment = await page.evaluate(() => {
          const elem = document.querySelector('.exercise-info__term--equipment > dd');
          return elem?.textContent;
        })

        const images = await page.evaluate(() => {
          const elements = document.querySelectorAll(".exercise-post__step-image-wrap img");
          return [...elements].map((element) => element.src ?? null);

        })

        exercises.push({
          title: title,
          id: v4(),
          description: description ?? stepDescription,
          bodyPart: bodyPart,
          category: category,
          equipment: equipment,
          images: images
        })
      }
    }
    console.log(exercises)
  }

  await browser.close();
  await saveToJSON('exercises', exercises);
  console.log(exercises)
})();