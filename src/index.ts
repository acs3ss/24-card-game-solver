import { Solver } from './solver';

(document.getElementById("card1") as HTMLSelectElement).value = Math.floor(1 + Math.random() * 13).toString();
(document.getElementById("card2") as HTMLSelectElement).value = Math.floor(1 + Math.random() * 13).toString();
(document.getElementById("card3") as HTMLSelectElement).value = Math.floor(1 + Math.random() * 13).toString();
(document.getElementById("card4") as HTMLSelectElement).value = Math.floor(1 + Math.random() * 13).toString();

for (const elem of document.getElementsByClassName("card-picker")) {
  updateImage(elem as HTMLSelectElement);
  elem.addEventListener("change", event => updateImage(event.target as HTMLSelectElement));
}

(document.getElementById("solve") as HTMLButtonElement).addEventListener("click", solve);

function solve() {
  const cards = parse();

  const solutionsDiv = document.getElementById("solutions") as HTMLDivElement;
  while (solutionsDiv.lastElementChild) {
    solutionsDiv.removeChild(solutionsDiv.lastElementChild);
  }

  const solutions = Solver.solve(cards);
  if (solutions.length !== 0) {
    const solutionElements = Solver.print(solutions).map(output => {
      const solutionElement = document.createElement("pre");
      solutionElement.innerText = output;
      return solutionElement;
    });
    solutionsDiv.append(...solutionElements);
  } else {
    const noSolutionsElement = document.createElement("pre");
    noSolutionsElement.innerText = "No solutions";
    solutionsDiv.appendChild(noSolutionsElement);
  }
}

function parse(): number[] {
  const cards: number[] = [];
  for (let i = 1; i <= 4; i++) {
    const value = (document.getElementById(`card${i}`) as HTMLInputElement).value;
    const number = Number(value);
    if (number >= 1 && number <= 13) {
      cards.push(number);
    } else if (/^(j|jack)$/i.test(value)) {
      cards.push(11);
    } else if (/^(q|queen)$/i.test(value)) {
      cards.push(12);
    } else if (/^(k|king)$/i.test(value)) {
      cards.push(13);
    } else if (/^(a|ace)$/i.test(value)) {
      cards.push(1);
    } else {
      alert(`Card ${i} is invalid`);
    }
  }
  return cards;
}

function updateImage(elem: HTMLSelectElement): void {
  const imageElem = elem.parentElement?.parentElement?.getElementsByClassName("card-image")[0].getElementsByTagName("img")[0]!;
  const face = ["Clubs", "Diamonds", "Hearts", "Spades"][Math.floor(Math.random() * 4)];
  imageElem.src = `images/light/${elem.value}${face[0]}.svg`;
  imageElem.alt = `${elem.value} of ${face}`;
  imageElem.title = `${elem.value} of ${face}`;
}
