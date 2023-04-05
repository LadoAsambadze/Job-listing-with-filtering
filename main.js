import data from "./data.json" assert { type: "json" };
console.log(data);
const gridSection = document.querySelector(".grid-section");
for (let index = 0; index < data.length; index++) {
  const {
    id,
    company,
    logo,
    newl,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  } = data[index];
  const createDomElement = (tag, className, src) => {
    const element = document.createElement(tag);
    element.classList.add(className);
    if (src) {
      element.src = src;
    }
    return element;
  };
  const gridItem = createDomElement("div", "grid-item");
  gridItem.classList.add(id);

  const firstPart = createDomElement("div", "first-part");
  const icon = createDomElement("img", "icon", logo);
  gridItem.append(firstPart);
  firstPart.append(icon);
  const insideFirstPart = createDomElement("div", "inside-first-part");
  firstPart.append(insideFirstPart);
  const firstLine = createDomElement("div", "first-line");
  insideFirstPart.append(firstLine);
  const pIcon = createDomElement("p", "icon-name");
  pIcon.textContent = `${company}`;
  firstLine.append(pIcon);
  if (newl === true) {
    const newD = createDomElement("div", "new");
    newD.classList.add("font");
    newD.textContent = "NEW!";
    firstLine.append(newD);
  }
  if (featured === true) {
    const featuredD = createDomElement("div", "featured");
    featuredD.classList.add("font");
    featuredD.textContent = "FEATURED";
    firstLine.append(featuredD);
  }
  const pRole = createDomElement("p", "role");
  insideFirstPart.append(pRole);
  pRole.textContent = `${position}`;
  const typeLocationTime = createDomElement("div", "type-location");
  insideFirstPart.append(typeLocationTime);
  const spanTime = document.createElement("span");
  spanTime.textContent = `${postedAt}`;
  const spanContract = document.createElement("span");
  spanContract.textContent = `${contract}`;
  const spanLocation = document.createElement("span");
  spanLocation.textContent = `${location}`;
  typeLocationTime.append(spanTime, spanContract, spanLocation);
  const line = createDomElement("hr", "line");
  gridItem.append(line);
  const skills = createDomElement("div", "skills");
  gridItem.append(skills);
  const skillRole = createDomElement("button", "skill-border");
  skills.append(skillRole);
  skillRole.textContent = `${role}`;
  const skillLevel = createDomElement("button", "skill-border");
  skills.append(skillLevel);
  skillLevel.textContent = `${level}`;
  for (let i = 0; i < languages.length; i++) {
    const skillBorder = createDomElement("button", "skill-border");
    skills.append(skillBorder);
    skillBorder.textContent = `${languages[i]}`;
  }
  for (let i = 0; i < tools.length; i++) {
    const skillTools = createDomElement("button", "skill-border");
    skills.append(skillTools);
    skillTools.textContent = `${tools[i]}`;
  }
  gridSection.append(gridItem);
}

const selectedItems = [];
const buttonClick = document.querySelectorAll(".skill-border");
const choosed = document.querySelector(".choosed");
const gridItems = document.querySelector(".grid-items");
const clear = document.querySelector(".clear");

buttonClick.forEach((button) => {
  button.addEventListener("click", (event) => {
    const buttonText = event.target.textContent;
    const index = selectedItems.indexOf(buttonText);

    if (index !== -1) {
      selectedItems.splice(index, 1);
      const buttons = choosed.getElementsByTagName("button");
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent === buttonText) {
          buttons[i].remove();
          break;
        }
      }
    } else {
      selectedItems.push(buttonText);
      gridItems.classList.remove("hidden");
      choosed.classList.remove("hidden");
      const newButton = event.target.cloneNode(true);
      newButton.classList.add("red");
      choosed.appendChild(newButton);
      const newRemoveX = document.createElement("div");
      newRemoveX.classList.add("for-remove");
      newButton.append(newRemoveX);
      const newRemoveImg = document.createElement("img");
      newRemoveImg.classList.add("remove");
      newRemoveImg.src = "./images/icon-remove.svg";
      newRemoveX.append(newRemoveImg);

      // Add event listener to cloned button
      newRemoveX.addEventListener("click", () => {
        const index = selectedItems.indexOf(buttonText);
        if (index !== -1) {
          selectedItems.splice(index, 1);
          newButton.remove();
          if (selectedItems.length === 0) {
            gridItems.classList.add("hidden");
            choosed.classList.add("hidden");
          }
        }
        filterData();
      });
    }
    if (selectedItems.length === 0) {
      gridItems.classList.add("hidden");
      choosed.classList.add("hidden");
    }

    filterData();
  });
});

function filterData() {
  const tagsArray = data.map((job) => [
    job.role,
    job.level,
    ...(job.languages || []),
    ...(job.tools || []),
  ]);

  const allSelectedItemsInTags = tagsArray.map((tags) =>
    selectedItems.every((item) => tags.includes(item))
  );

  const jobItems = document.querySelectorAll(".grid-item");
  jobItems.forEach((item, i) => {
    item.style.display = allSelectedItemsInTags[i] ? "block" : "none";
  });
}

clear.addEventListener("click", () => {
  selectedItems.length = 0;
  const buttons = choosed.getElementsByTagName("button");
  for (let i = buttons.length - 1; i >= 0; i--) {
    buttons[i].remove();
  }
  gridItems.classList.add("hidden");
  choosed.classList.add("hidden");
  filterData();
});

console.log(selectedItems);

function space() {}
