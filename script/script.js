const colors = {
  '혹등고래팀': '#ff3a3a',
  '밍크고래팀': '#29ab5d',
  '대왕고래팀': '#3a5bff',
  '기본': '#6e6d6d',
};

const pins = {
  '혹등고래팀': 'red',
  '밍크고래팀': 'green',
  '대왕고래팀': 'blue',
  '기본': 'default',
}

const removeElements = (elms) => elms.forEach(el => el.remove());

function getTeamElem(team) {
  const teamElem = document.createElement('li');
  const circleElem = document.createElement('span');
  const nameElem = document.createElement('span');
  
  circleElem.classList = 'circle';
  circleElem.style.color = colors[team.name];
  circleElem.innerText = '●';
  nameElem.innerText = team.name;
  
  teamElem.appendChild(circleElem);
  teamElem.appendChild(nameElem);

  return teamElem;
}

function getMarkerElem(team, booth, left, top) {
  const marker = document.createElement('div');
  const name = document.createElement('span');
  const pin = document.createElement('img');

  marker.classList.add('marker');
  marker.style.left = `${left}%`;
  marker.style.top = `${top}%`;

  name.classList.add('booth');
  name.textContent = booth;

  pin.classList.add('pin');
  pin.src = `assets/pin_${pins[team || '기본']}.png`;

  marker.appendChild(pin);
  marker.appendChild(name);

  return marker;
}

function getTeam() {
  fetch('http://whale.istruly.sexy:1234/team').then(async res => {
    const result = await res.json();
    const list = document.querySelector('.team-list > ul');

    result.forEach(team => list.appendChild(getTeamElem(team)));
  });
}

function getStatus() {
  fetch('http://whale.istruly.sexy:1234/map/web')
    .then(async res => {
      const result = await res.json();
      if (res.status / 100 !== 2) return;
      const map = document.querySelector('.map-container');

      document.querySelector('.remaining').textContent = `${new Date(result.endTimeTimestamp * 1000).toLocaleString()}까지`;
      removeElements(document.querySelectorAll('.marker'));
      result.map.forEach(booth => {
        map.appendChild(getMarkerElem(booth.own_team, booth.booth_name, booth.x, booth.y));
      });
  });
}

getTeam();
setInterval(getStatus, 5000);
