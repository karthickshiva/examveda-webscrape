const puppeteer = require('puppeteer');
var section = 3;
var page_max = 11;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for(var i=1; i<=page_max; i++) {
    var url = `https://www.examveda.com/arithmetic-ability/practice-mcq-question-on-probability/?section=${section}&page=${i}`;
    await page.goto(url, {waitUntil: 'networkidle0'});
    await page.setViewport({width: 1640, height: 800});
    await page.evaluate(_ => {

      function get(selector) {
        return document.querySelector(selector)
      }

      function remove(selector) {
        get(selector).remove();
      }

      function removeAll(selector) {
        var elements = document.querySelectorAll(selector);
        for(var i=0; i<elements.length; i++) {
          elements[i].remove();
        }
      }

      remove('#header-top');
      remove('header');
      remove('.breadcrumbs');
      remove('article');
      removeAll('.question-bottom');

      var answers = document.querySelectorAll('.answer_container')
      for(var i=0; i<answers.length; i++) {
        answers[i].style.display = 'block';
      }

      get('.chapter-section').parentNode.remove();
      get('.pagination').parentNode.parentNode.remove();
      remove('.sidebar');

      get('.more-section').parentNode.remove();
      removeAll('.adsbygoogle');
      remove('.col-md-12');
      remove('footer');
    });

    await page.pdf({path: `page${i}.pdf`, format: 'A4'});
    console.log(`Completed page ${i}.`);
  }
  await browser.close();
})();