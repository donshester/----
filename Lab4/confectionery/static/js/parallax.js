window.onload = function() {
  const parallaxCard = document.querySelector('.parallax-card');
  let isHovered = false;

  parallaxCard.addEventListener('mouseenter', () => {
    isHovered = true;
    parallaxCard.style.transition = 'transform 0.3s';
    parallaxCard.style.transform = 'rotateY(0deg)';
  });

  parallaxCard.addEventListener('mouseleave', () => {
    isHovered = false;
    parallaxCard.style.transition = 'transform 0.3s';
    parallaxCard.style.transform = 'rotateY(10deg)';
  });

  document.addEventListener('mouseout', (event) => {
    if (isHovered && !parallaxCard.contains(event.target)) {
      parallaxCard.style.transition = 'transform 0.3s';
      parallaxCard.style.transform = 'rotateY(10deg)';
    }
  });

  const body = document.querySelector('body');
  const walk = { x: 20, y: 15 };

  article = document.querySelector('article');
  const articleText = document.querySelectorAll('.parallax-text')[0];

  function parallax(e) {
    const width = article.offsetWidth;
    const height = article.offsetHeight;

    let { offsetX: x, offsetY: y } = e;

    const xWalk = Math.round((e.x / width / 2 * walk.x) - (walk.x / 2));
    const yWalk = Math.round((e.y / height / 2 * walk.y) - (walk.y / 2));

    const transform = `rotateY(${-xWalk}deg) rotateX(${yWalk}deg)`;

    article.style.transform = `translateX(${xWalk}px) translateY(${yWalk}px) ${transform}`;

    articleText.style.transform = `translateX(${xWalk}px) translateY(${-yWalk}px) ${transform}`;
  }

  body.addEventListener('mousemove', parallax);
};
