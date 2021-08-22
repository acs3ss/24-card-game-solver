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
  const cards: number[] = [];
  for (let i = 1; i <= 4; i++) {
    const value = Number((document.getElementById(`card${i}`) as HTMLSelectElement).value);
    if (value >= 1 && value <= 13) {
      cards.push(value);
    } else {
      alert(`Card ${i} is invalid`);
      return;
    }
  }

  const solutionsDiv = document.getElementById("solutions") as HTMLDivElement;
  while (solutionsDiv.lastElementChild) {
    solutionsDiv.removeChild(solutionsDiv.lastElementChild);
  }

  const solutions = Solver.solve(cards);
  if (solutions.length !== 0) {
    const solutionElements = Solver.print(solutions).map(output => {
      const solutionElement = document.createElement("pre");
      solutionElement.classList.add("text-center", "col-12", "col-sm-4", "col-md-3", "col-lg-2");
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

function updateImage(elem: HTMLSelectElement): void {
  const imageElem = elem.parentElement?.parentElement?.getElementsByClassName("card-image")[0].getElementsByTagName("img")[0]!;
  const face = ["Clubs", "Diamonds", "Hearts", "Spades"][Math.floor(Math.random() * 4)];
  imageElem.src = `images/light/${elem.value}${face[0]}.svg`;
  imageElem.alt = `${elem.value} of ${face}`;
  imageElem.title = `${elem.value} of ${face}`;
}
