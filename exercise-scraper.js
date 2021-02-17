const puppeteer = require('puppeteer');
const saveToJSON = require('./utils/scraperToJSON');

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

      const stepDescription = await page.evaluate(() => {
        const stepOne = document.querySelector('.exercise-post__step-content > h2:nth-child(1)');
        const stepOneDesc = document.querySelector('.exercise-post__step-content > p:nth-child(2)');
        const stepTwo = document.querySelector('h2:nth-child(3)');
        const stepTwoOther = document.querySelector('h2:nth-child(4)');
        const stepTwoDesc = document.querySelector('p:nth-child(4)');
        const stepTwoDescOther = document.querySelector('p:nth-child(5)');
        const stepThree = document.querySelector("h2:nth-child(5)");
        const stepThreeOther = document.querySelector("p:nth-child(6) + h2"); // issue here
        const stepThreeDesc = document.querySelector('p:nth-child(8)'); //issue here
        const stepThreeDescOther = document.querySelector('p:nth-child(6) + h2 + p');
        const stepFour = document.querySelector('p:nth-child(6) + h2'); //issue here
        const stepFourOther = document.querySelector('p:nth-child(9) + h2'); //issue here
        const stepFourDesc = document.querySelector('h2:nth-child(7) + p');
        const stepFourDescOther = document.querySelector('p:nth-child(9) + h2 + p');
        const stepFive = document.querySelector('h2:nth-child(9)');
        const stepFiveOther = document.querySelector('p:nth-child(12) + h2');
        const stepFiveDesc = document.querySelector('p:nth-child(10)');
        const stepFiveDescOther = document.querySelector('p:nth-child(12) + h2 + p');




        const data = [
          {
            title: stepOne?.textContent,
            description: stepOneDesc?.textContent
          },
          {
            title: stepTwo?.textContent ?? stepTwoOther?.textContent,
            description: stepTwoDesc?.textContent ?? stepTwoDescOther?.textContent,
          },
          {
            title: stepThree?.textContent ?? stepThreeOther?.textContent,
            description: stepThreeDesc?.textContent ?? stepThreeDescOther?.textContent
          },
          {
            title: stepFourOther?.textContent ?? stepFour?.textContent,
            description: stepFourDescOther?.textContent ?? stepFourDesc?.textContent
            // description: stepFourDescOther?.textContent === stepFourDesc?.textContent ? stepFourDesc?.textContent : stepFourDescOther?.textContent
          },
          {
            title: stepFiveOther?.textContent ?? stepFive?.textContent,
            description: stepFiveDescOther?.textContent ?? stepFiveDesc?.textContent,
          }
        ]

        return data;
      })

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
        title: title,
        description: description ?? stepDescription,
        bodyPart: bodyPart,
        category: category,
        equipment: equipment,
        images: images
      })
    }
  }

  await browser.close();
  await saveToJSON('exercises', exercises);
  console.log(exercises)
})();