document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('generate-ticket-button');
  const uploadAvatar = document.getElementById('upload-avatar');

  let avatarImage = null;

  uploadAvatar.addEventListener('change', function () {
    if (uploadAvatar.files.length > 0) {
      button.style.cursor = 'pointer';
      button.style.backgroundColor = 'rgb(214, 114, 97)';
      button.disabled = false;
    }
  });

  button.disabled = true;
  button.style.cursor = 'not-allowed';
  button.style.backgroundColor = 'gray';

  button.addEventListener('click', function (event) {
    event.preventDefault();
    const name = document.getElementById('full-name');
    const username = document.getElementById('github-username');
    const email = document.getElementById('email');
    const avatar = document.getElementById('upload-avatar');
    const nameValue = name.value;
    const usernameValue = username.value;
    const emailValue = email.value;
    // const avatarValue = avatar.value;
    // const avatarFile = avatar.files[0];
    console.log(nameValue);
    console.log(usernameValue);
    console.log(avatar);

    const header = document.getElementById('h1-header');
    const subHeader = document.getElementById('h4-sub-header');
    const ticket = document.getElementById('ticket-container');
    header.innerHTML = congratsMessage(nameValue);
    subHeader.innerHTML = emailSentMessage(emailValue);
    console.log('Avatar:', avatarImage);
    avatarImage.style.width = '70px';
    avatarImage.style.height = '70px';
    ticket.innerHTML = `

      <div class="ticket-header">
        <img style="width: 200px; height: 50px;" src="./assets/images/logo-full.svg" alt="Coding conf logo" />
        <div class="ticket-info">${getDate()} / Seattle, WA</div>
      </div>
      <div style="display: flex; column-gap: 20px;">
        ${avatarImage.outerHTML}
        <div>
          <div class="ticket-info">${nameValue}</div>
          <div class="ticket-info">${usernameValue}</div>
        </div>
      </div>
      `;

    const formSection = document.getElementById('ticket-form');
    formSection.style.display = 'none';
    ticket.style.display = 'flex';
    ticket.classList.add('ticket-container');
  });

  uploadAvatar.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    console.log('File:', file);
    console.log('Reader:', reader);
    console.log('Reader result:', reader.result);
    reader.onload = function (e) {
      const div = document.createElement('div');
      avatarImage = document.createElement('img');
      avatarImage.src = e.target.result;
      avatarImage.id = 'avatar-image';
      avatarImage.style.width = '100px';
      avatarImage.style.height = '100px';
      div.classList.add('avatar');
      div.appendChild(avatarImage);
      uploadAvatar.parentNode.replaceWith(div);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
});

const congratsMessage = (name) => {
  return `<div>Congrats, <span style="background: linear-gradient(to right, rgb(214, 114, 97), white); -webkit-background-clip: text; color: transparent;">${name}</span>!</div>
  <div> Your ticket is ready.</div>`;
};

const emailSentMessage = (email) => {
  return `<div>We've emailed your ticket to <span style="background: linear-gradient(to right, rgb(214, 114, 97), white); -webkit-background-clip: text; color: transparent;">${email}</span> and will send updates in the run up to the event.</div>`;
};

const getDate = () => {
  const dateOneMonthFromNow = new Date();
  dateOneMonthFromNow.setMonth(dateOneMonthFromNow.getMonth() + 1);

  const options = {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  };
  return dateOneMonthFromNow.toLocaleDateString('en-US', options);
};
