const actorsTable = document.querySelector("#actorsInfo");
actorsData.forEach((actor) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
      <tr>
        <td>
          <img src="${actor.picture}" />
        </td>
        <td>
          <a
            href="${actor.wikiURL}"
            target="_blank"
            > ${actor.name} </a
          >
        </td>
        <td> ${actor.age} </td>
        <td>
          <a
            href="${actor.imdbURL}"
            target="_blank"
            >click here</a
          >
        </td>
      </tr>`;
  actorsTable.appendChild(tr);
});
