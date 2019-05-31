const colors = [
  '#5256FF',
  '#4A78E8',
  '#5EB6FF',
  '#4ACBE8',
  '#52FFF1',
  '#94E0FF',
  '#87B2E8',
  '#94FFE5',
  '#87E4E8',
  '#A1E3FF',
  '#87B1E8'
];

fetch('http://whale.istruly.sexy:1234/team').then(async res => {
  const result = await res.json();
  const list = document.querySelector('.team-list > ul');
  console.log(result);
  
  result.forEach((e, i) => {
    const team = document.createElement('li');
    const circle = document.createElement('span');
    const name = document.createElement('span');
    
    circle.classList = 'circle';
    circle.style.color = colors[i];
    circle.innerText = '●';
    name.innerText = e.name;
    
    team.appendChild(circle);
    team.appendChild(name);
    list.appendChild(team);
  });
});

// TODO: map 추가하고 핀 찍기
fetch('http://whale.istruly.sexy:1234/map/web')
  .then(async res => {
    const result = await res.json();
    if (res.status % 100 === 2)
      document.querySelector('.remaining').textContent = result.leftTime;
  });
