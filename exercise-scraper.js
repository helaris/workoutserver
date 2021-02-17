const puppeteer = require('puppeteer');
const saveToJSON = require('./utils/scraperToJSON');
const { v4 } = require('uuid');

(async () => {
  const url = "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/body-part/chest/"
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  let exercises = [];
  // await page.goto(
  //   "https://www.acefitness.org/education-and-resources/lifestyle/exercise-library/"
  // );
  // await page.waitForSelector("section.widget__link-list-section a");

  // let urls = await page.evaluate(() => {
  //   return [
  //     ...document.querySelectorAll("section.widget__link-list-section a:nth-child(1)"),
  //   ].map((node) => node.href);
  // });

  // for (let url of urls) {
  //   await page.goto(url);


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

    const stepOneDesc = await page.evaluate(() => {
      const elem = document.querySelector('.exercise-post__step-content > p:nth-child(2)');
      return elem?.textContent;
    })

    const stepTwo = await page.evaluate(() => {
      const elem = document.querySelector('h2:nth-child(3)');
      return elem?.textContent;
    })

    const stepTwoDesc = await page.evaluate(() => {
      const elem = document.querySelector('p:nth-child(4)');
      return elem?.textContent;
    })
    const stepTwoOther = await page.evaluate(() => {
      const elem = document.querySelector('h2:nth-child(4)');
      return elem?.textContent;
    })

    const stepTwoDescOther = await page.evaluate(() => {
      const elem = document.querySelector('p:nth-child(5)');
      return elem?.textContent;
    })

    const stepThree = await page.evaluate(() => {
      const elem = document.querySelector('h2:nth-child(5)');
      return elem?.textContent;
    })

    const stepThreeDesc = await page.evaluate(() => {
      const elem = document.querySelector('p:nth-child(6)');
      return elem?.textContent;
    })

    const formattedStepThreeDesc =
      stepThreeDesc
        ?.replace(/(\r\n|\n|\r)/gm, "")
        .replace(/ +(?= )/g, "")
        // .replace(/text/gm, '')
        .trim() ?? null;
    const stepThreeOther = await page.evaluate(() => {
      const elem = document.querySelector('p:nth-child(6) + h2');
      return elem?.textContent;
    })

    const stepThreeDescOther = await page.evaluate(() => {
      const elem = document.querySelector('p:nth-child(8)');
      return elem?.textContent;
    })

    const formattedStepThreeDescOther =
      stepThreeDescOther
        ?.replace(/(\r\n|\n|\r)/gm, "")
        .replace(/ +(?= )/g, "")
        // .replace(/text/gm, '')
        .trim() ?? null;

    const stepFour = await page.evaluate(() => {
      const elem = document.querySelector('p:nth-child(6) + h2');
      return elem?.textContent;
    })

    const stepFourDesc = await page.evaluate(() => {
      const elem = document.querySelector('h2:nth-child(7) + p');
      return elem?.textContent;
    })

    const stepFourOther = await page.evaluate(() => {
      const elem = document.querySelector('p:nth-child(9) + h2');
      return elem?.textContent;
    })

    const stepFourDescOther = await page.evaluate(() => {
      const elem = document.querySelector('p:nth-child(9) + h2 + p');
      return elem?.textContent;
    })

    const stepFive = await page.evaluate(() => {
      const elem = document.querySelector('h2:nth-child(9)');
      return elem?.textContent;
    })

    // const formattedStepFive =
    //   stepFive
    //     ?.replace(/(\r\n|\n|\r)/gm, "")
    //     .replace(/ +(?= )/g, "")
    //     // .replace(/text/gm, '')
    //     .trim() ?? null;

    const stepFiveDesc = await page.evaluate(() => {
      const elem = document.querySelector('p:nth-child(10)');
      return elem?.textContent;
    })

    // const formattedStepFiveDesc =
    //   stepFiveDesc
    //     ?.replace(/(\r\n|\n|\r)/gm, "")
    //     .replace(/ +(?= )/g, "")
    //     // .replace(/text/gm, '')
    //     .trim() ?? null;

    const stepFiveOther = await page.evaluate(() => {
      const elem = document.querySelector('p:nth-child(12) + h2');
      return elem?.textContent;
    })
    // const formattedStepFiveOther =
    //   stepFiveOther
    //     ?.replace(/(\r\n|\n|\r)/gm, "")
    //     .replace(/ +(?= )/g, "")
    //     // .replace(/text/gm, '')
    //     .trim() ?? null;

    const stepFiveDescOther = await page.evaluate(() => {
      const elem = document.querySelector('p:nth-child(12) + h2 + p');
      return elem?.textContent;
    })

    // const formattedStepFiveDescOther =
    //   stepFiveDescOther
    //     ?.replace(/(\r\n|\n|\r)/gm, "")
    //     .replace(/ +(?= )/g, "")
    //     // .replace(/text/gm, '')
    //     .trim() ?? null;


    const stepDescription = [
      {
        title: stepOne,
        description: stepOneDesc
      },
      {
        title: stepTwo ?? stepTwoOther,
        description: stepTwoDesc ?? stepTwoDescOther,
      },
      {
        title: stepThree ?? stepThreeOther,
        description: formattedStepThreeDesc === null || formattedStepThreeDesc === '' ? formattedStepThreeDescOther : formattedStepThreeDesc
      },
      {
        title: stepFourOther ?? stepFour,
        description: stepFourDescOther ?? stepFourDesc
      },
      {
        // title: formattedStepFiveOther ?? formattedStepFive,
        // description: formattedStepFiveDescOther ?? formattedStepFiveDesc,
        title: stepFiveOther ?? stepFive,
        description: stepFiveDescOther ?? stepFiveDesc,
      }
    ]

    console.log(stepDescription)

    const bodyPart = await page.evaluate(() => {
      const elem = document.querySelector('.exercise-info__term--body-part > dd');
      return elem?.textContent;
    })

    const category = await page.evaluate(() => {
      const elem = document.querySelector('.exercise-info__term--body-part > dd');
      return elem?.textContent.split(',').map(el => el.trim());
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
      id: v4(),
      title: title,
      description: description ?? stepDescription,
      bodyPart: bodyPart,
      category: category,
      equipment: equipment,
      images: images
    })
  }

  await browser.close();
  await saveToJSON('test', exercises);
  console.log(exercises)
})();