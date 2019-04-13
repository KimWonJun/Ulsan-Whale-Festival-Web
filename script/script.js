let xhr = new XMLHttpRequest();
xhr.addEventListener('load', function () {
  if (!(this.status === 200)) return;
  const list = document.querySelector('.team-list > ul');
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
  Object.keys(JSON.parse(this.responseText)).forEach((e, i) => {
    const team = document.createElement('li');
    const circle = document.createElement('span');
    const name = document.createElement('span');

    circle.classList = 'circle';
    circle.style.color = colors[i];
    circle.innerText = '●';
    name.innerText = e;

    team.appendChild(circle);
    team.appendChild(name);
    list.appendChild(team);
  });
});

xhr.open('GET', 'http://whale.istruly.sexy:1234/team');
xhr.setRequestHeader('deviceUUID', 'request');
xhr.send();

const map = new daum.maps.StaticMap(document.getElementById('map'), {
	center: new daum.maps.LatLng(35.505700, 129.382000),
  level: 2,
  draggable: false,
  marker: {
    position: new daum.maps.LatLng(35.5049423, 129.3812869),
    text: 'test'
  }
});
