document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('generate-ticket-button');
  console.log('BBB:', button);
  button.addEventListener('click', function (event) {
    event.preventDefault();
    const name = document.getElementById('full-name');
    const username = document.getElementById('github-username');
    const email = document.getElementById('email');
    const avatar = document.getElementById('upload-avatar');
    const nameValue = name.value;
    const usernameValue = username.value;
    const emailValue = email.value;
    const avatarValue = avatar.value;
    const avatarFile = avatar.files[0];
    console.log(nameValue);
    console.log(usernameValue);
    console.log(avatar, avatarFile, avatarValue);

    const dateOneMonthFromNow = new Date();
    dateOneMonthFromNow.setMonth(dateOneMonthFromNow.getMonth() + 1);
    const normalizeDate = (date) => {
      const options = {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      };
      return date.toLocaleDateString('en-US', options);
    };
    const header = document.getElementById('h1-header');
    const subHeader = document.getElementById('h4-sub-header');
    const ticket = document.getElementById('ticket-section');
    header.innerHTML = ticket.innerHTML = `
      <div>Congrats, <span style="background: linear-gradient(to right, rgb(214, 114, 97), white); -webkit-background-clip: text; color: transparent;">${nameValue}</span>!</div>
      <div> Your ticket is ready.</div>`;
    subHeader.innerHTML = `We've emailed your ticket to <span style="background: linear-gradient(to right, rgb(214, 114, 97), white); -webkit-background-clip: text; color: transparent;">${emailValue}</span> and will send updates in the run up to the event.`;

    ticket.innerHTML = `
      <div>
        <img src="./assets/images/logo-full.svg" alt="Coding conf logo" />
        <div class="ticket-info">${normalizeDate(dateOneMonthFromNow)} / Seattle, WA</div>
      </div>
      <div>
        <h2 class="ticket-info">${nameValue}</h2>
        <h3 class="ticket-info">${usernameValue}</h3>
      </div>
      `;

    const formSection = document.getElementById('ticket-form');
    formSection.style.display = 'none';
    ticket.style.display = 'flex';
    ticket.classList.add('ticket-section');
  });
});
